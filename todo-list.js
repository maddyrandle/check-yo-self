class ToDoList {
  constructor(title, tasks, urgent) {
    this.id = Date.now();
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage() {
    localStorage.setItem('ToDoList', JSON.stringify(allToDoCards));
  }

  deleteFromStorage() {

  }

  updateToDo(list) {
    // should update the todo’s title and urgency
    this.urgent = !this.urgent;

  }

  updateTask(task) {
    // should update a task’s content and if it has been completed
    task.completed = !task.completed;
  }
}

//
