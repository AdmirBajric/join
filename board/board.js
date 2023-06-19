function popupAddTask(){
    let addPopup = document.getElementById('popup-add-task');

    addPopup.innerHTML = '';

    addPopup.innerHTML = popupAddTaskHtml();
}

function renderBoardTask() {
    let boardCard = document.getElementById('board-card');
    console.log(boardCard);
    boardCard.innerHTML = '';

    tasksToBoard.forEach(function(task) {
        boardCard.innerHTML += boardCardHtml(task);
    });
    }
