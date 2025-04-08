export let tasks = [];

export function saveTasks() {
  console.log("Saving tasks:", tasks); // Debugging
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks(renderTask, updateCounters) {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    tasks.forEach(task => renderTask(task));
    // Aktualisiere die Zähler nach dem Laden der Aufgaben
    updateCounters();
  }
}

export function addTask(taskText, renderTask, updateCounters) {
  if (!taskText) {
    alert("Please write down a task");
    return;
  }

  const task = { text: taskText, completed: false };
  tasks.push(task);
  renderTask(task);
  saveTasks();
  updateCounters();
}