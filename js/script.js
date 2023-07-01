const [
  login,
  errorMessage,
  email,
  password,
  checkBox,
  signUp,
  signUpContainer,
  forgotPassword,
  resetPassword,
  forgotPasswordInput,
  accountExist,
  passwordFailed,
  signupName,
  signupEmail,
  signupPassword,
  confirmPassword,
  confirmMessage,
  newPassword,
  successfullyRegistered,
  sentConfirmationMessage,
] = indexSelectedElements();

const registerScreen = () => {
  hideAllContainers();

  errorMessage.style.opacity = 0;
  errorMessage.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";

  signUp.style.display = "flex";
  signUpContainer.style.display = "none";
};

const backToLoginPage = () => {
  hideAllContainers();
  signUpContainer.style.display = "flex";
  login.style.display = "flex";
};

const hideAllContainers = () => {
  const loginContainer = document.querySelectorAll(".login-container");
  loginContainer.forEach((element) => {
    element.style.display = "none";
  });
};

const forgotScreen = () => {
  hideAllContainers();
  forgotPassword.style.display = "flex";
  signUpContainer.style.display = "none";
};

const sendEmail = () => {
  // Send resetpassword link to the user in the real application
  // In this project we open the reset screen of course to reset the password immediately
  forgotPassword.style.display = "none";
  forgotPasswordInput.value = "";
  sentConfirmationMessage.style.animation =
    "fadeSendMessageIn 600ms ease-in-out forwards";
  setTimeout(() => {
    resetPassword.style.display = "flex";
    sentConfirmationMessage.style.animation =
      "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1500);
};

const userResetPassword = () => {
  if (newPassword.value === confirmPassword.value) {
    // Password matches - Change password on database
    // Open success message and redirect to login
    confirmMessage.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";
    passwordSuccessReset();
  } else {
    passwordResetFailed();
  }
};

const passwordResetFailed = () => {
  passwordFailed.style.animation =
    "fadeSendMessageIn 600ms ease-in-out forwards";

  setTimeout(() => {
    passwordFailed.style.animation =
      "fadeSendMessageOut 2s ease-in-out forwards";
  }, 1000);
};

const passwordSuccessReset = () => {
  setTimeout(() => {
    resetPassword.style.display = "none";
  }, 1000);

  setTimeout(() => {
    confirmMessage.style.animation =
      "fadeSendMessageOut 1s ease-in-out forwards";
    location.replace("https://admirbajric.github.io/join/index.html");
  }, 2000);
};

const handleUrlChange = (e) => {
  if (localStorage.getItem("user")) {
    location.replace("summary.html");
  }
};

// Add event listener to detect URL changes
window.addEventListener("popstate", handleUrlChange);

// Initial call to handleUrlChange in case the page is loaded with a specific URL
handleUrlChange();
