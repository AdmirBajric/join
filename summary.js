async function load() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

// linked in all directions from here

function toBoard() {
    window.location.href = "board.html";
}

/*header log out*/
function Logout() {
    if(document.getElementById('log-img').classList.contains('d-none')) {
        document.getElementById('log-img').classList.remove('d-none')
    }else{
        document.getElementById('log-img').classList.add('d-none')
    }
}

function Logoutout() {
  //  localStorage.removeItem("");
    window.location.href = "index.html";
}

/*sidebar navigation*/
function gotoSummary() {
    window.location.href = "summary.html";
}

function gotoBoard() {
    window.location.href = "board.html";
}

function gotoAddTask() {
    window.location.href = "add_task.html";
}

function gotoContacts() {
    window.location.href = "contacts.html";
}

function gotoLegalNotice() {
    window.location.href = "legal_notice.html";
}