const selectedElements = () => {
  const addContact = document.querySelector("#add-contact");
  const editUserContact = document.querySelector("#edit-contact");
  const editFormUserImg = document.querySelector(".edit-form-user-img");
  const editInputName = document.querySelector("#edit-input-name");
  const editInputEmail = document.querySelector("#edit-input-email");
  const editInputPhone = document.querySelector("#edit-input-phone");
  const editButtonsCancel = document.querySelector("#edit-buttons-cancel");
  const editButtonsCreate = document.querySelector("#edit-form");
  const renderContacts = document.querySelector("#render-contacts");
  const contactContainer = document.querySelector("#contact-container");

  return [
    addContact,
    editUserContact,
    editFormUserImg,
    editInputName,
    editInputEmail,
    editInputPhone,
    editButtonsCancel,
    editButtonsCreate,
    renderContacts,
    contactContainer,
  ];
};

const colorsMix = () => {
  return [
    "#ff7a00",
    "#ffc701",
    "#fc71ff",
    "#1fd7c1",
    "#0038ff",
    "#f44336",
    "#0190e0",
    "#ee00d6",
    "#02cf2f",
    "#ffa800",
    "#9327ff",
    "#ff5c00",
    "#4e963d",
    "#32daff",
    "#007cee",
    "#0223cf",
    "#cb02cf",
    "#462f8a",
    "#ffc700",
    "#af1616",
  ];
};
