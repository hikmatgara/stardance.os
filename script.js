
updateTime();
setInterval(updateTime, 1000);

function updateTime() {
  var timeElement = document.querySelector("#timeElement");
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleString();
  }
}


var topZIndex = 1;

document.addEventListener("DOMContentLoaded", function () {
  updateTime();

  var windows = document.querySelectorAll(".window");

  windows.forEach(function (win) {
    var header = win.querySelector(".windowheader");
    if (header) makeDraggable(win, header);

    win.addEventListener("mousedown", function () {
      topZIndex += 1;
      win.style.zIndex = topZIndex;
    });

    var closeButton = win.querySelector(".closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        win.hidden = true;
      });
    }
  });

  document.querySelectorAll("[data-opens]").forEach(function (opener) {
    opener.addEventListener("click", function () {
      var target = document.querySelector("#" + opener.dataset.opens);
      if (!target) {
        console.error("Web OS: no window with id", opener.dataset.opens);
        return;
      }
      target.hidden = false;
      topZIndex += 1;
      target.style.zIndex = topZIndex;
    });
  });
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
