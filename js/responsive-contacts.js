const responsive = () => {
  const addFormCloseImg = document.querySelector(".add-form-close-img");
  const editFormCloseImg = document.querySelector(".edit-form-close-img");

  if (window.innerWidth <= 428) {
    addFormCloseImg.src = "./assets/img/close-white.svg";
    editFormCloseImg.src = "./assets/img/close-white.svg";
  }

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth <= 428) {
        addFormCloseImg.src = "./assets/img/close-white.svg";
        editFormCloseImg.src = "./assets/img/close-white.svg";
      }
    },
    true
  );
};

const contactsListMobile = () => {
  contactsContainer.style.position = "absolute";
  contactsContainer.style.top = "17rem";
  contactsList.style.display = "block";
  crudContacts.style.display = "none";
  newContact.style.display = "flex";
};
