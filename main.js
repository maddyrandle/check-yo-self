var newListSection = document.querySelector('#left-side-wrapper');

newListSection.addEventListener('click', addNewTask);

function addNewTask() {
  var taskBox = document.querySelector('.add-task-holder');
  var addTaskBtn = document.querySelector('#add-task-btn');


  if (event.target.id.includes('add-task-btn')) {
    taskBox.classList.remove('hidden');
    taskBox.insertAdjacentHTML('afterbegin', `
    <section class="new-task-wrapper">
        <img class="close-img-btn" src="./assets/delete.svg" alt="close icon">
      <p class="task-text new-task-font">Every chance I get, I water the plants.</p>
    </section>
    `);
  }
}

//
