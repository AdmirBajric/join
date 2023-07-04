const responsive = () => {
  const body = document.querySelector("body");
  const joinStartImg = document.querySelector("#join-start-img-responsive");

  setTimeout(() => {
    body.style.animation = "changeBcg 1s ease-in-out forwards";
    joinStartImg.style.animation = "changeImg 1s linear forwards";
  }, 2000);
};
