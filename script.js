const loading = () => {
  const loginContainer = document.querySelectorAll(".login-container");
  const forgotPasswordContainer = document.querySelector(
    "#forgot-password-container"
  );
  loginContainer.forEach((element) => {
    element.style.display = "none";
  });
  forgotPasswordContainer.style.display = "flex";
};
