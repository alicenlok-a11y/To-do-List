class Todo {
  constructor(data, selector, handleCheckboxChange, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheckboxChange = handleCheckboxChange;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;

      if (this._data.completed) {
        this._todoElement.classList.add("todo_completed");
        this._handleCheckboxChange(true);
      } else {
        this._todoElement.classList.remove("todo_completed");
        this._handleCheckboxChange(false);
      }
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoDeleteBtn.addEventListener("click", () => {
      if (this._data.completed) {
        this._handleCheckboxChange(false);
      }

      this._handleDelete();

      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      todoDate.textContent = "";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
