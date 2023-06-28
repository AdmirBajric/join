const guestLogin = async (id) => {
  let users = JSON.parse(await getItem("users"));
  let tasks = JSON.parse(await getItem("tasks"));
  let contacts = JSON.parse(await getItem("contacts"));

  const user = users.filter((user) => {
    if (user.id === id) {
      return user;
    }
  });

  const userTasks = tasks.filter((task) => {
    if (task.ownerId === id) {
      return task;
    }
  });

  const userContacts = contacts.filter((contact) => {
    if (contact.ownerId === id) {
      return contact;
    }
  });

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
  localStorage.setItem("userContacts", JSON.stringify(userContacts));

  location.href = "http://127.0.0.1:5500/summary.html";
};

// Templates
// const newTask = [
//   {
//     ownerId: 0,
//     tasks: [
//       {
//         taskProgress: "todo",
//         title: "Test",
//         description: "Testing",
//         category: [{ name: "Sales", color: "FF0000" }],
//         assignedTo: "Admir Bajric",
//         date: "06/29/2023",
//         priority: "urgent",
//         subtasks: [
//           { name: "Test", status: "done" },
//           { name: "Test2", status: "pending" },
//         ],
//       },
//     ],
//   },
// ];

// const newContact = [
//   {
//     ownerId: 0,
//     contacts: [
//       {
//         fullName: "Andy Miller",
//         email: "andymiller@gmail.com",
//         phone: "015764892345",
//       },
//       {
//         fullName: "Barbara Miller",
//         email: "barbaramiller@gmail.com",
//         phone: "015764892345",
//       },
//       {
//         fullName: "Daniela Miller",
//         email: "danielamiller@gmail.com",
//         phone: "015764892345",
//       },
//       {
//         fullName: "Emmily Miller",
//         email: "emilymiller@gmail.com",
//         phone: "015764892345",
//       },
//       {
//         fullName: "Thomas Miller",
//         email: "thomasmiller@gmail.com",
//         phone: "015764892345",
//       },
//       {
//         fullName: "Hans Miller",
//         email: "hansmiller@gmail.com",
//         phone: "015764892345",
//       },
//       {
//         fullName: "Rudolf Miller",
//         email: "rudolfmiller@gmail.com",
//         phone: "015764892345",
//       },
//     ],
//   },
// ];
