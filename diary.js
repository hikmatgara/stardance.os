
document.addEventListener("DOMContentLoaded", function () {
  var textarea = document.querySelector("#diaryText");
  var status = document.querySelector("#diaryStatus");
  var STORAGE_KEY = "webos-diary";

  if (!textarea) {
    console.error("Diary: #diaryText not found in index.html.");
    return;
  }

  try {
    textarea.value = localStorage.getItem(STORAGE_KEY) || "";
  } catch (error) {
    console.error("Diary: could not read saved text.", error);
  }

  var saveTimer;

  textarea.addEventListener("input", function () {
    if (status) status.textContent = "Saving...";

    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        localStorage.setItem(STORAGE_KEY, textarea.value);
        if (status) {
          status.textContent = "Saved at " + new Date().toLocaleTimeString();
        }
      } catch (error) {
        if (status) status.textContent = "Could not save. Storage is full or blocked.";
        console.error("Diary: save failed.", error);
      }
    }, 400);
  });
});
