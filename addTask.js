const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');
const urgentButton = document.getElementById('urgent');
const mediumButton = document.getElementById('medium');
const lowButton = document.getElementById('low');

let newAddedSubtasks = [];

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
    console.log(newAddedSubtasks);

    // Clear the display area before adding the subtasks
    displayAddedSubtask.innerHTML = '';

    for (let i = 0; i < newAddedSubtasks.length; i++) {
        displayAddedSubtask.innerHTML += addSubTaskTempHtml(i);        
    }
    newSubtasks.value = '';
}


function addSubTaskTempHtml(i){
    return`
    <div class="sub-container-task">
        <input type="checkbox" name="Subtask ${i + 1}">
        <p>${newAddedSubtasks[i]}</p>
    </div>
    `
}


















































//function selectCategory(category, color) {
    //     var selectedCategory = document.getElementById("selectedCategory");
    //     var dot = document.createElement("span");
    //     dot.className = "dot " + color;
        
    //     selectedCategory.innerHTML = "";
    //     // Set the category text
    //     selectedCategory.textContent = category;
    //     // Append the dot element
    //     selectedCategory.appendChild(dot);
    //     var dropdownContent = document.querySelector(".dropdown-content-cat");
    //     dropdownContent.classList.add("hide");
    //     }
    //     // Event listener for Sales category
    // var salesCategory = document.getElementById("sales");
    //     salesCategory.addEventListener("click", function(event) {
    //     event.preventDefault(); // Prevent the default link behavior
    //     selectCategory("Sales", "dot-red");
    // });
    // // Event listener for Backoffice category
    // var backofficeCategory = document.getElementById("backOffice");
    //     backofficeCategory.addEventListener("click", function(event) {
    //     event.preventDefault(); // Prevent the default link behavior
    //     selectCategory("Backoffice", "dot-pink");
    // });
    
    // // JavaScript function to handle contact selection and close the dropdown
    // function selectContacts() {
    //     var selectedContacts = [];
    //     var checkboxes = document.querySelectorAll(".dropdown-content-con input[type='checkbox']");
        
    //     // Loop through the checkboxes
    //     checkboxes.forEach(function(checkbox) {
    //         if (checkbox.checked) {
    //         selectedContacts.push(checkbox.parentNode.textContent.trim());
    //         }
    //     });
    
    //     var selectedContactsElement = document.getElementById("selected-contacts");
    //     selectedContactsElement.textContent = "Selected contacts: " + selectedContacts.join(", ");
    
    //     // Hide the dropdown content
    //     var dropdownContent = document.querySelector(".dropdown-content-con");
    //     dropdownContent.classList.add("hide");
    //     }
    
    //     // Event listeners for contact checkboxes
    //     var checkboxes = document.querySelectorAll(".dropdown-content-con input[type='checkbox']");
    //     checkboxes.forEach(function(checkbox) {
    //     checkbox.addEventListener("change", function() {
    //         selectContacts();
    //     });
    //     });