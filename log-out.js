/*header log out*/
function Logout() {
  if (document.getElementById("mobile-options").classList.contains("d-none")) {
    document.getElementById("mobile-options").classList.remove("d-none");
  } else {
    document.getElementById("mobile-options").classList.add("d-none");
  }
}

function Logoutout() {
  localStorage.clear();
  window.location.href = "index.html";
}
