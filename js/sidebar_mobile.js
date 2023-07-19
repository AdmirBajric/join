async function includeLoad_mobile() {
  await includeHTMLmobile();
}

// includeHTML Mobile
async function includeHTMLmobile() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
      await activePage();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function goToPages(locationHref) {
  window.location.href = `${locationHref}.html`;
}
