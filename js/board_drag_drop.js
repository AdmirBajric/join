let currentDraggedElement;

async function startDragging(id, status) {
    currentDraggedElement = id;
    await showDropArea(status);
    await getSourceArrayByStatus(status, id);
    await hideDraggedOrigin();
}

async function hideDraggedOrigin() {
    let element = document.getElementById(currentDraggedElement);
    if (element) {
        element.classList.add("d-none");
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

async function drop(ev, status) {
    ev.preventDefault();
    ev.stopPropagation();
    let data = ev.dataTransfer.getData("text/plain");
    let draggedElement = document.getElementById(data);
    let dropArea = ev.target;

    // Check if the drop area is valid for the dragged element
    if (dropArea.classList.contains("drop-area")) {
        dropArea.appendChild(draggedElement);
        await moveTo(status);
    } else {
        // Invalid drop area, return the element to its original position
        draggedElement.classList.remove("d-none");
    }
}

async function moveTo(status) {
    let targetArray;
    switch (status) {
        case "toDo":
            targetArray = toDo;
            getBorderRemoveFunctions();
            initBoard();
            break;
        case "inProgress":
            targetArray = inProgress;
            getBorderRemoveFunctions();
            initBoard();
            break;
        case "feedback":
            targetArray = feedback;
            getBorderRemoveFunctions();
            initBoard();
            break;
        case "done":
            targetArray = done;
            getBorderRemoveFunctions();
            initBoard();
            break;
        default:
            console.error("Invalid status:", status);
            return;
    }
    await checkTargetArrayForID(targetArray, status);
}

async function checkTargetArrayForID(targetArray, status) {
    const elementExists = targetArray.includes(currentDraggedElement);
    if (elementExists) {
        return;
    }
    targetArray.push(currentDraggedElement);
    await setItem(status, JSON.stringify(targetArray));
}

function getTaskById(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            return tasks[i];
        }
    }
    return null;
}

async function getSourceArrayByStatus(status, id) {
    switch (status) {
        case "toDo":
            await deleteTaskFromDragged(id, "toDo");
            break;
        case "inProgress":
            await deleteTaskFromDragged(id, "inProgress");
            break;
        case "feedback":
            await deleteTaskFromDragged(id, "feedback");
            break;
        case "done":
            await deleteTaskFromDragged(id, "done");
            break;
        default:
            console.error("Invalid status:", status);
            return null;
    }
}

async function deleteTaskFromDragged(id, sourceArray) {
    switch (sourceArray) {
        case "toDo":
            let toDoIndex = toDo.indexOf(id);
            toDo.splice(toDoIndex, 1);
            await setItem("toDo", JSON.stringify(toDo));
            break;
        case "inProgress":
            let inProgressIndex = inProgress.indexOf(id);
            inProgress.splice(inProgressIndex, 1);
            await setItem("inProgress", JSON.stringify(inProgress));
            break;
        case "feedback":
            let feedbackIndex = feedback.indexOf(id);
            feedback.splice(feedbackIndex, 1);
            await setItem("feedback", JSON.stringify(feedback));
            break;
        case "done":
            let doneIndex = done.indexOf(id);
            done.splice(doneIndex, 1);
            await setItem("done", JSON.stringify(done));
            break;
    }
}

async function showDropArea(status) {
    switch (status) {
        case "toDo":
            document.getElementById("inProgress").classList.add("add-border");
            document.getElementById("feedback").classList.add("add-border");
            document.getElementById("done").classList.add("add-border");
            break;
        case "inProgress":
            document.getElementById("toDo").classList.add("add-border");
            document.getElementById("feedback").classList.add("add-border");
            document.getElementById("done").classList.add("add-border");
            break;
        case "feedback":
            document.getElementById("toDo").classList.add("add-border");
            document.getElementById("inProgress").classList.add("add-border");
            document.getElementById("done").classList.add("add-border");
            break;
        case "done":
            document.getElementById("toDo").classList.add("add-border");
            document.getElementById("feedback").classList.add("add-border");
            document.getElementById("inProgress").classList.add("add-border");
            break;
    }
}

function getBorderRemoveFunctions() {
    document.getElementById("toDo").classList.remove("add-border");
    document.getElementById("inProgress").classList.remove("add-border");
    document.getElementById("feedback").classList.remove("add-border");
    document.getElementById("done").classList.remove("add-border");
}