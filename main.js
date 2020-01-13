var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var taskHolder = document.querySelector('.task-form-container');
var taskInputContainer = document.querySelector('.task-input-wrapper');
var formContainer = document.querySelector('.form-wrapper');
var leftListHolder = document.querySelector('.left-side');
var noListMsg = document.querySelector('.make-list-msg');
var tasks = [];
var lists = [];
var list;
var activeStyle;

taskInput.addEventListener('keyup', enableAndDisableButtons);
titleInput.addEventListener('keyup', enableAndDisableButtons);
taskHolder.addEventListener('click', removeTask);
taskInputContainer.addEventListener('click', collectTaskInfo);
formContainer.addEventListener('click', collectFormInfo);
leftListHolder.addEventListener('click', removeList);
window.addEventListener('load', pageLoad);




// function showTaskComplete() {
//   var tasksArray;
//   var eventId = parseInt(event.target.getAttribute('id'));
//   var inactive = document.querySelector('.inactive-checkbox');
//   var active = document.querySelector('.active-checkbox');
//
//   for (var i = 0; i < lists.length; i++) {
//
//     tasksArray = lists[i].tasks;
//
//     for (var j = 0; j < tasksArray.length; j++) {
//       if (tasksArray[j].id === eventId) {
//         tasksArray[j].completed = true;
//         event.target.classList.add('hidden');
//         active.classList.remove('hidden');
//         styleActiveTask();
//       }
//     }
//   }
//
//   list.saveToStorage(lists);
// }
//
// function styleActiveTask() {
//   var text = document.querySelector('.task-text-p');
//   activeStyle = text.classList.add('task-text-active');
//
// }

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
  list = new ToDoList(title, tasks, urgent);
  lists.push(list);
  list.addNewList(list);
  clearInputField();
  enableAndDisableButtons();
  list.saveToStorage(lists);
}

// STARTS PROCESS OF BRINGING BACK KEY:LIST FROM LOCALSTORAGE
function pageLoad() {
  if ('list' in localStorage) {
    checkLocalStorage();
  }
}

// GETS KEY:LIST FROM LOCALSTORAGE AND TAKES IT OUT OF STRING
function parseLocalStorage() {
  var getListItem = localStorage.getItem('list');
  var storedArray = JSON.parse(getListItem);
  return storedArray;
}

// LOOPS THROUGH ARRAY OF TODO LISTS IN LOCALSTORAGE AND
// MAKES A CARD WITH THE STORED PROPERTIES
function checkLocalStorage() {
  var storedListArray = parseListLocalStorage();
  for (var i = 0; i < storedListArray.length; i++) {
    storedListArray[i].tasks.forEach(j => tasks.push(j));
    makeList(storedListArray[i].title, storedListArray[i].tasks, storedListArray[i].urgent);
  }
}

// LOOPS THROUGH TASK ARRAY AND MATCHES IT TO THE ID OF
// THE CLOSEST TASK TO THE X BUTTON CLICKED
function findTaskId() {
  var taskId = parseInt(event.target.closest('.close-img-btn').id);
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      return tasks[i];
    }
  }
}

function findListId() {
  var findCard = event.target.closest('.card');
  var listId = parseInt(findCard.id);
  for (var i = 0; i < lists.length; i++) {
    if (lists[i].id === listId) {
      return lists[i];
    }
  }
}

// REMOVES LIST FROM ARRAY IN LOCALSTORAGE
// REMOVES LIST FROM THE FORM ON THE PAGE
function removeList() {
  var listToRemove = findListId(event);
  var i = lists.indexOf(listToRemove);
  if (event.target.parentNode.classList.contains('delete-btn')) {
    lists.splice(i, 1);
    event.target.classList.contains('.card').remove();
    listToRemove.saveToStorage(lists);
  }
}

// REMOVES TASK FROM ARRAY IN LOCALSTORAGE
// REMOVES TASK FROM THE FORM ON THE PAGE
function removeTask() {
  var taskToRemove = findTaskId(event);
  var i = tasks.indexOf(taskToRemove);
  if (event.target.className === 'close-img-btn') {
    tasks.splice(i, 1);
    event.target.closest('.new-task-wrapper').remove();
  }
  hideTaskContainer();
}

// REMOVES ALL TASKS FROM ARRAY WHEN CLEAR BUTTON IS CLICKED
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
  var taskItem;
  var taskId;
  var taskHolder = document.querySelector('.all-tasks');
  for (var i = 0; i < tasks.length; i++) {
    taskItem = tasks[i].item;
    taskId = tasks[i].id;
    taskHolder.insertAdjacentHTML('beforeend', `
    <div class="single-task-wrapper">
      <div class="checkbox-img-wrapper">
        <input id="${taskId}" type="checkbox"/>
        <label for="${taskId}"></label>
      </div>
      <p class="task-text-p">${taskItem}</p>
    </div>
    `);
    var completeTask = document.getElementById(`${taskId}`);
    completeTask.checked = tasks[i].completed
    // ON CLICK MAKE TASK COMPLETED TRUE
  }
}
