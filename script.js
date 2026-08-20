
setInterval(updateTime, 1000);

function updateTime() {
  var timeElement = document.querySelector("#timeElement");
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleString();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateTime();

  var welcomeScreen = document.querySelector("#welcome");
  var closeButton = document.querySelector("#welcomeclose");
  var openButton = document.querySelector("#welcomeopen");
  var welcomeHeader = document.querySelector("#welcomeheader");

 
  if (!welcomeScreen || !closeButton || !openButton || !welcomeHeader) {
    console.error("Web OS: missing an element. Check the IDs in index.html.", {
      welcome: !!welcomeScreen,
      welcomeclose: !!closeButton,
      welcomeopen: !!openButton,
      welcomeheader: !!welcomeHeader,
    });
    return;
  }

  closeButton.addEventListener("click", function () {
    welcomeScreen.style.display = "none";
  });

  openButton.addEventListener("click", function () {
   
    welcomeScreen.style.display = "flex";
  });

  makeDraggable(welcomeScreen, welcomeHeader);
});

function makeDraggable(element, handle) {
  var startX = 0;
  var startY = 0;

  handle.addEventListener("mousedown", function (event) {
    
    if (event.target.closest(".closeButton")) return;

    event.preventDefault();
    startX = event.clientX - element.offsetLeft;
    startY = event.clientY - element.offsetTop;

    function move(moveEvent) {
      var left = moveEvent.clientX - startX;
      var top = moveEvent.clientY - startY;

     
      var maxLeft = window.innerWidth - element.offsetWidth;
      var maxTop = window.innerHeight - element.offsetHeight;
      left = Math.min(Math.max(0, left), Math.max(0, maxLeft));
      top = Math.min(Math.max(0, top), Math.max(0, maxTop));

     
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
    }

    function stop() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  });
}
