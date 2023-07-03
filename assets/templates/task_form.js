const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');


function toggleDropdownCat() {
    ddCategory.classList.toggle('hide');
    ddCategory.classList.toggle('animate-dropdown');
}

showCategory.addEventListener('click', toggleDropdownCat);

function toggleDropdownCon(){
    ddContact.classList.toggle('hide');
    ddContact.classList.toggle('animate-dropdown')
}
showAssingedTo.addEventListener('click', toggleDropdownCon);



async function addNewTaskFromPopuo() {
    await setNewTaskID();
    await loadtoDos();
    let taskTitle = document.getElementById("title");
    let taskDescription = document.getElementById("description");
    let taskDueDate = document.getElementById("datePicker");
    let taskPriority = document.getElementById("priority");
    let taskSub = document.getElementById("subtaskContent");
    let buttonUrgent = document.getElementById("prioUrgent");
    let buttonMedium = document.getElementById("prioMedium");
    let buttonLow = document.getElementById("prioLow");

    if (
        taskTitle.value === "" ||
        taskDescription.value === "" ||
        taskDueDate.value === "" ||
        currentPrioStatus === undefined ||
        selectedCategory === undefined ||
        taskSub.value === ""
    ) {
        let taskAlert = document.getElementById("taskAlert");
        taskAlert.innerHTML = ""; // Leere den vorherigen Text
        if (taskTitle.value === "") taskAlert.innerHTML += "Feld 'Titel' muss ausgefüllt werden.<br>";
        if (taskDescription.value === "") taskAlert.innerHTML += "Feld 'Beschreibung' muss ausgefüllt werden.<br>";
        if (taskDueDate.value === "") taskAlert.innerHTML += "Feld 'Fälligkeitsdatum' muss ausgefüllt werden.<br>";
        if (currentPrioStatus === undefined) taskAlert.innerHTML += "Feld 'Priorität' muss ausgefüllt werden.<br>";
        if (selectedCategory === undefined) taskAlert.innerHTML += "Feld 'Category' muss ausgefüllt werden.<br>";
        if (taskSub.value === "") taskAlert.innerHTML += "Feld 'Unteraufgabe' muss ausgefüllt werden.<br>";
        return;
    }

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

    toDo.push(currentTaskID);

    const taskAddedElement = document.getElementById("taskAdded");
    taskAddedElement.classList.remove("d-none");

    setTimeout(() => {
        taskAddedElement.classList.add("d-none"); 
        redirectToBoardFromPopup(); 
    }, 1000);

    await setItem("tasks", JSON.stringify(tasks));
    await setItem("toDo", JSON.stringify(toDo));
}

