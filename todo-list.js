class ToDoList {
  constructor(title, tasks, urgent) {
    this.id = Date.now();
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent;
  }

  saveToStorage() {
    localStorage.setItem('list', JSON.stringify(lists));
  }

  deleteFromStorage() {

  }

  updateToDo() {
    // should update the todo’s title and urgency
  }

  updateTask() {
    // should update a task’s content and if it has been completed
    // localStorage.setItem('active style', JSON.stringify(activeStyle));
  }

  addNewList(newList) {
    var checkboxId = Date.now().toString(36);
    noListMsg.classList.add('hidden');
    leftListHolder.classList.remove('hidden');
    leftListHolder.insertAdjacentHTML('afterbegin', `
    <div id="${newList.id}" class="card regular-card">
      <header class="card-header">
        <h1 class="card-title regular-card-title">${newList.title}</h1>
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
    addTasksToList();
    tasks = [];
  }
}

//
