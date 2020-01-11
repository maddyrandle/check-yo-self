class Task {
  constructor(item, complete) {
    this.id = Date.now();
    this.item = item;
    this.completed = complete;
  }

  addNewTask(newTask) {
    taskHolder.classList.remove('hidden');
    taskHolder.insertAdjacentHTML('beforeend', `
    <section id="${newTask.id}" class="new-task-wrapper">
      <img class="close-img-btn" src="./assets/delete.svg" alt="close icon">
      <p class="task-text new-task-font">${newTask.item}</p>
    </section>
    `);
  }

  removeTask() {

  }
}

//
