async function includeLoad() {
    await includeHTML();
}



// includeHTML
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