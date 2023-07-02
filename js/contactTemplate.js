// This function is used to generate a template for contacts
const renderContactsList = (
  count,
  colors,
  firstNameLetter,
  firstLastLetter,
  user
) => {
  return `
    <div onclick="renderContact(${count})" class="contact-user contact-user-${count}">
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
};

// This function is used to generate a template for render one specific contact
const userContactPreview = (
  colors,
  id,
  firstNameLetter,
  firstLastLetter,
  users
) => {
  return `
    <div class="user-contact">
      <div style="background-color: ${colors[id]}" class="user-contact-init">
          <p>${firstNameLetter}</p>
          <p>${firstLastLetter}</p>
      </div>
  
      <div class="user-contact-info">
          <p class="user-contact-info-name">${users[id].fullName}</p>
          <div onclick="addTask(${id})" class="user-contact-add-task">
              <img class="user-contact-add-task-img" src="./assets/img/add-task-blue.svg" alt="Add task image" />
          </div>
      </div>
    </div>
  
    <div class="contact-information">
        <div class="contact-information-header">
          <p>Contact Information</p>
        </div>
        
        <div onclick="editContact(${id})" class="edit-contact">
          <img class="edit-contact-img" src="./assets/img/edit-contact-black.svg" alt="Pencil" />
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
};
