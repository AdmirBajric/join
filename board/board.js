function popupAddTask(){
    let addPopup = document.getElementById('popup-add-task');

    addPopup.innerHTML = '';

    addPopup.innerHTML = popupAddTaskHtml();
}

