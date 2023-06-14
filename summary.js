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