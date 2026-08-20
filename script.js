// The clock is set up first and on its own, so a problem with the window
// code can never stop it from running.
updateTime();
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

  // If any of these are null, the IDs in index.html don't match.
  // This logs which piece is missing instead of failing silently.
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
    // "flex" because .window uses display: flex. "block" would break the layout.
    welcomeScreen.style.display = "flex";
  });

  makeDraggable(welcomeScreen, welcomeHeader);
});

function makeDraggable(element, handle) {
  var startX = 0;
  var startY = 0;

  handle.addEventListener("mousedown", function (event) {
    // Don't start a drag when the close button inside the header is clicked.
    if (event.target.closest(".closeButton")) return;

    event.preventDefault();
    startX = event.clientX - element.offsetLeft;
    startY = event.clientY - element.offsetTop;

    function move(moveEvent) {
      var left = moveEvent.clientX - startX;
      var top = moveEvent.clientY - startY;

      // Keep the window on screen.
      var maxLeft = window.innerWidth - element.offsetWidth;
      var maxTop = window.innerHeight - element.offsetHeight;
      left = Math.min(Math.max(0, left), Math.max(0, maxLeft));
      top = Math.min(Math.max(0, top), Math.max(0, maxTop));

      // Backticks with ${ } — using $( ) here is what broke the old version.
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
