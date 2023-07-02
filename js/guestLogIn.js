const guestLoginNow = async (id) => {
  await filterGuest(id);
  await filterGuestTasks(id);
  await filterGuestContacts(id);

  location.replace("summary.html");
};

const filterGuest = async (id) => {
  let allUsers = JSON.parse(await getItem("users"));

  const guestUser = allUsers.filter((user) => {
    if (user.id === id) {
      return user;
    }
  });

  localStorage.setItem("user", JSON.stringify(guestUser));
};

const filterGuestTasks = async (id) => {
  let allTasks = JSON.parse(await getItem("tasks"));

  const userTasks = allTasks.filter((task) => {
    if (task.ownerId === id) {
      return task;
    }
  });

  localStorage.setItem("userTasks", JSON.stringify(userTasks));
};

const filterGuestContacts = async (id) => {
  let allContacts = JSON.parse(await getItem("contacts"));

  const userContacts = allContacts.filter((contact) => {
    if (contact.ownerId === id) {
      return contact;
    }
  });

  localStorage.setItem("userContacts", JSON.stringify(userContacts));
};
