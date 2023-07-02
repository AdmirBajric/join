// Using array destructuring to assign variables to the elements returned by the 'signUpInputs' function.
const [signupNameInput, signupEmailInput, signupPasswordInput] = signUpInputs();

// Flag to track whether a user with the provided email already exists
let userExist = false;

// Function to handle the user sign-up process
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

// This function is called when the user does not exist in the database during sign-up process.
// It saves the new user data to the database, displays a success message, and redirects to the index page after a delay.
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

// This function is called when the user already exists in the database during the sign-up process.
// It displays an error message indicating that the user already exists and redirects to the index page after a delay.
const userExistOnSignUp = () => {
  setTimeout(() => {
    accountExist.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1000);

  setTimeout(() => {
    location.href = "index.html";
  }, 2000);
  userExist = !userExist;
};

// This function saves a new user to the database.
// It creates a new user object with provided name, email, and password.
// The user is assigned a unique ID generated using the generateUniqueId function.
// The new user is added to the 'users' array and then saved to the database using the setItem function.
// Additionally, empty arrays for tasks and contacts are created for the new user and saved to the database.
const saveUserToDatabase = async () => {
  const newUser = {
    id: generateUniqueId(),
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };
  users = [...users, newUser];

  const tasks = JSON.parse(await getItem("tasks"));
  const contacts = JSON.parse(await getItem("contacts"));

  const newTasks = [...tasks, { ownerId: newUser.id, tasks: [] }];
  const newContacts = [...contacts, { ownerId: newUser.id, contacts: [] }];

  await setItem("users", JSON.stringify(users));
  await setItem("tasks", JSON.stringify(newTasks));
  await setItem("contacts", JSON.stringify(newContacts));
};

// This function generates a unique ID for new users.
// It combines the current timestamp and a random number to create a unique identifier.
// The current timestamp is obtained using the getTime method of the Date object.
// A random number between 0 and 999999 is generated using Math.random and Math.floor.
// The timestamp and random number are concatenated to form the unique ID.
// The resulting ID is returned as an integer.
const generateUniqueId = () => {
  const timestamp = new Date().getTime(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random integer between 0 and 999999

  return parseInt(`${timestamp}${randomNum}`);
};
