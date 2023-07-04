const responsive = () => {
  const body = document.querySelector("body");
  const joinStartImg = document.querySelector("#join-start-img-responsive");
  const signUpContainer = document.querySelector("#sign-up-container");
  const loginContainer = document.querySelector("#login-container");

  setTimeout(() => {
    body.style.animation = "changeBcg 1s ease-in-out forwards";
    joinStartImg.style.animation = "changeImg 1s linear forwards";
    signUpContainer.style.animation = "fadeInResponsive 1s ease-in-out forwards";
    loginContainer.style.animation = "fadeInResponsive 1s ease-in-out forwards";
  }, 2000);
};
