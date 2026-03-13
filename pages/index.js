import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");

// Function to generate a todo element
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Create section instance
const todoSection = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todoElement = generateTodo(item);
      todoSection.addItem(todoElement);
    },
  },
  ".todos__list",
);

// Render initial todos
todoSection.renderItems();

// Create popup instance
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",

  handleFormSubmit: (formData) => {
    let date = new Date(formData.date);

    // Fix timezone issue only if date exists
    if (!isNaN(date)) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    } else {
      date = "";
    }

    const newTodo = {
      name: formData.name,
      date: date,
      id: uuidv4(),
      completed: false,
    };

    const todoElement = generateTodo(newTodo);
    todoSection.addItem(todoElement);

    addTodoPopup.close();
  },
});

// Enable popup listeners
addTodoPopup.setEventListeners();

// Open popup
addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  addTodoPopup.open();
});

// Form validation
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
