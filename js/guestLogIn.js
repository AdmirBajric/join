const guestLogin = async (id) => {
  await filterGuest(id);
  await filterGuestTasks(id);
  await filterGuestContacts(id);

  location.href = "summary.html";
};

const filterGuest = async (id) => {
  let users = JSON.parse(await getItem("users"));

  const user = users.filter((user) => {
    if (user.id === id) {
      return user;
    }
  });

  localStorage.setItem("user", JSON.stringify(user));
};

const filterGuestTasks = async (id) => {
  let tasks = JSON.parse(await getItem("tasks"));

  const userTasks = tasks.filter((task) => {
    if (task.ownerId === id) {
      return task;
    }
  });

  localStorage.setItem("userTasks", JSON.stringify(userTasks));
};

const filterGuestContacts = async (id) => {
  let contacts = JSON.parse(await getItem("contacts"));

  const userContacts = contacts.filter((contact) => {
    if (contact.ownerId === id) {
      return contact;
    }
  });

  localStorage.setItem("userContacts", JSON.stringify(userContacts));
};
