const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');
const urgentButton = document.getElementById('urgent');
const mediumButton = document.getElementById('medium');
const lowButton = document.getElementById('low');

let newAddedSubtasks = [];
let addTtitleToBoard = [];
let addDescriptionToBoard = [];
let addCategoryToBoard = [];
let addContactsToBoard = [];
let addPrioToBoard = [];
let addSubtasksToBoard = [];

// new category && new Contacts array
let newCategory = [];
let newContacts = [];

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

function urgentButtonColor(){
    urgentButton.addEventListener('click', function() {
    urgentButton.style.backgroundColor = 'var(--development)';
    mediumButton.style.backgroundColor = '';
    lowButton.style.backgroundColor = '';
    });
}
urgentButtonColor();

function mediumButtonColor(){
    mediumButton.addEventListener('click', function() {
    urgentButton.style.backgroundColor = '';
    mediumButton.style.backgroundColor = 'var(--contactFour)';
    lowButton.style.backgroundColor = '';
    });
}
mediumButtonColor();

function lowButtonColor(){
    lowButton.addEventListener('click', function() {
    urgentButton.style.backgroundColor = '';
    mediumButton.style.backgroundColor = '';
    lowButton.style.backgroundColor = 'var(--contactThree)';
});
}
lowButtonColor();

function addSubtasks() {
    let newSubtasks = document.getElementById('new-subtask');
    let displayAddedSubtask = document.getElementById('added-subtasks');
    newAddedSubtasks.push(newSubtasks.value);

    // Clear the display area before adding the subtasks
    displayAddedSubtask.innerHTML = '';

    for (let i = 0; i < newAddedSubtasks.length; i++) {
        displayAddedSubtask.innerHTML += addSubTaskTempHtml(i);        
    }
    newSubtasks.value = '';
}

function createTask(){
    let newTitle = document.getElementById('new_task_title');
    let newDescription = document.getElementById('new_task_description');
    let boardCard = document.getElementById('board-card');
    // let newSubtasks = document.getElementById('added-subtasks');
    checkInputValue(newTitle,newDescription);
    pushedTaskToBoard(newTitle,newDescription);
}

function checkInputValue(newTitle,newDescription){
    if(newTitle.value <= 0 || newDescription.value<=0){
        console.log('NONONO')
    }else{    
        addTtitleToBoard.push(newTitle.value);
        addDescriptionToBoard.push(newDescription.value);
        console.log(addTtitleToBoard,addDescriptionToBoard);
        clearTask();
    }
}

function clearTask(){
    let newTitle = document.getElementById('new_task_title');
    let newDescription = document.getElementById('new_task_description');
    let newSubtasks = document.getElementById('added-subtasks');

    newTitle.value = '';
    newDescription.value = '';
    newSubtasks.innerHTML = '';
}

function showNewCategory(){
    let newCat = document.querySelector('.add-new-cat');
    document.querySelector('.dropdown-category').classList.add('hide')
    document.querySelector('.color').classList.remove('hide');
    document.querySelector('.add-new-cat').classList.remove('hide');

    newCat.innerHTML = '';

    newCat.innerHTML = showNewCategoryHTML();
}

function showNewContact(){
    let newCon = document.querySelector('.add-new-con');
    document.querySelector('.dropdown-category-con').classList.add('hide')
    newCon.innerHTML = '';

    newCon.innerHTML = showNewContactHTML();
}

function addNewCategoryToArray() {
    let getNewCat = document.getElementById('new-cat-value');
    let displayNewCat = document.getElementById('display-new-cat');
    newCategory.push(getNewCat.value);

    getNewCat.value = '';

    displayNewCat.innerHTML = '';
    for (let i = 0; i < newCategory.length; i++) {
        displayNewCat.innerHTML += `${newCategory[i]}`
    }

    document.querySelector('.dropdown-category').classList.remove('hide');
    document.querySelector('.color').classList.add('hide');
    document.querySelector('.add-new-cat').classList.add('hide');
    }

