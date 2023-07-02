let toDo = [];
let inProgress = [];
let feedback = [];
let done = [];
let currentDraggedElement;

async function initBoard() {
    clearTasksContainer();
    await loadTasks();
    await loadtoDos();
    await loadInProgress();
    await loadFeedback();
    await loadDone();
    await loadUsers();
    renderTaskCardToDo();
    renderTaskCardProgress();
    renderTaskCardFeedback();
    renderTaskCardDone();
}


async function loadtoDos() {
    try {
        toDo = JSON.parse(await getItem("toDo"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

async function loadInProgress() {
    try {
        inProgress = JSON.parse(await getItem("inProgress"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

async function loadFeedback() {
    try {
        feedback = JSON.parse(await getItem("feedback"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

async function loadDone() {
    try {
        done = JSON.parse(await getItem("done"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem("users"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

function renderTaskCardToDo() {
    let toDoContainer = document.getElementById("toDo");
    let renderedIDs = {};
    for (let i = 0; i < toDo.length; i++) {
        let currentTask = tasks.find((task) => task.id === toDo[i]);
        if (!renderedIDs[currentTask.id]) {
            toDoContainer.innerHTML += getTaskCardHTML(currentTask, "toDo");
            renderedIDs[currentTask.id] = true;
            renderAvatars(currentTask);
        }
    }
}

function renderTaskCardProgress() {
    let progressContainer = document.getElementById("inProgress");
    let renderedIDs = {};
    for (let i = 0; i < inProgress.length; i++) {
        let currentTask = tasks.find((task) => task.id === inProgress[i]);
        if (!renderedIDs[currentTask.id]) {
            progressContainer.innerHTML += getTaskCardHTML(currentTask, "inProgress");
            renderedIDs[currentTask.id] = true;
            renderAvatars(currentTask);
        }
    }
}

function renderTaskCardFeedback() {
    let feedbackContainer = document.getElementById("feedback");
    let renderedIDs = {};
    for (let i = 0; i < feedback.length; i++) {
        let currentTask = tasks.find((task) => task.id === feedback[i]);
        if (currentTask) {
            feedbackContainer.innerHTML += getTaskCardHTML(currentTask, "feedback");
            renderedIDs[currentTask.id] = true;
            renderAvatars(currentTask);
        }
        else{
            console.error(`task with ID ${feedback[i]} not found`)
        }
    }

    //!renderedIDs[currentTask.id]
}

function renderTaskCardDone() {
    let doneContainer = document.getElementById("done");
    let renderedIDs = {};
    for (let i = 0; i < done.length; i++) {
        let currentTask = tasks.find((task) => task.id === done[i]);
        if (!renderedIDs[currentTask.id]) {
            doneContainer.innerHTML += getTaskCardHTML(currentTask, "done");
            renderedIDs[currentTask.id] = true;
            renderAvatars(currentTask);
        }
    }
}

function clearTasksContainer() {
    let toDoContainer = document.getElementById("toDo");
    let progressContainer = document.getElementById("inProgress");
    let feedbackContainer = document.getElementById("feedback");
    let doneContainer = document.getElementById("done");

    toDoContainer.innerHTML = "";
    progressContainer.innerHTML = "";
    feedbackContainer.innerHTML = "";
    doneContainer.innerHTML = "";
}

async function renderAvatars(currentTask) {
    let avatarBox = document.getElementById("avatarBox" + currentTask["id"]);
    for (let i = 0; i < currentTask["assignments"].length; i++) {
        const name = currentTask["assignments"][i]["name"];
        let id = currentTask["assignments"][i]["id"];
        let color = getUserColor(id);
        let initials = name.match(/\b(\w)/g);
        initials = initials.join("").toUpperCase();
        avatarBox.innerHTML += `       
        <div class="avatar-container" style="background-color:${color}">${initials}</div>
    `;
    }
}

function getUserColor(id) {
    let currentUser = users.find((user) => user.id == id);
    if (currentUser) {
        const color = currentUser.color;
        return color;
    } else {
        throw new Error(`Benutzer mit ID ${id} wurde nicht gefunden.`);
    }
}

function showDetailCard(id) {
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");

    overlay.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            const task = tasks[i];
            overlay.innerHTML += getTaskDetailCardHTML(task);
            getTaskPrio(task);
            getAssignedToDetailCard(task, id);
            showSubtasks(task);
        }
    }

    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.classList.add("d-none");
            overlay.innerHTML = ""; 
        }
    });
}


async function getTaskPrio(task) {
    let prioContainer = document.getElementById("prioDetail");
    switch (task["prio"]) {
        case "low":
            prioContainer.innerHTML += `
        <div
        class="prio-btn-low" 
    >
        Low
        <img id="imgUrgent" src="./assets/img/low-prio.svg" alt="" />
    </div>
        `;
            break;
        case "medium":
            prioContainer.innerHTML += `
        <div
        class="prio-btn-medium"
    >
        Medium
        <img id="imgUrgent" src="./assets/img/medium-prio.svg" alt="" />
    </div>
        `;
            break;
        case "urgent":
            prioContainer.innerHTML += `
        <div
        class="prio-btn-urgent"
    >
        Urgent
        <img id="imgUrgent" src="./assets/img/urgent-prio.svg" alt=""/>
    </div>
        `;
            break;
    }
    }

function getAssignedToDetailCard(task) {
    let assignContainer = document.getElementById("assignDetail");
    for (let i = 0; i < task["assignments"].length; i++) {
        const contact = task["assignments"][i]["name"];
        const id = task["assignments"][i]["id"];
        let color = getUserColor(id);
        let initials = contact.match(/\b(\w)/g);
        initials = initials.join("").toUpperCase();
        assignContainer.innerHTML += `
    <div class="flex-row align-center gap-15">
        <div class="avatar-container" style="background-color:${color}">${initials}</div>
        <div class="font-weight-500">${contact}</div>
    </div>
    `;
    }
}

function redirectToAddTask() {
    window.location.href = "task_form.html";
}

function closePopup() {
    let overlay = document.getElementById("overlay");
    overlay.classList.add("d-none");
}

async function deleteTask(id) {
    deleteObjectById(id);
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]["id"] == id) {
            tasks.splice(i, 1);
            await setItem("tasks", JSON.stringify(tasks));
            break;
        }
    }
    closePopup();
    initBoard();
}

function editTask(id) {
    currentTaskID = id;
    let currentTask = tasks.find((task) => task.id == id);
    document.getElementById("taskContent").innerHTML = editTaskHTML(currentTask);
    renderCategoryList();
    showAssignedContacts(currentTask);
    showTickableSubtasks(currentTask);
    setCategoryForEdit(currentTask);
}

function showAssignedContacts(currentTask) {
    let assignableContactsContainer = document.getElementById("dropdownContent");
    const assignedContacts = currentTask["assignments"].map(
        //erstellt ein neues Array nur mit "Name"s aus assignments-Array
        (assignment) => assignment["name"]
    );

    for (let i = 0; i < users.length; i++) {
        const name = users[i]["name"];
        const id = users[i]["id"];
        const checkbox = document.createElement("input");
        checkbox.id = id;
        checkbox.type = "checkbox";
        checkbox.value = name;
        checkbox.dataset.id = id;
        checkbox.onclick = function(event) {
            event.stopPropagation();
        };

        if (assignedContacts.includes(name)) {
            checkbox.checked = true;
        }

        const div = document.createElement("div");
        div.className = "dropdown-object";
        div.onclick = function() {
            toggleCheckbox(id);
        };
        div.innerHTML = `<span>${name}</span>`;
        div.appendChild(checkbox);

        assignableContactsContainer.appendChild(div);
    }
}


function toggleCheckbox(checkboxId) {
    var checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
}

function getCurrentDate() {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return `${year}-${month}-${day}`;
}

async function deleteObjectById(id) {
    for (var i = 0; i < toDo.length; i++) {
        if (toDo[i] == id) {
            toDo.splice(i, 1);
            await setItem("toDo", JSON.stringify(toDo));
            return;
        }
    }

    for (var i = 0; i < inProgress.length; i++) {
        if (inProgress[i] == id) {
            inProgress.splice(i, 1);
            await setItem("inProgress", JSON.stringify(inProgress));
            return;
        }
    }

    for (var i = 0; i < feedback.length; i++) {
        if (feedback[i] == id) {
            feedback.splice(i, 1);
            await setItem("feedback", JSON.stringify(feedback));
            return;
        }
    }

    for (var i = 0; i < done.length; i++) {
        if (done[i] == id) {
            done.splice(i, 1);
            await setItem("done", JSON.stringify(done));
            return;
        }
    }
}

function toggleDropdownCategory() {
    let dropdownContent = document.getElementById("dropdownCategoryContent");
    let dropdownMin = document.getElementById("dropdownMinCategory");
    dropdownContent.classList.toggle("show");
    dropdownMin.classList.toggle("open");
}

function showSubtasks(task) {
    let container = document.getElementById("subtasksContainer");
    for (let i = 0; i < task["taskSub"].length; i++) {
        const subTask = task["taskSub"][i]["task"];
        container.innerHTML += `<li>${subTask}</li>`;
    }
}

function hideTask(id) {
    let taskCardContainer = document.getElementById(id);

    if (taskCardContainer) {
        taskCardContainer.style.opacity = "0";
        setTimeout(() => {
            taskCardContainer.classList.add("d-none");
        }, 500);
    }
}

function showHiddenTask(id) {
    let taskCardContainer = document.getElementById(id);

    if (taskCardContainer) {
        taskCardContainer.classList.remove("d-none");
        setTimeout(() => {
            taskCardContainer.style.opacity = "1";
        }, 100);
    }
}

async function showTickableSubtasks(currentTask) {
    let subtasksContainer = document.getElementById("subtaskContent");
    subtasksContainer.innerHTML = "";

    for (let i = 0; i < currentTask["taskSub"].length; i++) {
        const subtask = currentTask["taskSub"][i]["task"];
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = subtask;

        const isClosed = currentTask["subtasksClosed"].some(
            (sub) => sub.name === subtask
        );
        checkbox.checked = isClosed;

        const div = document.createElement("div");
        div.classList.add("subtasks-row");
        div.innerHTML = `<span>${subtask}</span>`;
        div.insertBefore(checkbox, div.firstChild);

        subtasksContainer.appendChild(div);
    }
}

function validateSubtasksForm(currentTask) {
    currentTask["subtasksClosed"] = [];
    currentTask["subtasksOpened"] = [];

    let checkboxes = document.querySelectorAll(
        "#subtaskContent input[type=checkbox]:checked"
    );
    let NullCheckboxes = document.querySelectorAll(
        "#subtaskContent input[type=checkbox]:not(:checked)"
    );

    for (var i = 0; i < checkboxes.length; i++) {
        const value = checkboxes[i].value;
        currentTask["subtasksClosed"].push({
            name: value
        });
    }
    for (var i = 0; i < NullCheckboxes.length; i++) {
        const value = NullCheckboxes[i].value;
        currentTask["subtasksOpened"].push({
            name: value
        });
    }
}