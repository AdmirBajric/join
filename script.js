const errorMessage = document.querySelector("#show-error-message");

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

  if (false) {
    window.location.replace("https://www.facebook.com/admir.bajric29/");
  } else {
    errorMessage.style.opacity = 1;
    errorMessage.style.animation = "fadeSendMessageIn 1s ease-in-out forwards";
  }

  email.value = "";
  password.value = "";
  checkBox.checked = false;
};

const registerPage = () => {
  const loginContainer = document.querySelectorAll(".login-container");
  const signUp = document.querySelector("#signup-container");
  const signUpContainer = document.querySelector("#sign-up-container");
  loginContainer.forEach((element) => {
    element.style.display = "none";
  });

  errorMessage.style.opacity = 0;
  errorMessage.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";

  signUp.style.display = "flex";
  signUpContainer.style.display = "none";
};
