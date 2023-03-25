import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitBtn = this._form.querySelector('.popup__button-submit');
  }

  // Устанавливаем колбэк на удаление карточки при согласии
  setSubmitDelete(action) {
    this._handleConfirmDeletion = action;
  }

  loadingDelete(isLoading, content) {
    if (isLoading) {
        this._submitBtn.textContent = "Удаление..."; 
    } else {
        this._submitBtn.textContent = content;
    }
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmDeletion();
    });
  }
}