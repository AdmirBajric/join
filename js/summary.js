async function load() {
  await greetingDay();
  greet();
}

// greeting day on
async function greetingDay() {
  document.getElementById("dayGreeting").innerText = alldayGreeting();
}

function alldayGreeting() {
  let hour = new Date().getHours();
  if (4 <= hour && hour <= 11) {
    return "Good morning,";
  }
  if (11 < hour && hour <= 19) {
    return "Good afternoon,";
  }
  if (19 < hour || hour < 4) {
    return "Good evening,";
  }
}

function formatDate(dateString) {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  document.getElementById(
    "dateContainer"
  ).innerHTML = `<strong>${formattedDate}</strong>`;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputDate = new Date();
  formatDate(inputDate);
});

//go to Board
function toBoard() {
  window.location.href = "board.html";
}

// greet name
/*
let user;

function greet() {
  if (user = JSON.parse(localStorage.getItem("user")) == 0)
  {
    document.getElementById('greet-name').innerHTML = 'Goast';
  }else{
    greetName();
  }
}

function greetName() {
  user = JSON.parse(localStorage.getItem("user"));
  document.getElementById('greet-name').innerHTML = `${user.name}`;
}
*/

function greet(){
  if (localStorage.getItem('username')) {
    let username = localStorage.getItem('username');
    document.getElementById("greet-name").innerHTML = username; 
  } else {
    document.getElementById("greet-name").innerHTML = 'Dear Guest'
  }
}



