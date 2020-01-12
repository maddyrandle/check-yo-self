var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var taskHolder = document.querySelector('.task-form-container');
var taskInputContainer = document.querySelector('.task-input-wrapper');
var formContainer = document.querySelector('.form-wrapper');
var tasks = [];
var lists = [];

taskInput.addEventListener('keyup', enableAndDisableButtons);
titleInput.addEventListener('keyup', enableAndDisableButtons);
taskHolder.addEventListener('click', removeTask);
taskInputContainer.addEventListener('click', collectTaskInfo);
formContainer.addEventListener('click', collectFormInfo);
window.addEventListener('load', pageLoad);

// COLLECTS TASK INFO FROM THE FORM AND BEGINS PROCESS
// OF INSTANTIATING A NEW TASK
function collectTaskInfo() {
  if (event.target.className === 'new-task-btn') {
  createNewTask(taskInput.value, false);
  }
}

// INSTANTIATES A NEW TASK
function createNewTask(item, complete) {
  var task = new Task(item, complete);
  tasks.push(task);
  task.addNewTask(task);
  taskInput.value = '';
  enableAndDisableButtons();
}

// COLLECTS TITLE INFO FROM FORM AND BEGINS PROCESS OF
// INSTANTIATING A NEW TODO LIST
function collectFormInfo() {
  if (event.target.className === 'new-list-btn') {
  makeList(titleInput.value, tasks, false);
  taskHolder.innerText = '';
  hideTaskContainer();
  }
}

// INSTANTIATES A NEW TODO LIST
function makeList(title, tasks, urgent) {
  var list = new ToDoList(title, tasks, urgent);
  lists.push(list);
  list.addNewList(list);
  clearInputField();
  enableAndDisableButtons();
  list.saveToStorage(lists);
  // console.log(event.target.parentNode.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.id)
}

// STARTS PROCESS OF BRINGING BACK KEY:LIST FROM LOCALSTORAGE
function pageLoad() {
  if ('list' in localStorage) {
   checkLocalStorage();
  }
}

// GETS KEY:LIST FROM LOCALSTORAGE AND TAKES IT OUT OF STRING
function parseLocalStorage() {
  var getItem = localStorage.getItem('list');
  var storageArray = JSON.parse(getItem);
  return storageArray;
}

// LOOPS THROUGH ARRAY OF TODO LISTS IN LOCALSTORAGE AND
// MAKES A CARD WITH THE STORED PROPERTIES
function checkLocalStorage() {
  var storageArray = parseLocalStorage();
    for (var i = 0; i < storageArray.length; i++) {
      makeList(storageArray[i].title, storageArray[i].tasks, storageArray[i].urgent);
    }
}

// LOOPS THROUGH TASK ARRAY AND MATCHES IT TO THE ID OF
// THE CLOSEST TASK TO THE X BUTTON CLICKED
function findId() {
  var taskId = parseInt(event.target.closest('.close-img-btn').id);
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      return tasks[i];
    }
  }
}

// REMOVES TASK FROM ARRAY IN LOCALSTORAGE
// REMOVES TASK FROM THE FORM ON THE PAGE
function removeTask() {
  if (event.target.className === 'close-img-btn') {
    var taskToRemove = findId(event);
    var i = tasks.indexOf(taskToRemove);
    tasks.splice(i, 1);
    event.target.closest('.new-task-wrapper').remove();
  }
  hideTaskContainer();
}

function removeAllTasksFromArray() {
  if (event.target.className === 'clear-btn') {
      tasks.splice(0, tasks.length);
  }
}


// REMOVES EMPTY CONTAINER WHERE TASKS ARE ADDED ON THE
// PAGE, IF NO TASKS ARE ADDED ON THE FORM
function hideTaskContainer() {
  if (taskHolder.innerText === '' || tasks.length === 0) {
    taskHolder.classList.add('hidden');
  }
}

function clearAllBtn() {
  if (event.target.className === 'clear-btn') {
    taskHolder.innerText = '';
    clearInputField();
    hideTaskContainer();
    removeAllTasksFromArray();
  }
}

// CHECKS INPUT FIELDS AND ENABLES OR DISABLES BUTTONS ON
// THE FORM
function enableAndDisableButtons() {
  var noTaskInput = taskInput.value === '';
  var noTitleInput = titleInput.value === '';
  var noTasks = taskHolder.classList.contains('hidden');
  var newListBtn = document.querySelector('.new-list-btn')
  var newTaskBtn = document.querySelector('.new-task-btn');
  var clearBtn = document.querySelector('.clear-btn');
  noTaskInput ? newTaskBtn.disabled = true : newTaskBtn.disabled = false;
  noTitleInput || noTasks ? newListBtn.disabled = true : newListBtn.disabled = false;
  if (noTasks || noTitleInput) {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
    formContainer.addEventListener('click', clearAllBtn);
  }
}

// CLEARS THE INPUT FIELDS ON THE FORM
function clearInputField() {
  var inputField = document.querySelector('form');
  inputField.reset();
}


function addTasksToList() {
  var checklistHTML;
  var taskHolder = document.querySelector('.all-tasks');
  for (var i = 0; i < tasks.length; i++) {
    checklistHTML = tasks[i].item;
    taskHolder.insertAdjacentHTML('beforeend', `
    <div class="single-task-wrapper">
      <div class="checkbox-img-wrapper">
        <img class="checkbox-img" src="./assets/checkbox.svg" alt="empty circle check box">
        <img class="checkbox-img-active hidden" src="./assets/checkbox-active.svg" alt="circle check box checked">
      </div
      <p class="task-text-p">${checklistHTML}</p>
    </div>
    `);
  }
}

//
