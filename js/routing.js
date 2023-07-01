const handleUrlChange = (e) => {
  if (!localStorage.getItem("user")) {
    location.replace("index.html");
  }
};

// Add event listener to detect URL changes
window.addEventListener("popstate", handleUrlChange);

// Initial call to handleUrlChange in case the page is loaded with a specific URL
handleUrlChange();
