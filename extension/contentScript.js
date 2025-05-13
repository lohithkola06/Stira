chrome.storage.local.get("intent", ({ intent }) => {
  if (!intent) return;

  // Example: if user is on YouTube and intends to learn React, hide sidebar
  if (location.hostname.includes("youtube.com") && !intent.toLowerCase().includes("nba")) {
    const sidebar = document.getElementById("related");
    if (sidebar) sidebar.style.display = "none";
  }
});
