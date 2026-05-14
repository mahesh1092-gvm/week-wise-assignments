import {
  validateTitle,
  validatePriority,
  validateDueDate,
} from "./validator.js";

/**
 * In-memory task storage
 */
let tasks = [];
let nextTaskId = 1;

/**
 * Add a new task
 */
function addTask(title, priority, dueDate) {
  const titleValidation = validateTitle(title);
  if (titleValidation !== true)
    return { ok: false, error: titleValidation };

  const priorityValidation = validatePriority(priority);
  if (priorityValidation !== true)
    return { ok: false, error: priorityValidation };

  const dueDateValidation = validateDueDate(dueDate);
  if (dueDateValidation !== true)
    return { ok: false, error: dueDateValidation };

  const task = {
    id: nextTaskId++,
    title,
    priority,
    dueDate,
    completed: false,
  };

  tasks.push(task);

  return { ok: true, task };
}

/**
 * Get all tasks
 */
function getAllTasks() {
  return tasks;
}

/**
 * Mark task as completed
 */
function completeTask(taskId) {
  const id = Number(taskId);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return { ok: false, error: "Task not found" };
  }

  task.completed = true;

  return { ok: true, task };
}

export { addTask, getAllTasks, completeTask };