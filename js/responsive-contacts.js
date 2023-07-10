const responsive = () => {
  window.addEventListener(
    "resize",
    (e) => {
      const activeContact = document.querySelector(".contact-user-active");
      if (activeContact) {
        renderContact(activeContact.id);
      }
      responsive();
      contactsListMobile();
    },
    true
  );
  checkImg();
};

const checkImg = () => {
  const addFormCloseImg = document.querySelector(".add-form-close-img");
  const editFormCloseImg = document.querySelector(".edit-form-close-img");

  if (window.innerWidth <= 700) {
    addFormCloseImg.src = "./assets/img/close-white.svg";
    editFormCloseImg.src = "./assets/img/close-white.svg";
  } else {
    addFormCloseImg.src = "./assets/img/close.svg";
    editFormCloseImg.src = "./assets/img/close.svg";
  }
};

const contactsListMobile = () => {
  if (window.innerWidth <= 700) {
    contactsContainer.style.position = "absolute";
    contactsContainer.style.top = "17rem";
    contactsList.style.display = "";
    newContact.style.display = "flex";

    crudContacts.style.display = "none";
  } else {
    contactsContainer.style.top = "8rem";
    crudContacts.style.display = "flex";
  }
};
