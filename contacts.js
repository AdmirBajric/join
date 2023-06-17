const [
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
] = contactsSelectedElements();

// Count for colors
let count = 0;

// Colors
const colors = colorsMix();

// Sample JSON data
const jsonData = userData();

// Parse the JSON data into an array of objects
let users = JSON.parse(jsonData);

// Create an object to hold the grouped names
let groupedNames = [];

// Reset array and count
const resetToStart = () => {
  groupedNames = [];
  count = 0;
};

const sortArray = () => {
  // Sort the array alphabetically by the fullName property
  users.sort((a, b) => a.fullName.localeCompare(b.fullName));
};

const groupNames = () => {
  // Group the names by their starting letters
  users.forEach((user) => {
    const firstLetter = user.fullName.charAt(0).toUpperCase();
    if (!groupedNames[firstLetter]) {
      groupedNames[firstLetter] = [];
    }
    groupedNames[firstLetter].push(user);
  });
};

const splitNameLastName = (user) => {
  const firstNameLetter = user.fullName.split(" ")[0].charAt(0);
  const firstLastLetter = user.fullName.split(" ")[1].charAt(0);

  return [firstNameLetter, firstLastLetter];
};

const countStart = () => {
  if (count < 19) {
    count++;
  } else {
    count = 0;
  }
};

const renderHTML = () => {
  resetToStart();
  sortArray();
  groupNames();

  // Generate the HTML output
  let htmlOutput = "";

  for (const letter in groupedNames) {
    htmlOutput += `<h2 class="contact-letter">${letter}</h2>`;
    htmlOutput += `<div class="contact-divider"></div>`;

    groupedNames[letter].forEach((user) => {
      const [firstNameLetter, firstLastLetter] = splitNameLastName(user);

      htmlOutput += renderContactsList(
        count,
        colors,
        firstNameLetter,
        firstLastLetter,
        user
      );
      countStart();
    });
  }

  // Display the HTML output
  renderContacts.innerHTML = htmlOutput;
};

const renderContact = (id) => {
  contactContainer.style.animation = "fadeOutContact 50ms ease-in-out forwards";
  contactContainer.innerHTML = "";

  const [firstNameLetter, firstLastLetter] = splitNameLastName(users[id]);

  let html = userContactPreview(
    colors,
    id,
    firstNameLetter,
    firstLastLetter,
    users
  );

  setTimeout(() => {
    contactContainer.style.animation = "fadeInContact 1s ease-in-out forwards";
    contactContainer.innerHTML = html;
    editContactHover();
    userContactHover();
  }, 500);
};

const editContactHover = () => {
  const editContactImg = document.querySelector(".edit-contact-img");
  editContactImg.addEventListener("mouseover", () => {
    editContactImg.src = "./assets/img/edit-contact-blue.svg";
  });

  editContactImg.addEventListener("mouseout", () => {
    editContactImg.src = "./assets/img/edit-contact-black.svg";
  });
};

const userContactHover = () => {
  const userContactAddTaskImg = document.querySelector(
    ".user-contact-add-task-img"
  );

  userContactAddTaskImg.addEventListener("mouseover", () => {
    userContactAddTaskImg.src = "./assets/img/add-task-blue-bold.svg";
  });

  userContactAddTaskImg.addEventListener("mouseout", () => {
    userContactAddTaskImg.src = "./assets/img/add-task-blue.svg";
  });
};

const openAddContact = () => {
  animateToggle("fadeIn", addContact);
  addContact.style.opacity = 1;
};

const closeAddContact = () => {
  animateToggle("fadeOut", addContact);
};

const closeEditContact = () => {
  animateToggle("fadeOut", editUserContact);
};

const editContact = (id) => {
  animateToggle("fadeIn", editUserContact);
  editUserContact.style.opacity = 1;

  const { email, fullName, phone } = users[id];

  editInputName.value = fullName;
  editInputEmail.value = email;
  editInputPhone.value = phone;

  createLetterAvatar(id);
  myButtonEvents(id);
};

const animateToggle = (stringFade, element) => {
  if (stringFade === "fadeIn") {
    element.style.animation = "addFadeIn 1s ease-in-out forwards";
  } else {
    element.style.animation = "addFadeOut 1s ease-in-out forwards";
  }
};

const createLetterAvatar = (id) => {
  const [firstNameLetter, firstLastLetter] = splitNameLastName(users[id]);
  editFormUserImg.innerHTML = `<p>${firstNameLetter}</p> <p>${firstLastLetter}</p>`;
  editFormUserImg.style.backgroundColor = colors[id];
};

const myButtonEvents = (id) => {
  editButtonsCancel.setAttribute("onclick", `deleteContact(${id})`);
  editButtonsCreate.setAttribute(
    "onsubmit",
    `saveEditedContact(${id}); return false;`
  );
};

const deleteContact = (id) => {
  const user = users[id];
  const filteredUser = users.filter((u) => {
    if (u.email !== user.email) {
      return u;
    }
  });

  users = filteredUser;
  contactContainer.innerHTML = "";
  renderContacts.innerHTML = "";
  closeEditContact();
  renderHTML();
};

const saveEditedContact = (id) => {
  const user = users[id];

  filterTheUsers(user);
  renderContacts.innerHTML = "";
  closeEditContact();
  renderHTML();
  const index = users.findIndex((o) => o.email === user.email);
  renderContact(index);
};

const filterTheUsers = (user) => {
  const [name, email, phone] = inputFields();

  users.filter((r) => {
    if (user.email === r.email) {
      r.fullName = name.value;
      r.email = email.value;
      r.phone = phone.value;
    }
  });
};

const inputFields = () => {
  const name = document.querySelector("#edit-input-name");
  const email = document.querySelector("#edit-input-email");
  const phone = document.querySelector("#edit-input-phone");

  return [name, email, phone];
};

const createContact = () => {
  const [addFormNameInput, addFormEmailInput, addFormPhoneInput] =
    formInputFields();
  const newUser = {
    fullName: addFormNameInput.value,
    email: addFormEmailInput.value,
    phone: addFormPhoneInput.value,
  };

  users = [...users, newUser];

  clearInputsInnerHtml(addFormNameInput, addFormEmailInput, addFormPhoneInput);
  closeAddContact();
  renderHTML();
  const index = users.findIndex((o) => o.email === newUser.email);
  renderContact(index);
};

const clearInputsInnerHtml = (name, email, phone) => {
  renderContacts.innerHTML = "";
  name.value = "";
  email.value = "";
  phone.value = "";
};

const formInputFields = () => {
  const addFormNameInput = document.querySelector("#add-form-name-input");
  const addFormEmailInput = document.querySelector("#add-form-email-input");
  const addFormPhoneInput = document.querySelector("#add-form-phone-input");

  return [addFormNameInput, addFormEmailInput, addFormPhoneInput];
};

renderHTML();
