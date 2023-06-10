const login = document.querySelector("#login-container");
const errorMessage = document.querySelector("#show-error-message");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const checkBox = document.querySelector("#login-check-box");
const signUp = document.querySelector("#signup-container");
const signUpContainer = document.querySelector("#sign-up-container");
const forgotPassword = document.querySelector("#forgot-password-container");
const resetPassword = document.querySelector("#reset-password-container");
const forgotPasswordInput = document.querySelector("#forgot-password-input");
const accountExist = document.querySelector("#account-exist");
const successfullyRegistered = document.querySelector(
  "#successfully-registered"
);
const sentConfirmationMessage = document.querySelector(
  "#sent-confirmation-message"
);

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
  const newPassword = document.querySelector("#new-password");
  const confirmPassword = document.querySelector("#confirm-password");
  const confirmMessage = document.querySelector(
    "#confirmation-of-reset-password"
  );
  if (newPassword.value === confirmPassword.value) {
    // Password matches - Change password on database
    // Open success message and redirect to login
    confirmMessage.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";
    setTimeout(() => {
      resetPassword.style.display = "none";
    }, 1000);

    setTimeout(() => {
      confirmMessage.style.animation =
        "fadeSendMessageOut 1s ease-in-out forwards";
      window.location.replace("https://admirbajric.github.io/join/index.html");
    }, 2000);
  } else {
    const passwordFailed = document.querySelector("#password-failed-message");
    passwordFailed.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";

    setTimeout(() => {
      passwordFailed.style.animation =
        "fadeSendMessageOut 2s ease-in-out forwards";
    }, 1000);
  }
};

const userSignUp = () => {
  const signupName = document.querySelector("#signup-name");
  const signupEmail = document.querySelector("#signup-email");
  const signupPassword = document.querySelector("#signup-password");

  if (false) {
    // If User exists in database, show message "You are already registered. Click here to login in". If click to "here" then redirect to login screen too.
    accountExist.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";

    setTimeout(() => {
      accountExist.style.animation =
        "fadeSendMessageIn 600ms ease-in-out forwards";
    }, 1000);

    setTimeout(() => {
      window.location.replace("https://admirbajric.github.io/join/index.html");
    }, 2000);
  } else {
    // If user not exist in database, save the user in database. Show message "You have successfully registered" and redirect to login screen.
    successfullyRegistered.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";

    setTimeout(() => {
      successfullyRegistered.style.animation =
        "fadeSendMessageOut 1s ease-in-out forwards";
    }, 1000);

    setTimeout(() => {
      window.location.replace("https://admirbajric.github.io/join/index.html");
    }, 2000);
  }
};

const guestLogin = () => {
  // Redirect to summary.html
  console.log("Redirect to summary.html as Guest");
};
