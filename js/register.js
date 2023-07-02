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
    id: generateUniqueId(),
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };
  users = [...users, newUser];

  await setItem("users", JSON.stringify(users));
  await setItem("tasks", JSON.stringify([{ ownerId: newUser.id, tasks: [] }]));
  await setItem(
    "contacts",
    JSON.stringify([{ ownerId: newUser.id, contacts: [] }])
  );
};

const generateUniqueId = () => {
  const timestamp = new Date().getTime(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random integer between 0 and 999999

  return parseInt(`${timestamp}${randomNum}`);
};
