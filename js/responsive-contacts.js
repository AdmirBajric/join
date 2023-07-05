const responsive = () => {
  const addFormCloseImg = document.querySelector(".add-form-close-img");

  if (window.innerWidth <= 428) {
    addFormCloseImg.src = "./assets/img/close-white.svg";
  }
};
