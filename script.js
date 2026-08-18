const BOOT_LINES = [
  "StardanceOS BIOS v0.1.0",
  "Copyright (c) 2026 Hack Club",
  "",
  "Initializing kernel.......... OK",
  "Mounting virtual filesystem... OK",
  "Loading window manager....... OK",
  "Checking memory: 65536K OK",
  "Detecting input devices...... OK",
  "Starting network stack....... OK",
  "",
  "Booting StardanceOS...",
];

const bootLog = document.getElementById("boot-log");
const bootBar = document.getElementById("boot-bar");
const bootScreen = document.getElementById("boot-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const enterBtn = document.getElementById("enter-btn");

function typeLine(line, container) {
  return new Promise((resolve) => {
    let i = 0;
    const span = document.createElement("div");
    container.appendChild(span);

    if (line === "") {
      resolve();
      return;
    }

    const interval = setInterval(() => {
      span.textContent = line.slice(0, i + 1);
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        resolve();
      }
    }, 12);
  });
}

async function runBootSequence() {
  for (const line of BOOT_LINES) {
    await typeLine(line, bootLog);
  }

  await animateBootBar();
  await wait(300);
  showWelcomeScreen();
}

function animateBootBar() {
  return new Promise((resolve) => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 12 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        resolve();
      }
      bootBar.style.width = pct + "%";
    }, 120);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showWelcomeScreen() {
  bootScreen.style.display = "none";
  welcomeScreen.classList.remove("hidden");
  requestAnimationFrame(() => {
    welcomeScreen.classList.add("visible");
  });
  setTimeout(() => {
    enterBtn.classList.add("visible");
  }, 900);
}

enterBtn.addEventListener("click", () => {
  console.log("Continuing into StardanceOS desktop...");
  // Hook up your desktop/window-manager entry point here.
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && enterBtn.classList.contains("visible")) {
    enterBtn.click();
  }
});

runBootSequence();
