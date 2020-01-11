var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var taskHolder = document.querySelector('.task-form-container');
var leftListHolder = document.querySelector('.left-side');
var taskInputContainer = document.querySelector('.task-input-wrapper');
var formContainer = document.querySelector('.form-wrapper');
var tasks = [];
var lists = [];

taskInput.addEventListener('keyup', enableButtons);
titleInput.addEventListener('keyup', enableButtons);
taskHolder.addEventListener('click', removeTask);

taskInputContainer.addEventListener('click', collectTaskInfo);
formContainer.addEventListener('click', collectFormInfo);

// FINDS THE EVENT WHEN THE NEW TASK BTN IS CLICKED
function collectTaskInfo() {
  if (event.target.className === 'new-task-btn') {
  createNewTask(taskInput.value, false);
  }
}

function collectFormInfo() {
  if (event.target.className === 'new-list-btn') {
  console.log('look at you babe!!');
  makeList(titleInput.value, tasks, false);
  }
}

function createNewTask(item, complete) {
  var task = new Task(item, complete);
  tasks.push(task);
  task.addNewTask(task);
  clearInputField();
  enableButtons();
}

function makeList(title, tasks, urgent) {
  var list = new ToDoList(title, tasks, urgent);
  lists.push(list);
  list.addNewList(list);
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
  var newTaskBtn = document.querySelector('.new-task-btn');
  taskInput.value !== '' ? newTaskBtn.disabled = false : newTaskBtn.disabled = true;
  titleInput.value || taskInput.value !== '' ? newListBtn.disabled = false : newListBtn.disabled = true;
}

function clearInputField() {
  var inputField = document.querySelector('form');
  inputField.reset();
}


//
