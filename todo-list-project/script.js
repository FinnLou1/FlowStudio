const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

let tasks = [];

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    tasks.forEach(task => renderTask(task));
  }
}

function addTask() {
  const taskText = inputBox.value.trim();
  if (!taskText) {
    alert("Please write down a task");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  renderTask(task);
  saveTasks();
  inputBox.value = "";
  updateCounters();
}

function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
  <label>
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
  </label>
  <div class="btn-group">
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
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
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      task.text = update.trim();
      task.completed = false;
      checkbox.checked = false;
      li.classList.remove("completed");
      saveTasks();
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      updateCounters();
    }
  });
}

// Aufgaben laden, wenn die Seite geladen wird
window.addEventListener("DOMContentLoaded", loadTasks);

function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }