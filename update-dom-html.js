
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
  var newvar;
  msgToUser.classList.add('hidden');
  toDoListsWrapper.classList.remove('hidden');
  toDoListsWrapper.insertAdjacentHTML('afterbegin', `
  <div class="card regular-card">
    <header class="card-header">
      <h1 class="card-title regular-card-title">${toDoList.title}</h1>
    </header>
    <main class="card-main">
      <section class="all-tasks">
      </section>
    </main>
    <footer class="card-footer regular-card-footer">
      <div id="${toDoList.id}" class="urgent-img-wrapper img-wrapper">
        <input id="${toDoList.id}" type="checkbox"/>
        <label for="${toDoList.id}" class="urgent-btn"></label>
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
  // newvar = document.getElementById(`${toDoList.id}`);
  .checked = allToDoCards[i].urgent;
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
    newId = createId();
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
    newvar.checked = taskObjsArray[i].completed;
    task = document.getElementById(`${newId}`);

    if (newvar.checked === true) {
      task.classList.add('task-text-active');
    } else {
      task.classList.remove('task-text-active');
    }
  }
}



//
