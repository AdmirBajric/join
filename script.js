const loading = () => {
  const loginContainer = document.querySelectorAll(".login-container");
  const login = document.querySelector("#login-container");
  loginContainer.forEach((element) => {
    element.style.display = "none";
  });
  login.style.display = "flex";
};

const register = (e) => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const checkBox = document.querySelector("#login-check-box");
  // Fetch login details
  // If true - if exists then redirect.
  window.location.replace("https://www.facebook.com/admir.bajric29/");
};
