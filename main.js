var titleInput = document.querySelector('#title-input');
var newTaskInput = document.querySelector('#task-input');
var newTaskBtn = document.querySelector('#new-task-btn');
var newListBtn = document.querySelector('#new-list-btn');
// var
var taskHolder = document.querySelector('.task-form-container');

newTaskInput.addEventListener('keyup', checkInputValues);
titleInput.addEventListener('keyup', checkInputValues);
taskHolder.addEventListener('click', removeTask);
newListBtn.addEventListener('click', addNewList);

// CLEARS TASKS FROM FORM WHEN MAKE LIST BUTTON IS CLICKED
function clearTasksFromForm() {

}


// ADDS A NEW TASK TO THE FORM
function addNewTask() {
  taskHolder.classList.remove('hidden');
  taskHolder.insertAdjacentHTML('beforeend', `
  <section class="new-task-wrapper">
    <img class="close-img-btn remove-task" src="./assets/delete.svg" alt="close icon">
    <p class="task-text new-task-font">${newTaskInput.value}</p>
  </section>
  `);
  newTaskBtn.disabled = true;
  clearInputField();
  }

// REMOVES A SINGLE TASK FROM FORM
function removeTask() {
  if (event.target.classList.contains("remove-task")) {
  event.target.parentElement.remove();
  }
};

// CHECKS FOR SOMETHING IN THE INPUT AND ENABLES / DISABLES THE NEW TASK & LIST BTN
function checkInputValues() {
  newTaskBtn.addEventListener('click', addNewTask);
  console.log('here')
  newTaskInput.value !== '' ? newTaskBtn.disabled = false : newTaskBtn.disabled = true;
  titleInput.value !== '' ? newListBtn.disabled = false : newListBtn.disabled = true;
}

// CLEARS THE INPUT FIELDS ON FORM
function clearInputField() {
  var inputField = document.querySelector('form');
  inputField.reset();
}

function addNewList() {
  console.log('here finally')
  var listHolder = document.querySelector('#left-side');
  listHolder.insertAdjacentHTML('afterbegin', `
  <div class="card regular-card">
    <header class="card-header">
      <h1 class="card-title regular-card-title">${titleInput.value}</h1>
    </header>
    <main class="card-main">
      <section class="single-task-wrapper">
        <div class="checkbox-img-wrapper">
          <img class="checkbox-img" src="./assets/checkbox.svg" alt="empty circle check box">
        </div>
        <p class="task-text">Go to the store</p>
      </section>
    </main>
    <footer class="card-footer regular-card-footer">
      <div class="img-wrapper">
        <img class="img-btn urgent-img-btn" src="./assets/urgent.svg" alt="lightening bolt">
        <p class="regular-footer-font">URGENT</p>
      </div>
      <div class="img-wrapper">
        <img class="img-btn close-img-btn" src="./assets/delete.svg" alt="close icon">
        <img class="close-img-btn hidden" src="./assets/delete-active.svg" alt="close icon">
        <p class="regular-footer-font">DELETE</p>
      </div>
    </footer>
  </div>
  `);
  newListBtn.disabled = true;
  clearInputField();
}



//
