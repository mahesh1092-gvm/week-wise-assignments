/**
 * Validate task title
 * Rules:
 * - Required
 * - Minimum 3 characters
 */
function validateTitle(title) {
  if (!title) return "Title required";
  if (title.length < 3) return "Minimum 3 characters required";
  return true;
}

/**
 * Validate priority
 * Allowed values: LOW, MID, HIGH
 */
function validatePriority(priority) {
  const allowed = ["LOW", "MID", "HIGH"];
  if (!allowed.includes(priority)) {
    return "Priority must be LOW, MID, or HIGH";
  }
  return true;
}

/**
 * Validate due date
 * - Required
 * - Must be valid date
 * - Must not be past date
 */
function validateDueDate(dateStr) {
  if (!dateStr) return "Due date required";

  const dueDate = new Date(dateStr);
  if (isNaN(dueDate.getTime())) return "Invalid date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate < today) return "Due date cannot be in the past";

  return true;
}

export { validateTitle, validatePriority, validateDueDate };