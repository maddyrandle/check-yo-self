var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var taskHolder = document.querySelector('.task-form-container');
var taskInputContainer = document.querySelector('.task-input-wrapper');
var formContainer = document.querySelector('.form-wrapper');
var tasks = [];
var lists = [];

taskInput.addEventListener('keyup', enableButtons);
titleInput.addEventListener('keyup', enableButtons);
taskHolder.addEventListener('click', removeTask);
taskInputContainer.addEventListener('click', collectTaskInfo);
formContainer.addEventListener('click', collectFormInfo);
window.addEventListener('load', pageLoad);

function collectTaskInfo() {
  if (event.target.className === 'new-task-btn') {
  createNewTask(taskInput.value, false);
  }
}

function collectFormInfo() {
  if (event.target.className === 'new-list-btn') {
  makeList(titleInput.value, tasks, false);
  }
}

function createNewTask(item, complete) {
  var task = new Task(item, complete);
  tasks.push(task);
  task.addNewTask(task);
  taskInput.value = '';
  enableButtons();
}

function makeList(title, tasks, urgent) {
  var list = new ToDoList(title, tasks, urgent);
  lists.push(list);
  list.addNewList(list);
  clearInputField();
  enableButtons();
  list.saveToStorage(lists);
}

function pageLoad() {
  if ('list' in localStorage) {
   checkLocalStorage()
  }
}

function parseLocalStorage() {
  var getItem = localStorage.getItem('list');
  var storageArray = JSON.parse(getItem);
  return storageArray;
}

function checkLocalStorage() {
  var storageArray = parseLocalStorage();
    for (var i = 0; i < storageArray.length; i++) {
      makeList(storageArray[i].title, storageArray[i].tasks, storageArray[i].urgent);
    }
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
  var newListBtn = document.querySelector('.new-list-btn')
  var newTaskBtn = document.querySelector('.new-task-btn');
  taskInput.value !== '' ? newTaskBtn.disabled = false : newTaskBtn.disabled = true;
  titleInput.value || taskInput.value !== '' ? newListBtn.disabled = false : newListBtn.disabled = true;
}

function clearInputField() {
  var inputField = document.querySelector('form');
  inputField.reset();
}


//
