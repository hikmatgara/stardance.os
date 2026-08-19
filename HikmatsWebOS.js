
var welcomeScreen = document.querySelector("#welcome");
var closeButton = document.querySelector("#welcomeclose");
var openButton = document.querySelector("#welcomeopen");

closeButton.addEventListener("click", function() {
    welcomeScreen.style.display = "none";
});

openButton.addEventListener("click", function() {
    welcomeScreen.style.display = "block";
});

function updateTime() {
  var HikmatOScurrentTime = new Date().toLocaleString();
    var HikmatOStimeText = document.querySelector("#timeElement");
    HikmatOStimeText.innerHTML = HikmatOScurrentTime;
    }
    setInterval(function() {
      document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
    }, 1000);
    var initialY = 0;
  var currentX = 0;
  var currentY = 0;


dragElement(document.getElementById("window"));


function dragElement(element) {

  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  
  if (document.getElementById(element.id + "header")) {
    
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    
    element.onmousedown = startDragging;
  }

  
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
  
    initialX = e.clientX;
    initialY = e.clientY;
   
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
