var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var In1A = new Gpio(18, 'out'); //use GPIO pin 18 as output
var In1B = new Gpio(23, 'out'); //use GPIO pin 23 as output
var In2A = new Gpio(17, 'out'); //use GPIO pin 17 as output
var In2B = new Gpio(27, 'out'); //use GPIO pin 27 as output


var GPIO18value = 0;  // Turn on the LED by default
var GPIO23value = 0;  // Turn on the LED by default
var GPIO17value = 0;  // Turn on the LED by default
var GPIO27value = 0;  // Turn on the LED by default

/****** CONSTANTS******************************************************/

const WebPort = 80;


/* if you want to run WebPort on a port lower than 1024 without running
 * node as root, you need to run following from a terminal on the pi
 * sudo apt update
 * sudo apt install libcap2-bin
 * sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
 */
 
/*************** Web Browser Communication ****************************/



// Start http webserver
http.listen(WebPort, function() {  // This gets call when the web server is first started.
	In1A.writeSync(GPIO18value); //turn LED on or off
	In1B.writeSync(GPIO23value); //turn LED on or off
	In2A.writeSync(GPIO17value); //turn LED on or off
	In2B.writeSync(GPIO27value); //turn LED on or off
	console.log('Server running on Port '+WebPort);
	console.log('GPIO18 = '+GPIO18value);
	console.log('GPIO23 = '+GPIO23value);
	console.log('GPIO17 = '+GPIO17value);
	console.log('GPIO27 = '+GPIO27value);
	} 
); 



// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    if (filename=='./') {
      console.log('retrieving default index.html file');
      filename= './index.html';
    }
    
    // Initial content type
    var contentType = 'text/html';
    
    // Check ext and set content type
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }
    

    
    fs.readFile(__dirname + '/public/' + filename, function(err, content) {
	if(err) {
	    console.log('File not found. Filename='+filename);
	    fs.readFile(__dirname + '/public/404.html', function(err, content) {
		res.writeHead(230, {'Content-Type': 'text/html'}); 
		return res.end(content,'utf8'); //display 404 on error
	    });
	}
	else {
	    // Success
	    res.writeHead(230, {'Content-Type': contentType}); 
	    return res.end(content,'utf8');
	}
      
    });
}


// Execute this when web server is terminated
process.on('SIGINT', function () { //on ctrl+c
  In1A.writeSync(0); // Turn LED off
  In1A.unexport(); // Unexport LED GPIO to free resources
  
  In1B.writeSync(0); // Turn LED off
  In1B.unexport(); // Unexport LED GPIO to free resources
  
  In2A.writeSync(0); // Turn LED off
  In2A.unexport(); // Unexport LED GPIO to free resources
  
  In2B.writeSync(0); // Turn LED off
  In2B.unexport(); // Unexport LED GPIO to free resources

  process.exit(); //exit completely
}); 


/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client has connectioned. Send PIN status');
    socket.emit('GPIO18', GPIO18value);
    socket.emit('GPIO23', GPIO23value);
    socket.emit('GPIO17', GPIO17value);
    socket.emit('GPIO27', GPIO27value);
    
    // this gets called whenever client presses GPIO18 toggle light button
    socket.on('GPIO18T', function(data) { 
	if (GPIO18value) GPIO18value = 0;
	else GPIO18value = 1;
	console.log('new GPIO18 value='+GPIO18value);
	In1A.writeSync(GPIO18value); //turn LED on or off
	console.log('Send new GPIO18 state to ALL clients');
	io.emit('GPIO18', GPIO18value); //send button status to ALL clients 
    });
    
    // this gets called whenever client presses GPIO23 toggle light button
    socket.on('GPIO23T', function(data) { 
	if (GPIO23value) GPIO23value = 0;
	else GPIO23value = 1;
	console.log('new GPIO23 value='+GPIO23value);
	In1B.writeSync(GPIO23value); //turn LED on or off
	console.log('Send new GPIO23 state to ALL clients');
	io.emit('GPIO23', GPIO23value); //send button status to ALL clients 
    });
    
    // this gets called whenever client presses GPIO17 toggle light button
    socket.on('GPIO17T', function(data) { 
	if (GPIO17value) GPIO17value = 0;
	else GPIO17value = 1;
	console.log('new GPIO17 value='+GPIO17value);
	In2A.writeSync(GPIO17value); //turn LED on or off
	console.log('Send new GPIO17 state to ALL clients');
	io.emit('GPIO17', GPIO17value); //send button status to ALL clients 	
    });
    
    // this gets called whenever client presses GPIO27 toggle light button
    socket.on('GPIO27T', function(data) { 
	if (GPIO27value) GPIO27value = 0;
	else GPIO27value = 1;
	console.log('new GPIO27 value='+GPIO27value);
	In2B.writeSync(GPIO27value); //turn LED on or off
	console.log('Send new GPIO27 state to ALL clients');
	io.emit('GPIO27', GPIO27value); //send button status to ALL clients 	
    });

    
    // this gets called whenever client presses GPIO18 momentary light button
    socket.on('GPIO18', function(data) { 
	GPIO18value = data;
	if (GPIO18value != In1A.readSync()) { //only change LED if status has changed
	    In1A.writeSync(GPIO18value); //turn LED on or off
	    console.log('Send new GPIO18 state to ALL clients');
	    io.emit('GPIO18', GPIO18value); //send button status to ALL clients 
	};	
    });
    
    // this gets called whenever client presses GPIO23 momentary light button
    socket.on('GPIO23', function(data) { 
	GPIO23value = data;
	if (GPIO23value != In1B.readSync()) { //only change LED if status has changed
	    In1B.writeSync(GPIO23value); //turn LED on or off
	    console.log('Send new GPIO23 state to ALL clients');
	    io.emit('GPIO23', GPIO23value); //send button status to ALL clients 
	};

    });
    
    // this gets called whenever client presses GPIO17 momentary light button
    socket.on('GPIO17', function(data) { 
	GPIO17value = data;
	if (GPIO17value != In2A.readSync()) { //only change LED if status has changed
	    In2A.writeSync(GPIO17value); //turn LED on or off
	    console.log('Send new GPIO17 state to ALL clients');
	    io.emit('GPIO17', GPIO17value); //send button status to ALL clients e
	};

    });
    
    // this gets called whenever client presses GPIO27 momentary light button
    socket.on('GPIO27', function(data) { 
	GPIO27value = data;
	if (GPIO27value != In2B.readSync()) { //only change LED if status has changed
	    In2B.writeSync(GPIO27value); //turn LED on or off
	    console.log('Send new GPIO27 state to ALL clients');
	    io.emit('GPIO27', GPIO27value); //send button status to ALL clients 
	};
	
    });
 
 

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 


 



