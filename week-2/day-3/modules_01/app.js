import { addTask, getAllTasks, completeTask } from "./task.js";



console.log("=== TASK MANAGER ===");

// Add tasks
console.log(addTask("Eating", "MID", "2026-01-02"));
console.log(addTask("Sleeping", "HIGH", "2026-11-02"));
console.log(addTask("DA", "LOW", "2026-01-02"));

// View all tasks
console.log("\nAll Tasks:");
console.log(getAllTasks());

// Complete a task
console.log("\nComplete Task 1:");
console.log(completeTask(1));

// View updated tasks
console.log("\nUpdated Tasks:");
console.log(getAllTasks());
