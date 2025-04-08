export function updateCounters(completedCounter, uncompletedCounter) {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
  
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
  }