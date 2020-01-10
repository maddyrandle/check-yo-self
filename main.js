var newTaskInput = document.querySelector('#task-item-input');
var newTaskBtn = document.querySelector('#add-task-btn');

newTaskInput.addEventListener('keyup', newListHandler);

function newListHandler() {
  checkForNewTaskInput();
}

// ADDS A NEW TASK TO THE LIST BEING CREATED
function addNewTask() {
  var taskBox = document.querySelector('.add-task-holder');
  taskBox.classList.remove('hidden');
  taskBox.insertAdjacentHTML('afterbegin', `
  <section class="new-task-wrapper">
      <img class="close-img-btn" src="./assets/delete.svg" alt="close icon">
    <p class="task-text new-task-font">${newTaskInput.value}</p>
  </section>
  `);
  newTaskBtn.disabled = true;
  clearInputField();
  }

// THIS CHECKS FOR SOMETHING IN THE INPUT AND ENABLES / DISABLES THE NEW TASK BTN DEPENDING
function checkForNewTaskInput() {
  newTaskBtn.addEventListener('click', addNewTask);
  newTaskInput.value !== '' ? newTaskBtn.disabled = false : newTaskBtn.disabled = true;
}

// THIS CLEARS THE INPUT FIELDS
function clearInputField() {
  var inputField = document.querySelector('#task-form');
  inputField.reset();
}




//
