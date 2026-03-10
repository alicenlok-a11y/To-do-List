class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this.handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this.handleEscapeClose);
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".popup__close");

    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
