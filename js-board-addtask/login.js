const loginUser = async () => {
  hideErrorMessages();

  const userExist = await filterUser(email.value, password.value);

  if (userExist.length > 0) {
    const userId = userExist[0].id;
    await filterUserTasks(userId);
    await filterUserContacts(userId);
    location.href = "summary.html";
  } else {
    errorMessage.style.opacity = 1;
    errorMessage.style.animation = "fadeSendMessageIn 1s ease-in-out forwards";
  }
};

const hideErrorMessages = () => {
  email.focus();
  errorMessage.style.opacity = 0;
  errorMessage.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";
};

const filterUser = async (email, password) => {
  let users = JSON.parse(await getItem("users"));

  const userExist = users.filter((user) => {
    if (user.email === email && user.password === password) {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }
  });

  return userExist;
};

const filterUserTasks = async (id) => {
  let tasks = JSON.parse(await getItem("tasks"));

  const userTasks = tasks.filter((task) => {
    if (task.ownerId === id) {
      return task;
    }
  });

  localStorage.setItem("userTasks", JSON.stringify(userTasks));
};

const filterUserContacts = async (id) => {
  let contacts = JSON.parse(await getItem("contacts"));

  const userContacts = contacts.filter((contact) => {
    if (contact.ownerId === id) {
      return contact;
    }
  });

  localStorage.setItem("userContacts", JSON.stringify(userContacts));
};
