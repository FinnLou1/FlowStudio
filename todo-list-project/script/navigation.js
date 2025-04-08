
export function backToTodoList() {
  const todoList = document.querySelector('.todolist');
  todoList.style.display = 'block';

  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) {
    statsContainer.style.display = 'none';
  }
}

export function showstats() {
  const todoList = document.querySelector('.todolist');
  if (!todoList) {
    console.error('Todo list container not found!');
    return;
  }
  todoList.style.display = 'none';

  fetch('/todo-list-project/stats.html')
    .then(response => {
      console.log('Fetch response:', response);
      if (!response.ok) {
        throw new Error(`Failed to load stats.html: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      let statsContainer = document.getElementById('stats-container');
      if (!statsContainer) {
        statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        document.body.appendChild(statsContainer);
      }
      statsContainer.innerHTML = html;
      statsContainer.style.display = 'block';
      
      // Event Listener für den Back-Button
      const backButton = document.getElementById('back-button');
      if (backButton) {
        backButton.addEventListener('click', backToTodoList);
      }
    })
    .catch(error => {
      console.error('Error loading stats.html:', error);
      alert('Could not load statistics. Please check the console for more details.');
    });
}