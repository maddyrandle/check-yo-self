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
    var listId = parseInt(event.target.closest('.close-img-btn').id);
    var findListId =
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].id === listId) {
        return lists[i];
      }
    }
  }

  updateToDo() {
    // should update the todo’s title and urgency
  }

  updateTask() {
    // should update a task’s content and if it has been completed
  }

  addNewList(newList) {
    var noListMsg = document.querySelector('.make-list-msg');
    var leftListHolder = document.querySelector('.left-side');
    noListMsg.classList.add('hidden');
    leftListHolder.classList.remove('hidden');
    leftListHolder.insertAdjacentHTML('afterbegin', `
    <div id="${newList.id}" class="card regular-card">
      <header class="card-header">
        <h1 class="card-title regular-card-title">${newList.title}</h1>
      </header>
      <main class="card-main">
        <section class="single-task-wrapper">

          <div class="checkbox-img-wrapper">
            <img class="checkbox-img" src="./assets/checkbox.svg" alt="empty circle check box">
            <img class="checkbox-img-active hidden" src="./assets/checkbox-active.svg" alt="circle check box checked">
          </div>

          <p class="task-text">${tasks.item}</p>
        </section>
      </main>
      <footer class="card-footer regular-card-footer">
        <div class="img-wrapper">
          <img class="img-btn urgent-img-btn" src="./assets/urgent.svg" alt="lightening bolt">
          <p class="regular-footer-font">URGENT</p>
        </div>
        <div class="img-wrapper">
          <img class="img-btn close-img-btn" src="./assets/delete.svg" alt="close icon">
          <img class="close-img-btn hidden" src="./assets/delete-active.svg" alt="close icon">
          <p class="regular-footer-font">DELETE</p>
        </div>
      </footer>
    </div>
    `);
  }
}

//
