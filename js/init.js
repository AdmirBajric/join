let users = [];

const init = () => {
  loadUsers();
};

const loadUsers = async () => {
  users = JSON.parse(await getItem("users"));
};
