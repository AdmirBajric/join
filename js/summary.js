let fromLocalStorage;

async function load() {
  await greetingDay();
  await usersName();
}

// greeting day on
async function greetingDay() {
  document.getElementById("dayGreeting").innerText = await alldayGreeting();
}

async function alldayGreeting() {
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

async function usersName() {
  fromLocalStorage = JSON.parse(localStorage.getItem("user"));

  const fullName = fromLocalStorage[0].name;

  const greetName = document.getElementById("greet-name");

  if (+fromLocalStorage[0].id === 0) {
    greetName.innerHTML = "Dear Guest";
  } else {
    greetName.innerHTML = fullName;
  }
}