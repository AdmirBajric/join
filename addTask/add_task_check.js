function checkTitle() {
let inputTitle = document.getElementById('new_task_title');
let errorText = document.getElementById('title_error');

    if (inputTitle.value.trim().length < 1) {
    errorText.innerHTML = '<h2 class="required">This field is required</h2>';
    } else {
    errorText.innerHTML = '';
    }
}
// Event listener for input title
var inputTitle = document.getElementById('new_task_title');
inputTitle.addEventListener('input', checkTitle);

function checkDescription(){
let inputDescription = document.getElementById('new_task_description');
let errorText = document.getElementById('description_error');

    if(inputDescription.value.trim().length<1){
        errorText.innerHTML = '<h2 class="required">This field is required</h2>';
    } else {
        errorText.innerHTML = '';
    }
}
// Event listener for textarea description
var inputDescription = document.getElementById('new_task_description');
inputDescription.addEventListener('input', checkDescription);




