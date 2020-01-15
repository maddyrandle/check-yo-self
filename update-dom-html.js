
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
        <label for="${checkboxId}" class="urgent-btn"></label>
        <p class="regular-footer-font">URGENT</p>
      </div>
      <div class="delete-img-wrapper img-wrapper">
        <button class="delete-btn" disabled>
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
  var taskWrapper = document.querySelector('.all-tasks');
  var taskId;
  var newvar;
  var task;
  var newId;
  for (var i = 0; i < taskObjsArray.length; i++) {
    newId = Date.now().toString(36);
    taskDescription = taskObjsArray[i].description;
    taskId = taskObjsArray[i].id;
    taskWrapper.insertAdjacentHTML('beforeend', `
    <div id="${newId}" class="single-task-wrapper">
      <div class="checkbox-img-wrapper">
        <input id="${taskId}" type="checkbox"/>
        <label for="${taskId}" class="label-btn"></label>
      </div>
      <p class="task-text-p">${taskDescription}</p>
    </div>
    `);
    newvar = document.getElementById(`${taskId}`);
    newvar.checked = taskObjsArray[i].completed
    task = document.getElementById(`${newId}`);
    if (newvar.checked === true) {
      task.classList.add('task-text-active');
    } else {
      task.classList.remove('task-text-active');
    }
  }
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

function showUrgentStyling() {
  var card = event.target.closest('.card');
  var urgentBtn = card.querySelector('.urgent-btn');

  for (var i = 0; i < allToDoCards.length; i++) {
    console.log(allToDoCards[i].urgent);

    allToDoCards[i].urgent = !allToDoCards[i].urgent;
  }
}

//
