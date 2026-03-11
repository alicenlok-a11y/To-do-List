import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForms.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

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

todoSection.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",

  handleFormSubmit: (formData) => {
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

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

addTodoPopup.setEventListeners();

handleEscapeClose = (evt) => {
  if (evt.key === "Escape") {
    this.close();
  }
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
