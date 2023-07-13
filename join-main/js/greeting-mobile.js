let localstorage;

async function mobile() {
  greetSummaryAnimation();
  await greetingDay();
  mobileUsers();
}



  function greetSummaryAnimation() {

  const greetingElement = document.getElementById("mobileTextgreeting");
  const greetingElementtow = document.getElementById("mobileNamegreeting");

  if (window.innerWidth > 1500) {
    location.href = "summary.html";
  } else if (window.innerWidth < 1500) {

    setTimeout(() => {
      greetingElement.classList.add("fade-out");
      greetingElementtow.classList.add("fade-out");
      location.href = "summary.html";
    }, 2000);

    console.log(greetingElement);
    console.log(greetingElementtow);

  }
}

// greeting day on
async function greetingDay() {
  document.getElementById("mobileTextgreeting").innerText = alldayGreeting();
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

// greet mobile Users
function mobileUsers() {
    mobileusersName();
  }
  
  function mobileusersName() {
    localstorage = JSON.parse(localStorage.getItem("user"));
  
    const fullName = localstorage[0].name;
  
    const greetmobileName = document.getElementById("mobileNamegreeting");
  
    if (+localstorage[0].id === 0) {
      greetmobileName.innerHTML = "Dear Guest";
    } else {
      greetmobileName.innerHTML = fullName;
    }
  }