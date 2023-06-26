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