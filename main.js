var toDoListsWrapper = document.querySelector('.left-side');
var formWrapper = document.querySelector('.form-wrapper');
var tasksWrapperOnForm = document.querySelector('.task-form-container');
var formInputs = document.querySelector('form');
var titleInput = document.querySelector('#title-input');
var taskInput = document.querySelector('#task-input');
var searchInput = document.querySelector('#search-input');
var urgentFilterBtn = document.querySelector('.urgent-filter-btn');
var taskObjsArray = [];
var allToDoCards = [];
var toDoList;

urgentFilterBtn.addEventListener('click', filterUrgentCards);
searchInput.addEventListener('keyup', searchByTitle);
formInputs.addEventListener('keyup', disableBtns);
tasksWrapperOnForm.addEventListener('click', removeTask);
toDoListsWrapper.addEventListener('click', clickHandler);
formWrapper.addEventListener('click', targetNewTaskDescription);
formWrapper.addEventListener('click', resetForm);
window.addEventListener('load', pageLoad);

function createId() {
  return Math.random().toString(36).slice(2, 9);
};

function clickHandler() {
  if (event.target.classList.contains('urgent-btn')) {
    showUrgentStyling();
  }
  else if (event.target.classList.contains('delete-btn')) {
    removeToDoList();
  } else if (event.target.classList.contains('label-btn')) {
    designateTaskCompleted();
    disableDeleteBtn();
  }
}

function pageLoad() {
  'ToDoList' in localStorage ? inspectLocalStorage() : '';
}

function inspectLocalStorage() {
  var storedToDosArray = parseLocalStorage();
  for (var i = 0; i < storedToDosArray.length; i++) {
    storedToDosArray[i].tasks.forEach(j => taskObjsArray.push(j));
    instantiateToDoList(storedToDosArray[i].title, storedToDosArray[i].tasks, storedToDosArray[i].urgent);
  }
}


function parseLocalStorage() {
  var storedToDosArray = localStorage.getItem('ToDoList');
  var parsedToDosArray = JSON.parse(storedToDosArray);
  return parsedToDosArray;
}

function targetNewTaskDescription() {
  if (event.target.className === 'new-task-btn') {
  instantiateTask(taskInput.value);
  }

  targetNewToDoListValues();
}

function targetNewToDoListValues() {
  if (event.target.className === 'new-list-btn') {
  instantiateToDoList(titleInput.value, taskObjsArray, false);
  tasksWrapperOnForm.innerText = '';
  hideTasksWrapperOnForm();
  }
}

function instantiateToDoList(title, tasks, urgent, id) {
  toDoList = new ToDoList(title, tasks, urgent, id);
  allToDoCards.push(toDoList);
  displayNewToDoList(toDoList);
  formInputs.reset();
  disableBtns();
  toDoList.saveToStorage(allToDoCards);
}

function matchTaskId() {
  var eventTaskId = event.target.id;
  for (var i = 0; i < taskObjsArray.length; i++) {
    if (taskObjsArray[i].id === eventTaskId) {
      return taskObjsArray[i];
    }
  }
}

function removeTask() {
  var taskToRemove = matchTaskId(event);
  var i = taskObjsArray.indexOf(taskToRemove);
  event.target.remove();
  taskObjsArray.splice(i, 1);
  hideTasksWrapperOnForm();
}

function matchToDoListId() {
  var eventCardId = event.target.id;
  for (var i = 0; i < allToDoCards.length; i++) {
    if (allToDoCards[i].id === eventCardId) {
      return allToDoCards[i];
    }
  }
}

function removeToDoList() {
  var listToRemove = matchToDoListId(event);
  var i = allToDoCards.indexOf(listToRemove);

  if (event.target.classList.contains('delete-btn')) {
    event.target.closest('.card').remove();
    allToDoCards.splice(i, 1);
    toDoList.saveToStorage(allToDoCards);
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
  }

  disableTaskBtn();
}

function disableTaskBtn() {
  var newTaskBtn = document.querySelector('.new-task-btn');
  taskInput.value === '' ? newTaskBtn.disabled = true : newTaskBtn.disabled = false;
}

function designateTaskCompleted() {
  var taskWrapper = event.target.closest('.single-task-wrapper');
  var taskEventId = parseInt(event.target.htmlFor);
  for (var i = 0; i < allToDoCards.length; i++) {
    var taskarray = allToDoCards[i].tasks;
    for (var j = 0; j < taskarray.length; j++) {
      if (taskarray[j].id === taskEventId) {
        taskWrapper.classList.add('task-text-active');
        toDoList.updateTask(taskarray[j]);
      }
    }

    toDoList.saveToStorage(allToDoCards);
  }
}

function disableDeleteBtn() {
  var card = event.target.closest('.card');
  var deleteBtn = card.querySelector('.delete-btn');
  for (var i = 0; i < allToDoCards.length; i++) {
    var taskarray = allToDoCards[i].tasks;
    for (var j = 0; j < taskarray.length; j++) {
      if (taskarray.every(task => task.completed === true)) {
        deleteBtn.disabled = false;
      } else {
        deleteBtn.disabled = true;
      }
    }

    toDoList.saveToStorage(allToDoCards);
  }
}

function showUrgentStyling() {
  var listEventId = event.target.htmlFor;
  for (var i = 0; i < allToDoCards.length; i++) {
    if (allToDoCards[i].id == listEventId) {
    toDoList.updateToDo(allToDoCards[i]);
    }
    toDoList.saveToStorage(allToDoCards);
  }
}

function searchByTitle() {
  var searchInput = document.querySelector('#search-input');
  var searchedCard = toDoListsWrapper.querySelectorAll('.card');
  for (var i = 0; i < searchedCard.length; i++) {
    if (searchInput.value === '') {
    searchedCard[i].classList.remove('hidden');
  } else if (searchInput.value !== searchedCard[i].querySelector('h1').textContent) {
    searchedCard[i].classList.add('hidden');
  } else if (searchInput.value === searchedCard[i].querySelector('h1').textContent)  {
    searchedCard[i].classList.remove('hidden');
    }
  }
}

function filterUrgentCards() {
  var searchedCard = document.querySelectorAll('.card');
  urgentFilterBtn.classList.toggle('urgent-filter-btn-active');
  for (var i = 0; i < allToDoCards.length; i++) {
    if (!allToDoCards[i].urgent === true) {
      searchedCard[i].classList.toggle('hidden');
    }
  }
}


//
