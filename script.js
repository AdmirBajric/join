const loading = () => {
  const loginContainer = document.querySelectorAll(".login-container");
  const forgotPasswordContainer = document.querySelector(
    "#forgot-password-container"
  );
  const resetPasswordContainer = document.querySelector(
    "#reset-password-container"
  );
  loginContainer.forEach((element) => {
    element.style.display = "none";
  });
  resetPasswordContainer.style.display = "flex";
};
