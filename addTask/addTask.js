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
    'date': '',
    'prio': {
    'text': '',
    'svg': ''
    },
    'subtasks': ''
}
];

let newAddedSubtasks = [];

// new category && new Contacts array
let newCategory = [];
let newContacts = [];
let selectedContactEmails = []; // Create an array to store selected contact emails

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
    document.querySelector('.add-new-con').classList.remove('hide');
    newCon.innerHTML = showNewContactHTML();
}

function clearNewContact() {
    let newContactValue = document.getElementById('new-con-value');
    newContactValue.value = ''; // Clear the value of the new contact input field

    let dropdownCon = document.querySelector('.dropdown-category-con');
    dropdownCon.classList.remove('hide'); // Show the dropdown for selecting contacts

    let newConDropdown = document.querySelector('.add-new-con');
    newConDropdown.classList.add('hide');
    }

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
    }
    
function createNewContact() {
    let newContactValue = document.getElementById('new-con-value');
    let newContactEmail = newContactValue.value;
    
    // Validate the email
    if (!isValidEmail(newContactEmail)) {
        // Display an error or take appropriate action for an invalid email
        alert('Please enter a valid email address.');
        return;
    }
    
    // Add the new contact to the dropdown
    let dropdownContent = document.querySelector('.dropdown-content-con');
    let newContactDiv = document.createElement('div');
    newContactDiv.innerHTML = `${newContactEmail} <input type="checkbox">`;
    dropdownContent.insertBefore(newContactDiv, document.getElementById('new-contact'));
    
    // Clear the value of the new contact input field
    newContactValue.value = '';
    }
    
    

// Event listener for clicking on existing contacts
document.addEventListener('click', function (event) {
    let target = event.target;

    // Check if the clicked element is an existing contact checkbox
    if (target.tagName === 'INPUT' && target.parentNode.tagName === 'DIV') {
        let contactEmail = target.parentNode.textContent.trim(); // Get the email of the clicked contact

        // Toggle the selection of the contact
        if (target.checked) {
        selectedContactEmails.push(contactEmail); // Add the selected contact to the array
        } else {
        let index = selectedContactEmails.indexOf(contactEmail);
        if (index > -1) {
            selectedContactEmails.splice(index, 1); // Remove the unselected contact from the array
        }
        }

        // Show the selected contacts in the #selected-contacts element
        let selectedContacts = document.getElementById('selected-contacts');
        if (selectedContactEmails.length > 0) {
        selectedContacts.textContent = selectedContactEmails.join(', '); // Display selected contact emails separated by commas
        } else {
        selectedContacts.textContent = 'Select contacts to assign'; // Display default text when no contacts are selected
        }
    }
    });
// Push to array for board
let selectedPriority = null;

function selectPriority(button) {
  if (selectedPriority) {
    selectedPriority.classList.remove('selected');
  }
  
  selectedPriority = button;
  selectedPriority.classList.add('selected');
}

function createTask() {
  let newTitle = document.getElementById('new_task_title');
  let newDescription = document.getElementById('new_task_description');
  let category = document.getElementById('selectedCategory').textContent.trim();

  // Retrieve the values for assigned to, date, and subtasks
  let assignedTo = document.getElementById('selected-contacts').textContent.trim();
  let date = document.getElementById('date').value;

  let subtasks = document.getElementById('new-subtask');
  let subtaskValues = [];
  for (let i = 0; i < subtasks.length; i++) {
    let subtaskValue = subtasks[i].value;
    if (subtaskValue.trim() !== '') {
      subtaskValues.push(subtaskValue);
    }
  }

  let priority = '';
  let priorityText = '';
  let prioritySVG = '';

  if (selectedPriority) {
    priority = selectedPriority.id;
    priorityText = selectedPriority.innerText.trim();
    prioritySVG = selectedPriority.querySelector('img').getAttribute('src');
  }

  // Check if the title and description are not empty
  if (newTitle.value.trim() !== '' && newDescription.value.trim() !== '') {
    let task = {
      title: newTitle.value,
      description: newDescription.value,
      category: category,
      assigned: assignedTo,
      date: date,
      prio: {
        text: priorityText,
        svg: prioritySVG
      },
      subtasks: subtaskValues
    };
    tasksToBoard[0] = task; // Replace the existing object in the array
    console.log(tasksToBoard);
    clearTask();
  } else {
    console.log('Title and description cannot be empty');
  }
}




function changeButtonBackgroundColor(priority) {
    var urgentButton = document.getElementById('urgent');
    var mediumButton = document.getElementById('medium');
    var lowButton = document.getElementById('low');

    // Reset the background color of all buttons
    urgentButton.style.backgroundColor = '';
    mediumButton.style.backgroundColor = '';
    lowButton.style.backgroundColor = '';

    // Reset the SVG image color of all buttons
    urgentButton.querySelector('img').style.filter = '';
    mediumButton.querySelector('img').style.filter = '';
    lowButton.querySelector('img').style.filter = '';

    switch (priority) {
        case 'urgent':
        urgentButton.style.backgroundColor = 'red';
        urgentButton.querySelector('img').style.filter = 'brightness(0) invert(1)';
        break;

        case 'medium':
        mediumButton.style.backgroundColor = 'yellow';
        mediumButton.querySelector('img').style.filter = 'brightness(0) invert(1)';
        break;

        case 'low':
        lowButton.style.backgroundColor = 'green';
        lowButton.querySelector('img').style.filter = 'brightness(0) invert(1)';
        break;

        default:
        // No priority selected, do nothing
        break;
    }
    }

document.getElementById('urgent').addEventListener('click', function() {
changeButtonBackgroundColor('urgent');
});

document.getElementById('medium').addEventListener('click', function() {
changeButtonBackgroundColor('medium');
});

document.getElementById('low').addEventListener('click', function() {
changeButtonBackgroundColor('low');
});
