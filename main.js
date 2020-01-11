var newTaskBtn = document.querySelector('.new-task-btn');
var newListBtn = document.querySelector('#new-list-btn');
var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var taskHolder = document.querySelector('.task-form-container');
var taskInputContainer = document.querySelector('.task-input-wrapper');
var tasks = [];

taskInput.addEventListener('keyup', enableButtons);
titleInput.addEventListener('keyup', enableButtons);
taskHolder.addEventListener('click', removeTask);
newListBtn.addEventListener('click', addNewList);
taskInputContainer.addEventListener('click', collectTaskInfo);

// FINDS THE EVENT WHEN THE NEW TASK BTN IS CLICKED
function collectTaskInfo() {
  if (event.target.className === 'new-task-btn') {
  console.log('booya baby');
  createNewTask(taskInput.value, false);
  }
}

function createNewTask(item, complete) {
  var task = new Task(item, complete);
  tasks.push(task);
  task.addNewTask(task);
  clearInputField();
  enableButtons();
}

function findTaskId() {
  var taskId = parseInt(event.target.closest('.close-img-btn').id);
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      return tasks[i];
    }
  }
}

function removeTask() {
  if (event.target.className === 'close-img-btn') {
    var taskToRemove = findTaskId(event);
    var i = tasks.indexOf(taskToRemove);
    tasks.splice(i, 1);
    event.target.closest('.new-task-wrapper').remove();
  }
  hideTaskContainer();
}

function hideTaskContainer() {
  if (tasks.length === 0) {
    taskHolder.classList.add('hidden');
  }
}

function enableButtons() {
  taskInput.value !== '' ? newTaskBtn.disabled = false : newTaskBtn.disabled = true;
  titleInput.value || taskInput.value !== '' ? newListBtn.disabled = false : newListBtn.disabled = true;
}

function clearInputField() {
  var inputField = document.querySelector('form');
  inputField.reset();
}



function addNewList() {
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
