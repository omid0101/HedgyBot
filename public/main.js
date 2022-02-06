


/************PROCESS DATA TO/FROM Client****************************/

	
var socket = io(); //load socket.io-client and connect to the host that serves the page
window.addEventListener("load", function(){ //when page loads
  if( isMobile.any() ) {
//    alert('Mobile');  
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
    document.addEventListener("touchmove", TouchMove, false);
  }else{
//    alert('Desktop');  
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  }
  
});




//Update gpio feedback when server changes LED state
socket.on('GPIO18', function (data) {  
//  console.log('GPIO18 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('GPIO18').checked = data;
//  console.log('GPIO18: '+data.toString());
});


//Update gpio feedback when server changes LED state
socket.on('GPIO23', function (data) {  
//  console.log('GPIO23 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('GPIO23').checked = data;
//  console.log('GPIO23: '+data.toString());
});



//Update gpio feedback when server changes LED state
socket.on('GPIO17', function (data) {  
//  console.log('GPIO17 function called');
 // console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('GPIO17').checked = data;
// console.log('GPIO17: '+data.toString());
});



//Update gpio feedback when server changes LED state
socket.on('GPIO27', function (data) {  
//  console.log('GPIO27 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('GPIO27').checked = data;
//  console.log('GPIO27: '+data.toString());
});


function ReportTouchStart(e) {
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
    if (x === "Forward") {
 //     console.log("GPIO18 toggle");
      socket.emit("GPIO23T");  // send GPIO button toggle to node.js server
      socket.emit("GPIO27T");
    } else if (x === "Backward") {
 //     console.log("GPIO23 toggle");
      socket.emit("GPIO18T");  // send GPIO button toggle to node.js server
      socket.emit("GPIO17T")
    } else if (x === "Left") {
//      console.log("GPIO17 toggle");
      socket.emit("GPIO23T");  // send GPIO button toggle to node.js server
      socket.emit("GPIO17T")
    } else if (x === "Right") {
  //    console.log("GPIO27 toggle");
      socket.emit("GPIO18T");  // send GPIO button toggle to node.js server
      socket.emit("GPIO27T")
    } 
  }

  if (e.target.id === "ForwardM") {
    socket.emit("GPIO23", 1); 
    socket.emit("GPIO27", 1); 
    document.getElementById('GPIO23').checked = 1;
    document.getElementById('GPIO27').checked = 1;
  } else if (e.target.id === "BackwardM") {
 //   console.log("GPIO23 pressed");
    socket.emit("GPIO18", 1);
    socket.emit("GPIO17", 1); 
    document.getElementById('GPIO18').checked = 1; 
    document.getElementById('GPIO17').checked = 1;
  } else if (e.target.id === "LeftM") {
  //  console.log("GPIO17 pressed");
    socket.emit("GPIO17", 1); 
    socket.emit("GPIO23", 1); 
    document.getElementById('GPIO23').checked = 1;
    document.getElementById('GPIO17').checked = 1;
  } else if (e.target.id === "RightM") {
//    console.log("GPIO27 pressed");
    socket.emit("GPIO18", 1); 
    socket.emit("GPIO27", 1); 
    document.getElementById('GPIO18').checked = 1;
    document.getElementById('GPIO27').checked = 1;
  }
}

function ReportTouchEnd(e) {
  if (e.target.id === "ForwardM") {
    socket.emit("GPIO23", 0); 
    socket.emit("GPIO27", 0);
    document.getElementById('GPIO23').checked = 0;
    document.getElementById('GPIO27').checked = 0;
  } else if (e.target.id === "BackwardM") {
    socket.emit("GPIO17", 0); 
    socket.emit("GPIO18", 0);
    document.getElementById('GPIO17').checked = 0;
    document.getElementById('GPIO18').checked = 0;
  } else if (e.target.id === "LeftM") {
    socket.emit("GPIO17", 0); 
    socket.emit("GPIO23", 0);
    document.getElementById('GPIO17').checked = 0;
    document.getElementById('GPIO23').checked = 0;
  } else if (e.target.id === "RightM") {
    socket.emit("GPIO27", 0); 
    socket.emit("GPIO18", 0);
    document.getElementById('GPIO27').checked = 0;
    document.getElementById('GPIO18').checked = 0;
  }
}

function ReportMouseDown(e) {
  
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
  if (x === "Forward") {
    //     console.log("GPIO18 toggle");
         socket.emit("GPIO23T");  // send GPIO button toggle to node.js server
         socket.emit("GPIO27T");
       } else if (x === "Backward") {
    //     console.log("GPIO23 toggle");
         socket.emit("GPIO18T");  // send GPIO button toggle to node.js server
         socket.emit("GPIO17T")
       } else if (x === "Left") {
   //      console.log("GPIO17 toggle");
         socket.emit("GPIO23T");  // send GPIO button toggle to node.js server
         socket.emit("GPIO17T")
       } else if (x === "Right") {
     //    console.log("GPIO27 toggle");
         socket.emit("GPIO18T");  // send GPIO button toggle to node.js server
         socket.emit("GPIO27T")
       } 
  }
  
  if (e.target.id === "ForwardM") {
    socket.emit("GPIO23", 1); 
    socket.emit("GPIO27", 1); 
    document.getElementById('GPIO23').checked = 1;
    document.getElementById('GPIO27').checked = 1;
  } else if (e.target.id === "BackwardM") {
 //   console.log("GPIO23 pressed");
    socket.emit("GPIO18", 1);
    socket.emit("GPIO17", 1); 
    document.getElementById('GPIO18').checked = 1; 
    document.getElementById('GPIO17').checked = 1;
  } else if (e.target.id === "LeftM") {
  //  console.log("GPIO17 pressed");
    socket.emit("GPIO17", 1); 
    socket.emit("GPIO23", 1); 
    document.getElementById('GPIO23').checked = 1;
    document.getElementById('GPIO17').checked = 1;
  } else if (e.target.id === "RightM") {
//    console.log("GPIO27 pressed");
    socket.emit("GPIO18", 1); 
    socket.emit("GPIO27", 1); 
    document.getElementById('GPIO18').checked = 1;
    document.getElementById('GPIO27').checked = 1;
  }
}


function ReportMouseUp(e) {
  if (e.target.id === "ForwardM") {
    socket.emit("GPIO23", 0); 
    socket.emit("GPIO27", 0);
    document.getElementById('GPIO23').checked = 0;
    document.getElementById('GPIO27').checked = 0;
  } else if (e.target.id === "BackwardM") {
    socket.emit("GPIO17", 0); 
    socket.emit("GPIO18", 0);
    document.getElementById('GPIO17').checked = 0;
    document.getElementById('GPIO18').checked = 0;
  } else if (e.target.id === "LeftM") {
    socket.emit("GPIO17", 0); 
    socket.emit("GPIO23", 0);
    document.getElementById('GPIO17').checked = 0;
    document.getElementById('GPIO23').checked = 0;
  } else if (e.target.id === "RightM") {
    socket.emit("GPIO27", 0); 
    socket.emit("GPIO18", 0);
    document.getElementById('GPIO27').checked = 0;
    document.getElementById('GPIO18').checked = 0;
  }
}

function TouchMove(e) {

}



/** function to sense if device is a mobile device ***/
// Reference: https://stackoverflow.com/questions/11382773/detecting-a-mobile-browser

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


