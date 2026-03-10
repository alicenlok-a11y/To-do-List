class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    // Select the counter element in the DOM
    this._element = document.querySelector(selector);

    // Total number of todos
    this._total = todos.length;

    // Number of completed todos
    this._completed = todos.filter((todo) => todo.completed).length;

    // Initialize the text display
    this._updateText();
  }

  // Call this when a checkbox is clicked,
  // and when a completed todo is deleted
  updateCompleted(increment) {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }

    this._updateText();
  }

  // Call this when a todo is created or deleted
  updateTotal(increment) {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }

    this._updateText();
  }

  // Updates the counter text
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
