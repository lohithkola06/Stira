document.getElementById("startBtn").addEventListener("click", () => {
  const intent = document.getElementById("intentInput").value;
  chrome.storage.local.set({ intent }, () => {
    console.log("Intent set:", intent);
  });
});
