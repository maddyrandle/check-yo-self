class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent;
  }

  saveToStorage() {
    localStorage.setItem('task', JSON.stringify(tasks))
  }

  deleteFromStorage() {

  }

  updateToDo() {
    // should update the todo’s title and urgency
  }

  updateTask() {
    // should update a task’s content and if it has been completed
  }
}

//
