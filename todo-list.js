class ToDoList {
  constructor(title, tasks) {
    this.id = Date.now();
    this.title = title;
    this.tasks = tasks;
    this.urgent = false;
  }

  saveToStorage() {
    localStorage.setItem('ToDoList', JSON.stringify(allToDoCards));
  }

  deleteFromStorage() {

  }

  updateToDo() {
    // should update the todo’s title and urgency
    this.urgent = !this.urgent;
  }

  updateTask() {
    // should update a task’s content and if it has been completed
  }
}

//
