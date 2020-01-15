class Task {
  constructor(description) {
    this.id = createId();
    this.description = description;
    this.completed = false;
  }
}
//
