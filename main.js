var toDoListsWrapper = document.querySelector('.left-side');
var formWrapper = document.querySelector('.form-wrapper');
var tasksWrapperOnForm = document.querySelector('.task-form-container');
var formInputs = document.querySelector('form');
var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var taskObjsArray = [];
var toDosArray = [];
var toDoList;
var completedTaskCSS;

formInputs.addEventListener('keyup', disableBtns);
tasksWrapperOnForm.addEventListener('click', removeTask);
toDoListsWrapper.addEventListener('click', removeList);
formWrapper.addEventListener('click', targetNewTaskDescription);
window.addEventListener('load', pageLoad);

function pageLoad() {
  'ToDoList' in localStorage ? inspectLocalStorage() : '';
}

function inspectLocalStorage() {
  var storedToDosArray = parseLocalStorage();
  for (var i = 0; i < storedToDosArray.length; i++) {
    storedToDosArray[i].tasks.forEach(j => taskObjsArray.push(j));
    instantiateToDoList(storedToDosArray[i].title, storedToDosArray[i].tasks);
  }
}

function parseLocalStorage() {
  var storedToDosArray = localStorage.getItem('ToDoList');
  var parsedToDosArray = JSON.parse(storedToDosArray);
  return parsedToDosArray;
}

// function showUrgentStyling() {
//   var urgentStyle = event.target.nextElementSibling;
//   var urgentCard = event.target.closest('.card');
//   var urgentHeader = document.querySelector('.card-title');
//   var urgentFooter = document.querySelector('.card-footer');
//   event.target.classList.contains('.card');
//   .add('urgent-card');
//   event.target.urgentHeader.classList
//   .add('urgent-card-title');
//   event.target.urgentStyle.classList
//   .add('urgent-footer-font');
//   event.target.urgentFooter.classList
//   .add('urgent-card-footer');
//
// }

function designateTaskCompleted() {
  var eventTaskId = parseInt(event.target.id);
  var toDoTasksArray;
  for (var i = 0; i < toDosArray.length; i++) {
    toDoTasksArray = toDosArray[i].tasks;
    for (var j = 0; j < toDoTasksArray.length; j++) {
      if (toDoTasksArray[j].id === eventTaskId) {
        toDoTasksArray[j].completed = true;
        revealCompletedTask();
      }
    }
  }

  toDoList.saveToStorage(toDosArray);
}

function revealCompletedTask() {
  var taskDescription = document.querySelector('.task-text-p');
  completedTaskCSS = taskDescription.classList.add('task-text-active');
}

function targetNewTaskDescription() {
  if (event.target.className === 'new-task-btn') {
  instantiateTask(taskInput.value);
  }

  targetNewToDoListValues();
}

function instantiateTask(description) {
  if (event.target.className === 'new-task-btn') {
    var task = new Task(description);
    tasksWrapperOnForm.classList.remove('hidden');
    tasksWrapperOnForm.insertAdjacentHTML('beforeend', `
    <section id="${task.id}" class="new-task-wrapper">
      <img class="close-img-btn" src="./assets/delete.svg" alt="close icon">
      <p class="task-text new-task-font">${description}</p>
    </section>
    `);
  }

  taskObjsArray.push(task);
  taskInput.value = '';
  disableBtns();
}

function targetNewToDoListValues() {
  if (event.target.className === 'new-list-btn') {
  instantiateToDoList(titleInput.value, taskObjsArray);
  tasksWrapperOnForm.innerText = '';
  hideTasksWrapperOnForm();
  }
}

function instantiateToDoList(title, tasks) {
  toDoList = new ToDoList(title, tasks);
  toDosArray.push(toDoList);
  displayNewToDoList(toDoList);
  formInputs.reset();
  disableBtns();
  toDoList.saveToStorage(toDosArray);
}

function displayNewToDoList(toDoList) {
  var msgToUser = document.querySelector('.make-list-msg');
  var checkboxId = Date.now().toString(36);
  msgToUser.classList.add('hidden');
  toDoListsWrapper.classList.remove('hidden');
  toDoListsWrapper.insertAdjacentHTML('afterbegin', `
  <div id="${toDoList.id}" class="card regular-card">
    <header class="card-header">
      <h1 class="card-title regular-card-title">${toDoList.title}</h1>
    </header>
    <main class="card-main">
      <section class="all-tasks">
      </section>
    </main>
    <footer class="card-footer regular-card-footer">
      <div class="urgent-img-wrapper img-wrapper">
        <input id="${checkboxId}" type="checkbox"/>
        <label for="${checkboxId}"></label>
        <p class="regular-footer-font">URGENT</p>
      </div>
      <div class="delete-img-wrapper img-wrapper">
        <button class="delete-btn">
          <img class="img-btn delete" src="./assets/delete.svg" alt="close icon">
          <img class="img-btn delete hidden" src="./assets/delete-active.svg" alt="close icon">
          <p class="regular-footer-font">DELETE</p>
        </button>
      </div>
    </footer>
  </div>
  `);
  displayTasksOnToDoList();
  taskObjsArray = [];
}

function displayTasksOnToDoList() {
  var taskDescription;
  var taskId;
  var taskWrapper = document.querySelector('.all-tasks');
  for (var i = 0; i < taskObjsArray.length; i++) {
    taskDescription = taskObjsArray[i].description;
    taskId = taskObjsArray[i].id;
    taskWrapper.insertAdjacentHTML('beforeend', `
    <div class="single-task-wrapper">
      <div class="checkbox-img-wrapper">
        <input id="${taskId}" type="checkbox"/>
        <label for="${taskId}"></label>
      </div>
      <p class="task-text-p">${taskDescription}</p>
    </div>
    `);
    // var completeTask = document.getElementById(`${taskId}`);
    // completeTask.checked = tasks[i].completed;
    // ON CLICK MAKE TASK COMPLETED TRUE
  }
}

function matchTaskId() {
  var eventTaskId = parseInt(event.target.closest('.close-img-btn').id);
  for (var i = 0; i < taskObjsArray.length; i++) {
    if (taskObjsArray[i].id === eventTaskId) {
      return taskObjsArray[i];
    }
  }
}

function removeTask() {
  var taskToRemove = matchTaskId(event);
  var i = taskObjsArray.indexOf(taskToRemove);
  if (event.target.className === 'close-img-btn') {
    event.target.closest('.task-wrapper').remove();
    taskObjsArray.splice(i, 1);
  }

  hideTasksWrapperOnForm();
}

function matchListId() {
  var eventCard = event.target.closest('.card');
  var eventListId = parseInt(eventCard.id);
  for (var i = 0; i < toDosArray.length; i++) {
    if (toDosArray[i].id === eventListId) {
      return toDosArray[i];
    }
  }
}

function removeList() {
  var listToRemove = matchListId(event);
  var i = toDosArray.indexOf(listToRemove);
  designateTaskCompleted();
  if (event.target.parentNode.classList.contains('delete-btn')) {
    event.target.closest('.card').remove();
    toDosArray.splice(i, 1);
    listToRemove.saveToStorage(toDosArray);
  }
}

function hideTasksWrapperOnForm() {
  if (tasksWrapperOnForm.innerText === '' || taskObjsArray.length === 0) {
    tasksWrapperOnForm.classList.add('hidden');
  }
}

function resetForm() {
  if (event.target.className === 'clear-btn') {
    tasksWrapperOnForm.innerText = '';
    formInputs.reset();
    hideTasksWrapperOnForm();
    emptyTasksArray();
  }
}

function emptyTasksArray() {
  if (event.target.className === 'clear-btn') {
    taskObjsArray.splice(0, taskObjsArray.length);
  }
}

function disableBtns() {
  var noTasks = tasksWrapperOnForm.classList.contains('hidden');
  var newListBtn = document.querySelector('.new-list-btn')
  var clearBtn = document.querySelector('.clear-btn');
  if (titleInput.value === '' || noTasks) {
    newListBtn.disabled = true;
    clearBtn.disabled = true;
  } else {
    newListBtn.disabled = false;
    clearBtn.disabled = false;
    formWrapper.addEventListener('click', resetForm);
  }

  disableTaskBtn();
}

function disableTaskBtn() {
  var newTaskBtn = document.querySelector('.new-task-btn');
  taskInput.value === '' ? newTaskBtn.disabled = true : newTaskBtn.disabled = false;
}

//
