const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');
const urgentButton = document.getElementById('urgent');
const mediumButton = document.getElementById('medium');
const lowButton = document.getElementById('low');
const salesLink = document.getElementById('sales');
const backOfficeLink = document.getElementById('backOffice');

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

// Add event listeners to the links
salesLink.addEventListener('click', selectCategory);
backOfficeLink.addEventListener('click', selectCategory);

// Function to handle the click event
function selectCategory(event) {
    event.preventDefault(); // Prevent the default link behavior

    const selectedCategory = document.getElementById('selectedCategory');

    // Update the selected category text
    selectedCategory.textContent = event.target.textContent;
    }

