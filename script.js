// Runs after the HTML is parsed (the script tag uses defer, and this is a
// second safety net in case the tag ever gets moved).
document.addEventListener("DOMContentLoaded", function () {
  var welcomeScreen = document.querySelector("#welcome");
  var closeButton = document.querySelector("#welcomeclose");
  var openButton = document.querySelector("#welcomeopen");
  var welcomeHeader = document.querySelector("#welcomeheader");

  // If any of these are null, the file names or IDs don't match the HTML.
  // The console message tells you which one instead of failing silently.
  if (!welcomeScreen || !closeButton || !openButton || !welcomeHeader) {
    console.error("Web OS: missing an element. Check the IDs in index.html.");
    return;
  }

  closeButton.addEventListener("click", function () {
    welcomeScreen.style.display = "none";
  });

  openButton.addEventListener("click", function () {
    // "flex" because .window uses display: flex. "block" would break the layout.
    welcomeScreen.style.display = "flex";
  });

  updateTime();
  setInterval(updateTime, 1000);

  makeDraggable(welcomeScreen, welcomeHeader);
});

function updateTime() {
  var timeElement = document.querySelector("#timeElement");
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleString();
  }
}

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
}        left: 200px;
        width: 420px;
        border: 1rem solid #000000;
        background-color: #3535c6;
        color: aliceblue;
        
      }

      #welcomeheader {
        margin: 0;
        padding: 8px 12px;
        background-color: #3535c6;
        cursor: move;
        user-select: none;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #welcomeclose {
        cursor: pointer;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: aliceblue;
        padding: 4px 8px;
      }

      #welcome .content {
        padding: 12px;
      }

      #welcome h3,
      #welcome p {
        margin: 0;
        padding: 8px 0;
      }

      #welcome a {
        color: aliceblue;
      }

    </style>
  </head>
  <body>
    <div id="taskbar">
       <p style="cursor: pointer" id="welcomeopen">Hikmat's Web OS</p>
      <p>xD</p>
      <p id="timeElement"></p>
    </div>

    <div id="welcome">
      <p style="position: absolute; top: 0; right: 0; padding: 8px 12px; background-color: #3535c6; color: aliceblue; cursor: pointer" id="welcomeclose">X</p>
      <p id="welcomeheader">Welcome to Hikmat's Web OS</p>
      <div class="content">
        <h3>Introduction</h3>
        <p>Welcome to my operating system!</p>
        <a href="https://www.tiktok.com/@ktnev?_r=1&_t=ZS-98z6jgVH1ZX">Follow me on TikTok</a>
        <p>I am a 14 year old starting my journey in programming and YSWS.</p>
        <p>I love computers, building Software/Hardware and I love CyberSecurity.</p>
        <p>I joined The HackClub to make new friends and connect with like-minded people!</p>
     <div class="window" style="top: calc(50% - 540px); left: calc(50% - 210px)"></div>
        <div class="windowheader" id="welcomeheader">
        </div>
        <link rel="stylesheet" type="text/css" href="./styles.css" />
        <script src="./script.js"></script>
      </body>
  </html>
    
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
}
