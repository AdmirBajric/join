let tasks = [];
let subtasks = [];
let currentTaskID;
let selectedCategory;
let currentPrioStatus;
let selectedColor;
let categories = [  {
  "name": "Sales",
  "color": "pink"
},
{
  "name": "Marketing",
  "color": "blue"
},
{
  "name": "Design",
  "color": "orange"
},
{
  "name":"code",
  "color": 'red'
}
];


// initialize tasks, categoories 
async function initTasks() {
  await loadTasks();
  await loadUsers();
  loadCategories();
  renderAssignableContacts();
  renderCategoryList();
}

/**
 * Validate the task form before adding a new task.
 * @returns {boolean} - Returns true if the form is valid, false otherwise.
 */
async function validateTaskForm() {
  let taskTitle = document.getElementById("title");
  let taskDescription = document.getElementById("description");
  let taskDueDate = document.getElementById("datePicker");
  let taskSub = document.getElementById("subtaskContent");

  if (
    taskTitle.value === "" ||
    taskDescription.value === "" ||
    taskDueDate.value === "" ||
    currentPrioStatus === undefined ||
    selectedCategory === undefined ||
    taskSub.value === ""
  ) {
    let taskAlert = document.getElementById("taskAlert");
    taskAlert.innerHTML = "";
    if (taskTitle.value === "")
      taskAlert.innerHTML += "Feld 'Titel' muss ausgefüllt werden.<br>";
    if (taskDescription.value === "")
      taskAlert.innerHTML += "Feld 'Beschreibung' muss ausgefüllt werden.<br>";
    if (taskDueDate.value === "")
      taskAlert.innerHTML +=
        "Feld 'Fälligkeitsdatum' muss ausgefüllt werden.<br>";
    if (currentPrioStatus === undefined)
      taskAlert.innerHTML += "Feld 'Priorität' muss ausgefüllt werden.<br>";
    if (selectedCategory === undefined)
      taskAlert.innerHTML += "Feld 'Category' muss ausgefüllt werden.<br>";
    if (taskSub.value === "")
      taskAlert.innerHTML += "Feld 'Unteraufgabe' muss ausgefüllt werden.<br>";
    return false;
  }

  return true;
}

/**
 * Add a new task.
 * @param {string} status - The status of the task (e.g., "toDo", "inProgress", "feedback", "done").
 */
async function addNewTask(status) {
  const isValid = await validateTaskForm();
  if (!isValid) return;

  await setNewTaskID();
  await loadtoDos();

  let taskTitle = document.getElementById("title");
  let taskDescription = document.getElementById("description");
  let taskDueDate = document.getElementById("datePicker");

  tasks.push({
    title: taskTitle.value,
    description: taskDescription.value,
    category: selectedCategory,
    prio: currentPrioStatus,
    color: selectedColor,
    assignments: validateAssignmentForm(),
    dueDate: taskDueDate.value,
    taskSub: subtasks,
    subtasksOpened: subtasks,
    subtasksClosed: [],
    id: currentTaskID,
  });
  // Update the status array based on the task status
  if (status === "toDo") {
    toDo.push(currentTaskID);
  } else if (status === "inProgress") {
    inProgress.push(currentTaskID);
  } else if (status === "feedback") {
    feedback.push(currentTaskID);
  } else if (status === "done") {
    done.push(currentTaskID);
  }

  const taskAddedElement = document.getElementById("taskAdded");
  taskAddedElement.classList.remove("d-none");
 // Store the tasks and status arrays in local storage
  setTimeout(async () => {
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("toDo", JSON.stringify(toDo));
    await setItem("inProgress", JSON.stringify(inProgress));
    await setItem("feedback", JSON.stringify(feedback));
    await setItem("done", JSON.stringify(done));
    await setItem('category',JSON.stringify(categories))
    taskAddedElement.classList.add("d-none");
    redirectToBoard();
  }, 500);
}

/**
 * Disable the date input field for past dates.
 */
function disableDateinput() {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("input-date")[0].setAttribute("min", today);
}

//loads subtasks
async function subTasksLoad() {
  subtasks = [];
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
  }
}

//set a new Id to the added task
async function setNewTaskID() {
  try {
    let res = JSON.parse(await getItem("currentTaskID"));
    currentTaskID = res + 1;
    await setItem("currentTaskID", JSON.stringify(currentTaskID));
  } catch (e) {
    currentTaskID = 1;
    await setItem("currentTaskID", JSON.stringify(currentTaskID));
  }
}

//load task from localstorage
async function loadTasks() {
  try {
    const storedTasks = JSON.parse(await getItem("tasks"));
    tasks = tasks.concat(storedTasks);
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Add a subtask to the task with the specified ID.
 * @param {number} id - The ID of the task.
 */
async function subTaskAddToJson() {
  let task = document.getElementById("subtask-input-content");

  subtasks.push({
    task: task.value,
  });

  addNewSubTask();
  task.value = "";
}

async function addSubtaskFromEdit(id) {
  let currentTask = tasks.find((task) => task.id == id);
  let task = document.getElementById("subtask-input-content");
  currentTask["taskSub"].push({
    task: task.value,
  });
  currentTask["subtasksOpened"].push({
    task: task.value,
  });
  await showTickableSubtasks(currentTask);
  task.value = "";
}

//new subtask to the element
async function addNewSubTask() {
  let subtaskContent = document.getElementById("subtaskContent");
  subtaskContent.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    let task = subtasks[i]["task"];
    subtaskContent.innerHTML += `
    <div>${task}</div>`;
  }
}

/**
 * Edit the task on the board.
 * @param {number} id - The ID of the task.
 */
async function editTaskBoard(id) {
  let currentTask = tasks.find((task) => task.id == id);
  let taskTitle = document.getElementById("title");
  let taskDescription = document.getElementById("description");
  let taskDueDate = document.getElementById("datePicker");

  currentTask["title"] = taskTitle.value;
  currentTask["description"] = taskDescription.value;
  currentTask["category"] = document.getElementById("categoryEdit").innerText;
  currentTask["prio"] = document.getElementById("prioValue").innerText;
  currentTask["color"] = selectedColor;
  currentTask["assignments"] = validateAssignmentForm();
  currentTask["dueDate"] = taskDueDate.value;
  validateSubtasksForm(currentTask);

  const taskAddedElement = document.getElementById("taskAdded");
  taskAddedElement.classList.remove("d-none");

  setCategoryForEdit(currentTask);

  setTimeout(() => {
    taskAddedElement.classList.add("d-none");
    reloadPage();
  }, 1000);

  await setItem("tasks", JSON.stringify(tasks));
  await setItem("toDo", JSON.stringify(toDo));
}

async function setCategoryForEdit(currentTask) {
  document.getElementById("categoryEdit").innerText = currentTask["category"];
}

//delete task permanently
async function deleteAllTasksFromServer() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
    toDo = JSON.parse(await getItem("toDo"));
    inProgress = JSON.parse(await getItem("inProgress"));
    feedback = JSON.parse(await getItem("feedback"));
    done = JSON.parse(await getItem("done"));

    tasks = [];
    toDo = [];
    inProgress = [];
    feedback = [];
    done = [];
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("toDo", JSON.stringify(toDo));
    await setItem("inProgress", JSON.stringify(inProgress));
    await setItem("feedback", JSON.stringify(feedback));
    await setItem("done", JSON.stringify(done));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

//urgent button changes
async function TaskButtonUrgent() {
  let buttonUrgent = document.getElementById("prioUrgent");
  let buttonMedium = document.getElementById("prioMedium");
  let buttonLow = document.getElementById("prioLow");
  buttonUrgent.style.backgroundColor = "#FF3D00";
  buttonUrgent.style.filter = "contrast(1)";
  buttonMedium.style.filter = "contrast(1)";
  buttonLow.style.filter = "contrast(1)";
  buttonMedium.style.backgroundColor = "white";
  buttonLow.style.backgroundColor = "white";
  buttonMedium.style.color = "black";
  buttonUrgent.style.color = "white";
  buttonLow.style.color = "black";

  let imageMedium = document.getElementById("imgMedium");
  imageMedium.style.filter = "none";

  let imageLow = document.getElementById("imgLow");
  imageLow.style.filter = "none";

  let imageUrgent = document.getElementById("imgUrgent");
  imageUrgent.style.filter = "brightness(10000%) contrast(1000%)";
}

//prio status
function getPrioStatus(prioStatus) {
  currentPrioStatus = prioStatus;
}

//set the priortiy of the task
function setPrioStatus(prioStatus) {
  let prioValue = document.getElementById("prioValue");
  prioValue.innerText = prioStatus;
}


//Medium button changes
async function TaskButtonMedium() {
  let buttonUrgent = document.getElementById("prioUrgent");
  let buttonMedium = document.getElementById("prioMedium");
  let buttonLow = document.getElementById("prioLow");
  buttonUrgent.style.backgroundColor = "white";
  buttonMedium.style.backgroundColor = "#FFA800";
  buttonUrgent.style.filter = "contrast(1)";
  buttonMedium.style.filter = "contrast(1)";
  buttonLow.style.filter = "contrast(1)";
  buttonMedium.style.color = "white";
  buttonUrgent.style.color = "black";
  buttonLow.style.color = "black";
  buttonLow.style.backgroundColor = "white";

  let imageUrgent = document.getElementById("imgUrgent");
  imageUrgent.style.filter = "none";

  let imageLow = document.getElementById("imgLow");
  imageLow.style.filter = "none";

  let imageMedium = document.getElementById("imgMedium");
  imageMedium.style.filter = "brightness(10000%) contrast(1000%)";
}

//low button changes
async function TaskButtonLow() {
  let buttonUrgent = document.getElementById("prioUrgent");
  let buttonMedium = document.getElementById("prioMedium");
  let buttonLow = document.getElementById("prioLow");
  buttonUrgent.style.backgroundColor = "white";
  buttonMedium.style.backgroundColor = "white";
  buttonLow.style.backgroundColor = "#7AE229";
  buttonUrgent.style.filter = "contrast(1)";
  buttonMedium.style.filter = "contrast(1)";
  buttonMedium.style.color = "black";
  buttonUrgent.style.color = "black";
  buttonLow.style.color = "white";

  let imageUrgent = document.getElementById("imgUrgent");
  imageUrgent.style.filter = "none";

  let imageMedium = document.getElementById("imgMedium");
  imageMedium.style.filter = "none";

  let imageLow = document.getElementById("imgLow");
  imageLow.style.filter = "brightness(10000%) contrast(1000%)";
}

function reloadPage() {
  location.reload();
}

function redirectToBoard() {
  window.location.href = "board.html";
}

function redirectToBoardFromPopup() {
  window.location.href = "../../board.html";
}

function showAddTaskPopUp() {
  var overlay = document.getElementById("addTaskPopUp");
  overlay.style.display = "block";
}

/**
 * Hide the "Add Task" popup.
 */
function hideAddTaskPopUp() {
  var overlay = document.getElementById("addTaskPopUp");
  overlay.style.display = "none";
}

//save categories to local storage
function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

//load from local storage
function loadCategories() {
  const storedCategories = JSON.parse(localStorage.getItem("categories"));
  if (storedCategories) {
    categories = storedCategories;
  }
}

/**
 * Check the screen width and perform actions accordingly.
 */
function checkScreenWidth() {
  document
    .getElementById("editTaskPopUp")
    .addEventListener("click", checkScreenWidth);

  var screenWidth = window.innerWidth;

  var targetWidth = 1351;

  if (screenWidth >= targetWidth) {
    showEditTaskPopUp();
  } else {
    window.location.href = "task_form.html";
  }
}

/**
 * Toggle the assignment dropdown.
 */
function toggleDropdown() {
  let dropdownContent = document.getElementById("dropdownContent");
  let dropdownMin = document.getElementById("dropdownMin");
  dropdownContent.classList.toggle("show");
  dropdownMin.classList.toggle("open");

  // Hide dropdown content after selection
  if (!dropdownContent.classList.contains("show")) {
    hideSelectColor();
  }
}

/**
 * Show the edit task popup.
 */
function showEditTaskPopUp() {
  var overlay = document.getElementById("editTaskPopUp");
  overlay.style.display = "block";
}

function hideEditTaskPopUp() {
  var overlay = document.getElementById("editTaskPopUp");
  overlay.style.display = "none";
}

async function renderAssignableContacts() {
  let assignableContactsContainer = document.getElementById("dropdownContent");
  for (let i = 0; i < users.length; i++) {
    const name = users[i]["name"];
    const id = users[i]["id"];

    const div = document.createElement("div");
    div.className = "dropdown-object";
    div.addEventListener("click", function () {
      toggleCheckbox(id);
    });

    const span = document.createElement("span");
    span.innerText = name;
    div.appendChild(span);

    const checkbox = document.createElement("input");
    checkbox.id = id;
    checkbox.type = "checkbox";
    checkbox.value = name;
    checkbox.dataset.id = id;
    checkbox.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    div.appendChild(checkbox);
    assignableContactsContainer.appendChild(div);
  }
}

function toggleCheckbox(checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;
}

function renderCategoryList() {
  let categoryListContainer = document.getElementById(
    "dropdownCategoryContent"
  );
  categoryListContainer.innerHTML = "";
  categoryListContainer.innerHTML += categoryListHTML();
}

function renderNewCategoryField() {
  let dropdownField = document.getElementById("dropdownMinCategory");
  document.getElementById("select-color-category").classList.remove("d-none");
  document.getElementById("dropdownCategoryContent").classList.remove("d-none");
  dropdownField.innerHTML = categoryFieldHTML();
  hideCategoryDisplay();
}


function stopDropdown(event) {
  event.stopPropagation();
}

function clearSelections() {
  renderNormalCategoryField();
  renderCategoryList();
  hideSelectColor();
  hideErrorMessage();
  hideCategoryDisplay();
}


function hideSelectColor() {
  document.getElementById("select-color-category").classList.add("d-none");
}

function hideErrorMessage() {
  document.getElementById("errorMessage").textContent = "";
}

function hideCategoryDisplay() {
  document.getElementById("categoryDisplay").style.display = "none";
  document.getElementById("categoryDisplay").textContent = "";
}

function renderNormalCategoryField() {
  document.getElementById("categoryDisplay").style.display = "none";

  let dropdownField = document.getElementById("dropdownMinCategory");
  document.getElementById("dropdownCategoryContent").classList.remove("d-none");
  dropdownField.innerHTML = normalCategoryFiledHTML();
}

function saveSelectedCategory(element, color) {
  selectedCategory = element.innerText;
  let dataField = document.getElementById("categoryEdit");
  dataField.innerText = selectedCategory;
  let dropdownMin = document.getElementById("dropdownMinCategory");
  dropdownMin.querySelector("span").innerText = selectedCategory;
  selectedColor = color;
  toggleDropdownCategory();
}

function toggleDropdownCategory() {
  let dropdownContent = document.getElementById("dropdownCategoryContent");
  let dropdownMin = document.getElementById("dropdownMinCategory");
  dropdownContent.classList.toggle("show");
  dropdownMin.classList.toggle("open");
}

function validateAssignmentForm() {
  let selectedValues = [];
  let checkboxes = document.querySelectorAll(
    "#dropdownContent input[type=checkbox]:checked"
  );

  for (var i = 0; i < checkboxes.length; i++) {
    const value = checkboxes[i].value;
    const id = checkboxes[i].dataset.id;
    selectedValues.push({
      id,
      name: value,
    });
  }
  return selectedValues;
}

function clearCheckboxes() {
  let checkboxes = document.querySelectorAll(
    "#dropdownContent input[type=checkbox]:checked"
  );

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  toggleDropdown();
}

function updateTaskCardIcons(id) {
  const imgUrgentTask = document.getElementById("imgUrgentTask");
  const imgMediumTask = document.getElementById("imgMediumTask");
  const imgLowTask = document.getElementById("imgLowTask");

  if (imgUrgentTask && imgMediumTask && imgLowTask) {
    // Verstecke alle Icons
    imgUrgentTask.classList.add("d-none");
    imgMediumTask.classList.add("d-none");
    imgLowTask.classList.add("d-none");

    // Zeige das entsprechende Icon basierend auf prio
    if (id === "urgent") {
      imgUrgentTask.classList.remove("d-none");
    } else if (id === "medium") {
      imgMediumTask.classList.remove("d-none");
    } else if (id === "low") {
      imgLowTask.classList.remove("d-none");
    }
  }
}

function selectColor(id) {
  for (let i = 1; i < 8; i++) {
    document.getElementById(`color${i}`).classList.remove("selected-color");
  }
  document.getElementById(`color${id}`).classList.add("selected-color");
  selectedColor = document.getElementById(`color${id}`).style.backgroundColor;
}

function checkNewCategory() {
  const newCategoryInput = document.getElementById("new-category");
  const categoryDisplay = document.getElementById("categoryDisplay");
  const dataField = document.getElementById("categoryEdit");
  const categoryInputField = document.getElementById("new-category");
  const categoryContent = document.getElementById("dropdownCategoryContent");

  if (selectedColor && newCategoryInput.value !== "") {
    selectedCategory = newCategoryInput.value;
    dataField.innerText = newCategoryInput.value;
    displayCategory(selectedCategory);
    categories.push({
      name: selectedCategory,
      color: selectedColor
    });
    renderCategoryList(); // Update the dropdownCategoryContent with the new category
    saveCategories(); // Store the updated categories in local storage
  } else {
    displayErrorMessage("Please insert a category name and a color!");
  }

  if (newCategoryInput.value === "") {
    hideCategoryDisplay(categoryDisplay);
  }
}


function displayCategory(category) {
  const categoryDisplay = document.getElementById("categoryDisplay");
  const selectedCategory = categoryDisplay.textContent;

  if (selectedCategory !== category) {
    hideCategoryDisplay(categoryDisplay);
  }

  categoryDisplay.style.display = "block";
  categoryDisplay.textContent = category;
}

function displayErrorMessage(message) {
  const errorMessage = document.createElement("span");
  errorMessage.textContent = message;
  document.getElementById("errorMessage").appendChild(errorMessage);
}

function hideLabel() {
  document.getElementById("errorMessage").textContent = "";
}

function hideCategoryDisplay() {
  const categoryDisplay = document.getElementById("categoryDisplay");
  categoryDisplay.style.display = "none";
  categoryDisplay.textContent = "";
}

function closePopupTask(){
  let boardBody = document.querySelector('.body-board');
  let boardMainContainer = document.querySelector('.board-main-container');
  let popup = document.getElementById('addtask-popup');

  if(window.location.pathname.includes("board.html")){
      boardBody.classList.remove('hidden');
  }
  boardMainContainer.classList.remove('d-none');
  popup.classList.add('d-none')
}