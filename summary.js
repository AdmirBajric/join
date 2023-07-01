async function load() {
    await greetcontainerTowtow();
    await greetingDay();
    dateContainer();
}

async function greetcontainerTowtow() {
  document.getElementById("greet-textTow").innerText = allGreeting();
}

function allGreeting() {
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


/*
function greet() {
  const greetingElement = document.getElementById('greeting');
  let currentUser = decodeURIComponent(window.location.search.split('=')[1]);
  greetingElement.innerHTML = getGreeting();
  let greetUser = document.getElementById('user');
  greetUser.innerHTML = currentUser;
}
*/



/*date today*/
function dateContainer() {
    let containerDay = new Date().toLocaleString();
    containerDay = containerDay.slice(0, 10);
    let containerDayArray = containerDay.split(".");
    let containerMonth = getMonthContainer(containerDayArray[1]);
    containerDay = `${containerMonth} ${containerDayArray[0]}, ${containerDayArray[2]}`;
    document.getElementById('dateContainer').innerHTML = `<strong>${containerDay}</strong>`;
}

function getMonthContainer(i){
    const date = new Date();
    date.setMonth(i - 1);
    return date.toLocaleString('en-us', {month: 'short'});
  }

  

  //go to Board
function toBoard() {
    window.location.href = "board.html";
}