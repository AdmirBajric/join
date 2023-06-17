const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');
const urgentButton = document.getElementById('urgent');
const mediumButton = document.getElementById('medium');
const lowButton = document.getElementById('low');

let tasksToBoard = [
    {
        'title': '',
        'description': '',
        'category': '',
        'assigned': '',
        'date':'',
        'prio': '',
        'subtasks':'',
    }
]

let newAddedSubtasks = [];

// new category && new Contacts array
let newCategory = [];
let newContacts = [];

// Store the selected color
let selectedColor = '';
let selectedCategory = 'Select task category';

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
// category

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

function clearNewCategory(){
    let newCat = document.querySelector('.add-new-cat');
    let dropdownCat = document.querySelector('.dropdown-category');
    let colorPicker = document.querySelector('.color');
    newCat.classList.add('hide');
    dropdownCat.classList.remove('hide');
    colorPicker.classList.add('hide');
}


// Add event listeners to color dots
const colorDots = document.querySelectorAll('.color .dot');
colorDots.forEach((dot) => {
    dot.addEventListener('click', (event) => {
    const clickedDot = event.target;
    const colorName = clickedDot.classList[1]; // Assuming the second class name represents the color

    // Remove the border from all color dots
    colorDots.forEach((dot) => {
        dot.style.border = 'none';
    });

    // Add border to the clicked color dot
    clickedDot.style.border = '2px solid black';

    // Update the selected color
    selectedColor = colorName;

    // Update the newCatValue and dropdown category
    const newCatValue = document.getElementById('new-cat-value');
    const selectedCategoryElem = document.getElementById('selectedCategory');

    newCatValue.value = ''; // Clear the previous value
    newCatValue.style.backgroundColor = selectedColor; // Set the background color of the newCatValue input field

    // Create a dot element with the selected color and append it to newCatValue
    const colorDot = document.createElement('span');
    colorDot.classList.add('dot', selectedColor);
    colorDot.style.backgroundColor = selectedColor;
    newCatValue.innerHTML = '';
    newCatValue.appendChild(colorDot);

    selectedCategoryElem.innerHTML = `<span class="dot ${selectedColor}" style="background-color: ${selectedColor};"></span> ${selectedCategory}`; // Update the selectedCategory with the selected category and its color
  });
});

// Update addNewCategory function
function addNewCategory() {
    const newCatValue = document.getElementById('new-cat-value').value;
    const ddCategory = document.querySelector('.dropdown-content-cat');

    if (newCatValue && selectedColor) { // Check if both newCatValue and selectedColor have valid values
    const newCategoryElement = document.createElement('div');
    newCategoryElement.classList.add('cat-list');
    newCategoryElement.textContent = newCatValue;

    // Set the color dot for the new category
    const colorDot = document.createElement('span');
    colorDot.classList.add('dot', selectedColor);
    colorDot.style.backgroundColor = selectedColor; // Set the background color of the color dot
    newCategoryElement.appendChild(colorDot);

    // Add click event listener to the new category
    newCategoryElement.addEventListener('click', () => {
        selectedCategory = newCatValue; // Update the selected category variable
        selectedColor = colorDot.classList[1]; // Update the selected color variable

        const selectedCategoryElem = document.getElementById('selectedCategory');
        selectedCategoryElem.innerHTML = `<span class="dot ${selectedColor}" style="background-color: ${selectedColor};"></span> ${selectedCategory}`; // Update the selectedCategory with the new category and its color
    });

    ddCategory.appendChild(newCategoryElement);

    // Clear the input value
    document.getElementById('new-cat-value').value = '';
    }
    }

// Update click event listener for sales
const salesOption = document.getElementById('sales');
salesOption.addEventListener('click', () => {
    const selectedCategory = document.getElementById('selectedCategory');
    const selectedColorDot = salesOption.querySelector('.dot');
    const selectedColor = selectedColorDot.classList[1];

  selectedCategory.innerHTML = `<span class="dot ${selectedColor}" style="background-color: ${selectedColor};"></span> Sales`; // Update the selectedCategory with the sales category and its color
});

// ... previous code ...

// Update click event listener for backOffice
const backOfficeOption = document.getElementById('backOffice');
backOfficeOption.addEventListener('click', () => {
    const selectedCategory = document.getElementById('selectedCategory');
    const selectedColorDot = backOfficeOption.querySelector('.dot');
    const selectedColor = selectedColorDot.classList[1];

  selectedCategory.innerHTML = `<span class="dot ${selectedColor}" style="background-color: ${selectedColor};"></span> Backoffice`; // Update the selectedCategory with the backoffice category and its color
});

// Assigned to

function showNewContact() {
    let newCon = document.querySelector('.add-new-con');
    document.querySelector('.dropdown-category-con').classList.add('hide');
    newCon.innerHTML = '';

    newCon.innerHTML = showNewContactHTML();
}

function clearNewContact() {
    let newContactValue = document.getElementById('new-con-value');
    newContactValue.value = ''; // Clear the value of the new contact input field

    let dropdownCon = document.querySelector('.dropdown-category-con');
    dropdownCon.classList.remove('hide'); // Show the dropdown for selecting contacts
    }

function createNewContact(){
    let newContactValue = document.getElementById('new-con-value');
    newContacts.push(newContactValue.value);
    newContactValue.value = '';
    document.querySelector('.dropdown-category-con').classList.remove('hide');
    document.querySelector('.add-new-con').classList.add('hide');

    console.log(newContacts)
}
// Push to array for board

// function checkInputValue(newTitle,newDescription){
//     if(newTitle.value <= 0 || newDescription.value<=0){
//         console.log('NONONO')
//     }else{    
//         addTtitleToBoard.push(newTitle.value);
//         addDescriptionToBoard.push(newDescription.value);
//         console.log(addTtitleToBoard,addDescriptionToBoard);
//         clearTask();
//     }
// }