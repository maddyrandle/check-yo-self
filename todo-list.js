class ToDoList {
  constructor(title, tasks, urgent, id) {
    this.id = id || createId();
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent;
  }

  saveToStorage(allToDoCards) {
    localStorage.setItem('ToDoList', JSON.stringify(allToDoCards));
  }

  deleteFromStorage() {

  }

  updateToDo() {
    // should update the todo’s title and urgency
    this.urgent = !this.urgent;
  }

  updateTask(task) {
    // should update a task’s content and if it has been completed
    task.completed = !task.completed;
  }
}

//
