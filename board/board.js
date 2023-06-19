
function loadAllTasks() {
    let tasksAsString = localStorage.getItem('tasks');
    tasksToBoard = JSON.parse(tasksAsString);
}

function popupAddTask(){
    let addPopup = document.getElementById('popup-add-task');

    addPopup.innerHTML = '';

    addPopup.innerHTML = popupAddTaskHtml();
    document.getElementById('popup-add-task').classList.remove('hide')

    document.querySelector('.board').classList.add('low-opacity')
}

function popupBoard(){
    let popupBoard = document.getElementById('popup-board');

    popupBoard.innerHTML = '';

    popupBoard.innerHTML += popupBoardHTML();
}

function editPopupBoard(){
    document.querySelector('.popup-board-bg').classList.add('hide');

    let editablePopup = document.querySelector('.display-board-popup');

    editablePopup.innerHTML = '';
    editablePopup.innerHTML = editPopupBoard();
}