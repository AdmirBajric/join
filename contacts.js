const addContact = document.querySelector("#add-contact");
const editUserContact = document.querySelector("#edit-contact");
const editFormUserImg = document.querySelector(".edit-form-user-img");
const editInputName = document.querySelector("#edit-input-name");
const editInputEmail = document.querySelector("#edit-input-email");
const editInputPhone = document.querySelector("#edit-input-phone");

// Count for colors
let count = 0;

// Colors
const colors = [
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

// Sample JSON data
const jsonData =
  '[{"fullName": "Andy Miller", "email": "andymiller@gmail.com", "phone": "015750943212"}, {"fullName": "Barbara Miller", "email": "barbaramiller@gmail.com", "phone": "015750943212"}, {"fullName": "Anto Miller", "email": "antomiller@gmail.com", "phone": "015750943212"}, {"fullName": "Candy Miller", "email": "candymiller@gmail.com", "phone": "015750943212"}, {"fullName": "Thomas Miller", "email": "thomasmiller@gmail.com", "phone": "015750943212"}, {"fullName": "Rudolf Miller", "email": "rudolfmiller@gmail.com", "phone": "015750943212"}, {"fullName": "Inga Miller", "email": "ingamiller@gmail.com", "phone": "015750943212"}, {"fullName": "Irma Miller", "email": "irmamiller@gmail.com", "phone": "015750943212"}, {"fullName": "Sara Miller", "email": "saramiller@gmail.com", "phone": "015750943212"}, {"fullName": "Daniela Miller", "email": "danielamiller@gmail.com", "phone": "015750943212"}, {"fullName": "Emily Miller", "email": "emilymiller@gmail.com", "phone": "015750943212"}, {"fullName": "Hans Miller", "email": "hansmiller@gmail.com", "phone": "015750943212"}, {"fullName": "Ingrid Miller", "email": "ingridmiller@gmail.com", "phone": "015750943212"}, {"fullName": "Frank Miller", "email": "frankmiller@gmail.com", "phone": "015750943212"}, {"fullName": "Kerstin Miller", "email": "kerstinmiller@gmail.com", "phone": "015750943212"}, {"fullName": "Frederic Miller", "email": "fredericmiller@gmail.com", "phone": "015750943212"}]';

// Parse the JSON data into an array of objects
const users = JSON.parse(jsonData);

// Sort the array alphabetically by the fullName property
users.sort((a, b) => a.fullName.localeCompare(b.fullName));

// Create an object to hold the grouped names
const groupedNames = {};

// Group the names by their starting letters
users.forEach((user) => {
  const firstLetter = user.fullName.charAt(0).toUpperCase();
  if (!groupedNames[firstLetter]) {
    groupedNames[firstLetter] = [];
  }
  groupedNames[firstLetter].push(user);
});

// Generate the HTML output
let htmlOutput = "";
for (const letter in groupedNames) {
  htmlOutput += `<h2 class="contact-letter">${letter}</h2>`;
  htmlOutput += `<div class="contact-divider"></div>`;

  groupedNames[letter].forEach((user) => {
    const firstNameLetter = user.fullName.split(" ")[0].charAt(0);
    const firstLastLetter = user.fullName.split(" ")[1].charAt(0);

    htmlOutput += `
    <div onclick="render(${count})" class="contact-user">
        <div style="background-color: ${colors[count]}" class="contact-user-init">
            <p>${firstNameLetter}</p>
            <p>${firstLastLetter}</p>
        </div>
        <div class="contact-info">
            <p class="contact-info-name">${user.fullName}</p>
            <p class="contact-info-email">${user.email}</p>
        </div>
    </div>
    `;

    if (count < 19) {
      count++;
    } else {
      count = 0;
    }
  });
}

// Display the HTML output
const renderContacts = document.querySelector("#render-contacts");
renderContacts.innerHTML = htmlOutput;

const render = (id) => {
  let contactContainer = document.querySelector("#contact-container");
  contactContainer.innerHTML = "";

  const firstNameLetter = users[id].fullName.split(" ")[0].charAt(0);
  const firstLastLetter = users[id].fullName.split(" ")[1].charAt(0);

  let html = `
  <div class="user-contact">
    <div style="background-color: ${colors[id]}" class="user-contact-init">
        <p>${firstNameLetter}</p>
        <p>${firstLastLetter}</p>
    </div>

    <div class="user-contact-info">
        <p class="user-contact-info-name">${users[id].fullName}</p>
        <div class="user-contact-add-task">
            <img src="./assets/img/plus-sign.svg" alt="Plus image" />
            <p>Add Task</p>
        </div>
    </div>
  </div>

  <div class="contact-information">
      <div class="contact-information-header">
        <p>Contact Information</p>
      </div>
      
      <div class="edit-contact">
        <img src="./assets/img/contact-pencil.svg" alt="Pencil" />
        <p onclick="editContact(${id})">Edit Contact</p>
      </div>
  </div>

  <div class="contact-email-phone">
      <div class="contact-email">
          <p class="contact-email-header">Email</p>
          <p class="contact-email-address">${users[id].email}</p>
      </div>
      <div class="contact-phone">
          <p class="contact-phone-header">Phone</p>
          <p class="contact-phone-number">${users[id].phone}</p>
      </div>
  </div>
  `;

  contactContainer.innerHTML = html;
};

const openAddContact = () => {
  addContact.style.animation = "addFadeIn 1s ease-in-out forwards";
  addContact.style.opacity = 1;
};

const closeAddContact = () => {
  addContact.style.animation = "addFadeOut 1s ease-in-out forwards";
};

const closeEditContact = () => {
  editUserContact.style.animation = "addFadeOut 1s ease-in-out forwards";
};

const editContact = (id) => {
  editUserContact.style.animation = "addFadeIn 1s ease-in-out forwards";
  editUserContact.style.opacity = 1;

  const { email, fullName, phone } = users[id];

  editInputName.value = fullName;
  editInputEmail.value = email;
  editInputPhone.value = phone;

  const firstNameLetter = users[id].fullName.split(" ")[0].charAt(0);
  const firstLastLetter = users[id].fullName.split(" ")[1].charAt(0);

  editFormUserImg.innerHTML = `<p>${firstNameLetter}</p> <p>${firstLastLetter}</p>`;
  editFormUserImg.style.backgroundColor = colors[id];
};

const deleteContact = () => {
  console.log("Delete Contact");
};
