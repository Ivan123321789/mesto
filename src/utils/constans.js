const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка открытия окна добавления карточки
const formProfile = document.querySelector('.popup__edit-form'); // Форма редактирования профиля в DOM
const formCard = document.querySelector('.popup__add-form');
const nameInput = document.querySelector('#name'); // Поле имени в модальном окне
const jobInput = document.querySelector('#about'); // Поле описания в модальном окне

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button-submit',
  buttonDisabledClass: 'popup__button-submit_disabled'
};

export {buttonEdit, buttonAdd, formProfile, formCard, nameInput, jobInput, formValidationConfig}