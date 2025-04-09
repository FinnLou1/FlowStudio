import { tasks, saveTasks, loadTasks, addTask } from './tasks.js';
import { updateCounters } from './counters.js';
import { showstats } from './navigation.js';

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Event-Listener für den "Add Task"-Button
document.getElementById("input-button").addEventListener("click", () => {
  addTask(inputBox.value.trim(), renderTask, () => updateCounters(completedCounter, uncompletedCounter));
  inputBox.value = ""; // Leere das Eingabefeld nach dem Hinzufügen
});

// Event-Listener für den "Show Statistics"-Button
document.getElementById('show-stats-button').addEventListener('click', showstats);

function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <div class="checkbox">
            <input type="checkbox" ${task.completed ? "checked" : ""}>
    </div>
    <label>
        <span>${task.text}</span>
    </label>
    <div class="btn-group">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  listContainer.appendChild(li);

  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("label span");
  const deleteBtn = li.querySelector(".delete-btn");

  checkbox.addEventListener("click", function () {
    task.completed = checkbox.checked;
    li.classList.toggle("completed", task.completed);
    saveTasks();
    updateCounters(completedCounter, uncompletedCounter);
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      task.text = update.trim();
      checkbox.checked = false;
      li.classList.remove("completed");
      saveTasks();
      updateCounters(completedCounter, uncompletedCounter);
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      tasks.splice(tasks.indexOf(task), 1);
      saveTasks();
      updateCounters(completedCounter, uncompletedCounter);
    }
  });
}

// Aufgaben laden, wenn die Seite geladen wird
window.addEventListener("DOMContentLoaded", () => {
  loadTasks(
    renderTask, 
    () => updateCounters(completedCounter, uncompletedCounter)
  );
});