async function includeLoad() {
  await includeHTML();
  renderSummary();
  renderBoard();
  renderAddTask();
  renderContacts();
  renderLegalNotice();
}

// includeHTML
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/*sidebar navigation on*/
function gotoSummary() {
  window.location.href = "summary.html";
}

function gotoBoard() {
  window.location.href = "board.html";
}

function gotoAddTask() {
  window.location.href = "add-task.html";
}

function gotoContacts() {
  window.location.href = "contacts.html";
}

function gotoLegalNotice() {
  window.location.href = "legal_notice.html";
}
/*sidebar navigation off*/

/*sidebar hover frozen on*/
function renderSummary() {
  let summary = document.getElementById("summary");
  sidebarBtnActiveFN(summary);
  lastActivePage = "summary";
}

function renderBoard() {
  let board = document.getElementById("board");
  sidebarBtnActiveFN(board);
  lastActivePage = "board";
}

function renderAddTask() {
  let addTask = document.getElementById("addTask");
  sidebarBtnActiveFN(addTask);
  lastActivePage = "addTask";
}

function renderContacts() {
  let contacts = document.getElementById("contacts");
  sidebarBtnActiveFN(contacts);
  lastActivePage = "contacts";
}

function renderLegalNotice() {
  let legalNotice = document.getElementById("legalNotice");
  sidebarBtnActiveFN(legalNotice);
  lastActivePage = "legalNotice";
}

function sidebarBtnActiveFN(element) {
  const buttons = document.getElementsByClassName("sidebarBtn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("sidebarBtnActive");
  }
  element.classList.add("sidebarBtnActive");
}

function lastPage() {
  let currentPageUrl = window.location.href;

  let lastSlashIndex = currentPageUrl.lastIndexOf("/");

  let word = currentPageUrl.substring(
    lastSlashIndex + 1,
    currentPageUrl.length - 5
  );

  const sideBarDesktop = document.querySelector(".side-around");
  const sideBarDesktopActive = sideBarDesktop.querySelectorAll(".active");
  sideBarDesktopActive.forEach((a) => a.classList.remove("active"));

  const sideBarMobile = document.querySelector(".side-container_m");
  const sideBarMobileActive = sideBarMobile.querySelectorAll(".active");
  sideBarMobileActive.forEach((b) => b.classList.remove("active"));

  const findClass = document.querySelectorAll(`.${word}-sidebar`);

  findClass.forEach((c) => {
    c.classList.add("active");
  });
}
/*sidebar hover frozen off*/
