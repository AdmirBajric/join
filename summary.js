async function load() {
    await greetingDay();
    dateContainer();
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



/*date today*/
function dateContainer() {
    let containerDay = new Date().toLocaleString();
    containerDay = containerDay.slice(0, 10);
    let containerDayArray = containerDay.split(".");
    let containerMonth = getMonthContainer(containerDayArray[1]);
    containerDay = containerMonth + " " + containerDayArray[0] + ", " + containerDayArray[2];
    document.getElementById('dateContainer').innerHTML = `<strong>${containerDay}</strong>`;
}

function getMonthContainer(i){
    const date = new Date();
    date.setMonth(i - 1);
    return date.toLocaleString('en-us', {month: 'short'});
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



// linked in all directions from here
function toBoard() {
    window.location.href = "board.html";
}