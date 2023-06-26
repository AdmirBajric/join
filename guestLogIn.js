const guestLogin = async (id) => {
  let users = JSON.parse(await getItem("users"));
  users.filter((user) => {
    if (user.id === id) {
      localStorage.setItem("user", JSON.stringify(user));
      location.href = "http://127.0.0.1:5500/summary.html";
    }
  });
};
