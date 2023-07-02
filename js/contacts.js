const [
  contactBody,
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
  newContact,
] = contactsSelectedElements();

// Count for colors
let count = 0;

// Colors
const colors = colorsMix();

// JSON data
const data = localStorage.getItem("userContacts");
const jsonData = JSON.parse(data);

// Parse the JSON data
let userObject = jsonData;
let userContacts = jsonData[0]?.contacts;

// Create an object to hold the grouped names
let groupedNames = [];

// Reset array and count
const resetToStart = () => {
  groupedNames = [];
  count = 0;
};

const sortArray = () => {
  // Sort the array alphabetically by the fullName property
  userContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
};

const groupNames = () => {
  // Group the names by their starting letters
  userContacts.forEach((user) => {
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
  clearActiveState();
  toggleActiveState(id);

  contactContainer.style.animation = "fadeOutContact 50ms ease-in-out forwards";
  contactContainer.innerHTML = "";

  const [firstNameLetter, firstLastLetter] = splitNameLastName(
    userContacts[id]
  );

  let html = userContactPreview(
    colors,
    id,
    firstNameLetter,
    firstLastLetter,
    userContacts
  );

  setTimeout(() => {
    contactContainer.style.animation = "fadeInContact 1s ease-in-out forwards";
    contactContainer.innerHTML = html;
    editContactHover();
    userContactHover();
  }, 100);
};

const clearActiveState = () => {
  const contactUser = document.querySelectorAll(".contact-user-active");
  contactUser.forEach((a) => {
    a.classList.remove("contact-user-active");
    a.classList.add("contact-user");
  });
};

const toggleActiveState = (id) => {
  const contactUser = document.querySelector(`.contact-user-${id}`);

  contactUser.classList.add("contact-user-active");
  contactUser.classList.remove("contact-user");
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
  contactBody.style.opacity = 0.3;
  contactBody.style.zIndex = -1;
  animateToggle("fadeIn", addContact);
  addContact.style.opacity = 1;
};

const closeAddContact = () => {
  contactBody.style.opacity = 1;
  contactBody.style.zIndex = 1;
  animateToggle("fadeOut", addContact);
};

const closeEditContact = () => {
  contactBody.style.opacity = 1;
  contactBody.style.zIndex = 1;
  animateToggle("fadeOut", editUserContact);
};

const editContact = (id) => {
  contactBody.style.opacity = 0.3;
  contactBody.style.zIndex = -1;
  animateToggle("fadeIn", editUserContact);
  editUserContact.style.opacity = 1;

  const { email, fullName, phone } = userContacts[id];

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
  const [firstNameLetter, firstLastLetter] = splitNameLastName(
    userContacts[id]
  );
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

const deleteContact = async (id) => {
  const user = userContacts[id];

  const userId = JSON.parse(localStorage.getItem("userContacts"));

  const filterContacts = userContacts.filter((u) => {
    if (u.email !== user.email) {
      return u;
    }
  });

  const newUserObject = [
    { ownerId: userId[0].ownerId, contacts: filterContacts },
  ];

  await setItem("contacts", JSON.stringify(newUserObject));
  localStorage.setItem("userContacts", JSON.stringify(newUserObject));

  userContacts = filterContacts;
  contactContainer.innerHTML = "";
  renderContacts.innerHTML = "";
  closeEditContact();
  renderHTML();
};

const saveEditedContact = async (id) => {
  const user = userContacts[id];

  const userFiltered = await filterTheUsers(user);

  const userId = JSON.parse(localStorage.getItem("userContacts"));

  const newUserObject = [
    { ownerId: userId[0].ownerId, contacts: userFiltered },
  ];

  await setItem("contacts", JSON.stringify(newUserObject));
  localStorage.setItem("userContacts", JSON.stringify(newUserObject));

  renderContacts.innerHTML = "";
  closeEditContact();
  renderHTML();
  const index = userContacts.findIndex((o) => o.email === user.email);
  console.log(index);
  renderContact(id);
};

const filterTheUsers = async (user) => {
  const [name, email, phone] = inputFields();

  const filterUser = await userContacts.filter((r) => {
    if (user.email === r.email) {
      r.fullName = name.value;
      r.email = email.value;
      r.phone = phone.value;
      return r;
    }
    return r;
  });

  return filterUser;
};

const inputFields = () => {
  const name = document.querySelector("#edit-input-name");
  const email = document.querySelector("#edit-input-email");
  const phone = document.querySelector("#edit-input-phone");

  return [name, email, phone];
};

const createContact = async () => {
  const [addFormNameInput, addFormEmailInput, addFormPhoneInput] =
    formInputFields();

  const newUser = {
    fullName: addFormNameInput.value,
    email: addFormEmailInput.value,
    phone: addFormPhoneInput.value,
  };

  const id = JSON.parse(localStorage.getItem("user"))[0].id;
  let allContacts = JSON.parse(await getItem("contacts"));

  let filterUserContacts = allContacts.filter((contact) => {
    if (contact.ownerId === id) {
      return contact;
    }
  });

  filterUserContacts[0].contacts = [
    ...filterUserContacts[0]?.contacts,
    newUser,
  ];

  const updateContacts = allContacts.filter((c) => {
    console.log(c);
    if (c.ownerId === id) {
      return filterUserContacts;
    }
  });

  await setItem("contacts", JSON.stringify(updateContacts));
  localStorage.setItem("userContacts", JSON.stringify(updateContacts));

  userContacts = updateContacts[0].contacts;

  clearInputsInnerHtml(addFormNameInput, addFormEmailInput, addFormPhoneInput);
  closeAddContact();
  renderHTML();
  const index = userContacts.findIndex((o) => o.email === newUser.email);
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

if (jsonData.length > 0) {
  renderHTML();
}
