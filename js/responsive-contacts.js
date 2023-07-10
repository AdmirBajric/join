const responsive = () => {
  const addFormCloseImg = document.querySelector(".add-form-close-img");
  const editFormCloseImg = document.querySelector(".edit-form-close-img");

  if (window.innerWidth <= 700) {
    addFormCloseImg.src = "./assets/img/close-white.svg";
    editFormCloseImg.src = "./assets/img/close-white.svg";
  }

  window.addEventListener(
    "resize",
    (e) => {
      const activeContact = document.querySelector(".contact-user-active");
      renderContact(activeContact.id);
      if (window.innerWidth <= 700) {
        addFormCloseImg.src = "./assets/img/close-white.svg";
        editFormCloseImg.src = "./assets/img/close-white.svg";
      }
      contactsListMobile();
    },
    true
  );
};

const contactsListMobile = () => {
  if (window.innerWidth <= 700) {
    contactsContainer.style.position = "absolute";
    contactsContainer.style.top = "17rem";
    contactsList.style.display = "";
    crudContacts.style.display = "none";
    newContact.style.display = "flex";
  } else {
    contactsContainer.style.top = "8rem";
    crudContacts.style.display = "flex";
  }
};
