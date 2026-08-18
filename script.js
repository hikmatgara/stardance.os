:root {
  --bg: #0a0e0a;
  --fg: #33ff66;
  --fg-dim: #1a7a35;
  --amber: #ffb000;

  --rust: #b7410e;
  --rust-bright: #e0611c;
  --rust-dark: #241812;
  --metal: #5a4c3f;
  --metal-dark: #221a15;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  background: var(--bg);
  overflow: hidden;
  font-family: "SF Mono", "Consolas", "Menlo", monospace;
}

/* ---------- Boot screen ---------- */

#boot-screen {
  width: 100%;
  height: 100%;
  background: var(--bg);
  color: var(--fg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

#boot-log {
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0 0 4px rgba(51, 255, 102, 0.5);
}

#boot-log .line-ok {
  color: var(--fg);
}

#boot-log .line-warn {
  color: var(--amber);
}

#boot-log .cursor {
  display: inline-block;
  width: 8px;
  background: var(--fg);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

#boot-bar-wrap {
  margin-top: 16px;
  width: 100%;
  height: 6px;
  background: var(--fg-dim);
  border: 1px solid var(--fg);
}

#boot-bar {
  width: 0%;
  height: 100%;
  background: var(--fg);
  box-shadow: 0 0 8px var(--fg);
  transition: width 0.15s linear;
}

/* ---------- Welcome screen ---------- */

#welcome-screen {
  width: 100%;
  height: 100%;
  position: relative;
  background:
    repeating-linear-gradient(115deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px),
    repeating-linear-gradient(25deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px),
    radial-gradient(ellipse at 20% 30%, rgba(183, 65, 14, 0.18) 0%, transparent 45%),
    radial-gradient(ellipse at 80% 75%, rgba(183, 65, 14, 0.14) 0%, transparent 50%),
    radial-gradient(circle at center, var(--metal) 0%, var(--metal-dark) 60%, #14100c 100%);
  color: var(--rust-bright);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.8s ease;
  box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.75);
  font-family: "Arial Narrow", "Helvetica Neue Condensed", "Segoe UI", sans-serif;
}

#welcome-screen.visible {
  opacity: 1;
}

#welcome-screen.hidden {
  display: none;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.logo {
  font-size: 52px;
  font-weight: 900;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--rust-bright);
  text-shadow:
    0 0 18px rgba(224, 97, 28, 0.5),
    2px 2px 0 rgba(0, 0, 0, 0.6),
    -1px -1px 0 rgba(255, 180, 130, 0.15);
}

.logo-dim {
  color: var(--rust);
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.4);
}

.tagline {
  font-size: 13px;
  letter-spacing: 3px;
  color: #b89a82;
  text-transform: uppercase;
  font-weight: 700;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 2px solid var(--metal);
  border-top-color: var(--rust-bright);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin-top: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

#enter-btn {
  margin-top: 20px;
  background: linear-gradient(180deg, rgba(90, 76, 63, 0.6), rgba(34, 26, 21, 0.8));
  color: var(--rust-bright);
  border: 2px solid var(--rust);
  padding: 10px 24px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  transition: opacity 0.4s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

#enter-btn.visible {
  opacity: 1;
}

#enter-btn:hover {
  background: linear-gradient(180deg, rgba(224, 97, 28, 0.25), rgba(34, 26, 21, 0.85));
  border-color: var(--rust-bright);
  box-shadow: 0 0 14px rgba(224, 97, 28, 0.35);
}

.version-tag {
  position: absolute;
  bottom: 16px;
  font-size: 11px;
  color: var(--metal);
  letter-spacing: 1px;
  text-transform: uppercase;
}
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
