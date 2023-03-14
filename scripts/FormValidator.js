export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.buttonSelector;
        this._inactiveButtonClass = config.buttonDisabledClass;
        this._inputErrorClass = config.errorClass;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._inputErrorClass}_active`);
    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(`${this._inputErrorClass}_active`);
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _toggleButtonState() {
        const isFormValid = this._formElement.checkValidity();
        this._buttonElement.disabled = !isFormValid;
        this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
    }
    _setEventListeners() {
       
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                inputList.forEach((inputElement) => {
                    this._hideInputError(inputElement);
                });
                this._toggleButtonState();
            }, 0);
        });
    }

    resetValidation() {
        this._toggleButtonState(); 
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement) 
        });
  
      } 

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
       
    }
}  