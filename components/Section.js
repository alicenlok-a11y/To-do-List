class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer: (item) => {
  const todo = createTodo(item);
  section.addItem(todo);
}

  addItem(element) {
  this._items.unshift(element);
  this._container.prepend(element);
}

export default Section;
