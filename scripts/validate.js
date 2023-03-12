import FormValidator from "./FormValidator.js";

const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClass: 'popup__input_type_error',
    buttonSelector: '.popup__button-submit',
    buttonDisabledClass: 'popup__button-submit_disabled'
};

const forms = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
forms.forEach((form) => {
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation();
});

// function disableSumbmit(evt) { // Отмена отправки формы
//     evt.preventDefault();
// };

// function enableValidate(config) {
//     const formList = Array.from(document.querySelectorAll(config.formSelector)); // Массив форм на странице

//     formList.forEach(function (form) {
//         form.addEventListener('submit', disableSumbmit);
//         form.addEventListener('input', function () {
//             toggleButton(form, config);
//         });

//         addInputListeners(form, config);
//         toggleButton(form, config);

//         form.addEventListener('reset', function() {
//             setTimeout(function() {
//                 toggleButton(form, config);
//             }, 0);
//         });
//     })
// }

// function handleFormInput(evt, config) {
//     const input = evt.target; // Узнаём, какое поле ввода сработало
//     const inputID = input.id; // ID поля ввода
//     const errorSpan = document.querySelector(`#${inputID}-error`);

//     if (input.validity.valid) {
//         input.classList.remove(config.errorClass);
//         errorSpan.textContent = '';
//     } else {
//         input.classList.add(config.errorClass);
//         errorSpan.textContent = input.validationMessage;
//     }
// };

// function toggleButton(form, config) {
//     const buttonSubmit = form.querySelector(config.buttonSelector);
//     const isFormValidity = form.checkValidity();

//     buttonSubmit.disabled = !isFormValidity;

//     buttonSubmit.classList.toggle(config.buttonDisabledClass, !isFormValidity);
// };

// function addInputListeners(form, config) {
//     const inputList = Array.from(form.querySelectorAll(config.inputSelector)); // Массив всех полей для формы

//     inputList.forEach(function (item) {
//         item.addEventListener('input', function (evt) {
//             handleFormInput(evt, config);
//         });
//     });
// };

// enableValidate(formValidationConfig);