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
    localStorage.setItem('active style', JSON.stringify(activeStyle));
  }

  addNewList(newList) {
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
        <div class="img-wrapper">
        <button class="urgent-btn">
          <img class="img-btn" src="./assets/urgent.svg" alt="lightening bolt">
          <img class="img-btn hidden" src="./assets/urgent-active.svg" alt=" red lightening bolt">
          <p class="regular-footer-font">URGENT</p>
        </button>
        </div>
        <div class="img-wrapper">
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
