const contactsSelectedElements = () => {
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

const indexSelectedElements = () => {
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
  const passwordFailed = document.querySelector("#password-failed-message");
  const signupName = document.querySelector("#signup-name");
  const signupEmail = document.querySelector("#signup-email");
  const signupPassword = document.querySelector("#signup-password");
  const newPassword = document.querySelector("#new-password");
  const confirmPassword = document.querySelector("#confirm-password");
  const confirmMessage = document.querySelector(
    "#confirmation-of-reset-password"
  );
  const successfullyRegistered = document.querySelector(
    "#successfully-registered"
  );
  const sentConfirmationMessage = document.querySelector(
    "#sent-confirmation-message"
  );

  return [
    login,
    errorMessage,
    email,
    password,
    checkBox,
    signUp,
    signUpContainer,
    forgotPassword,
    resetPassword,
    forgotPasswordInput,
    accountExist,
    passwordFailed,
    signupName,
    signupEmail,
    signupPassword,
    confirmPassword,
    confirmMessage,
    newPassword,
    successfullyRegistered,
    sentConfirmationMessage,
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
