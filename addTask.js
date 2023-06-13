const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');
const urgentButton = document.getElementById('urgent');
const mediumButton = document.getElementById('medium');
const lowButton = document.getElementById('low');

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