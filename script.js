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

const loginUser = (e) => {
  hideErrorMessages();
  if (false) {
    // If condition please replace with "if the user is logged in"
    // If user logged successfully redirect to summary.html
    window.location.replace("https://admirbajric.github.io/join/summary.html");
  } else {
    errorMessage.style.opacity = 1;
    errorMessage.style.animation = "fadeSendMessageIn 1s ease-in-out forwards";
  }

  email.value = "";
  password.value = "";
  checkBox.checked = false;
};

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

const hideErrorMessages = () => {
  email.focus();
  errorMessage.style.opacity = 0;
  errorMessage.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";
};

const sendEmail = () => {
  // Send resetpassword link to user in the real application
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
    window.location.replace("https://admirbajric.github.io/join/index.html");
  }, 2000);
};

const userSignUp = () => {
  if (false) {
    // If User exists in database, show message "You are already registered. Click here to login in". If click "here" then redirect to login screen too.
    accountExist.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";

    userExistOnSignUp();
  } else {
    // If user not exist in database, save the user in database. Show message "You have successfully registered" and redirect to login screen.
    successfullyRegistered.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";

    userNotExistOnSignUp();
  }
};

const userNotExistOnSignUp = () => {
  setTimeout(() => {
    successfullyRegistered.style.animation =
      "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1000);

  setTimeout(() => {
    window.location.replace("https://admirbajric.github.io/join/index.html");
  }, 2000);
};

const userExistOnSignUp = () => {
  setTimeout(() => {
    accountExist.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";
  }, 1000);

  setTimeout(() => {
    window.location.replace("https://admirbajric.github.io/join/index.html");
  }, 2000);
};

const guestLogin = () => {
  // Redirect to summary.html
  window.location.replace("https://admirbajric.github.io/join/summary.html");
};
