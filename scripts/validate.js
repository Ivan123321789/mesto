const setting = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

const showInputError = (formElement, inputElement, configuration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configuration.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(configuration.errorClass);
};

const hideInputError = (formElement, inputElement, configuration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configuration.inputErrorClass);
  errorElement.classList.remove(configuration.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, configuration) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement,inputElement,configuration);
  } else {
    hideInputError(formElement, inputElement, configuration);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, configuration) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configuration.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(configuration.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const resetValidate = (formElement) => {
  formElement.reset();

  const formInputsList = Array.from(formElement.querySelectorAll('.form__field'));
  formInputsList.forEach((input) => {
    input.classList.remove('popup__field_type_error');
  })

  const formSpansList = Array.from(formElement.querySelectorAll('.popup__field-error'));
  formSpansList.forEach((span) => {
    span.textContent = ''
  })
};

const setEventListeners = (formElement, configuration) => {
  const inputList = Array.from(
      formElement.querySelectorAll(configuration.inputSelector)
  );

  const buttonElement = formElement.querySelector(configuration.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, configuration);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configuration);
      toggleButtonState(inputList, buttonElement, configuration);
    });
  });
};

const enableValidation = ({formSelector, ...restConfig}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, restConfig);
  });
};

enableValidation(setting);