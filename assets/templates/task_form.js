const ddCategory = document.querySelector('.dropdown-content-cat');
const showCategory = document.getElementById('showCategory');
const showAssingedTo = document.getElementById('showAssignedTo');
const ddContact = document.querySelector('.dropdown-content-con');


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




