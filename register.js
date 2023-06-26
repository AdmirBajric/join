const [signupNameInput, signupEmailInput, signupPasswordInput] = signUpInputs();

let users = [];

const init = () => {
  loadUsers();
};

const loadUsers = async () => {
  users = JSON.parse(await getItem("users"));
};

const userSignUp = async () => {
  loadUsers();
  let userExist = false;

  users.forEach((a) => {
    if (a.email.toLowerCase() === signupEmailInput.value.toLowerCase()) {
      userExist = !userExist;
    }
  });

  if (userExist) {
    accountExist.style.animation =
      "fadeSendMessageIn 800ms ease-in-out forwards";

    userExistOnSignUp();
  } else {
    successfullyRegistered.style.animation =
      "fadeSendMessageIn 800ms ease-in-out forwards";

    userNotExistOnSignUp();
  }
};

const userNotExistOnSignUp = async () => {
  await saveUserToDatabase();

  setTimeout(() => {
    successfullyRegistered.style.animation =
      "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1000);

  setTimeout(() => {
    location.href = "http://127.0.0.1:5500";
  }, 2000);
};

const userExistOnSignUp = () => {
  setTimeout(() => {
    accountExist.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1000);

  setTimeout(() => {
    location.href = "http://127.0.0.1:5500";
  }, 2000);
};

const saveUserToDatabase = async () => {
  const newUser = {
    id: users.length,
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };
  users = [...users, newUser];

  await setItem("users", JSON.stringify(users));
};
