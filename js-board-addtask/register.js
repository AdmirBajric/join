const [signupNameInput, signupEmailInput, signupPasswordInput] = signUpInputs();

let userExist = false;

const userSignUp = async () => {
  loadUsers();

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
    location.href = "index.html";
  }, 2000);
  userExist = !userExist;
};

const userExistOnSignUp = () => {
  setTimeout(() => {
    accountExist.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1000);

  setTimeout(() => {
    location.href = "index.html";
  }, 2000);
  userExist = !userExist;
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
