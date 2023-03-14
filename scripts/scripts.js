import Card from './Card.js';

/* Константы */
const buttonEdit = document.querySelector('.profile__edit-button'); // Кпопка редактирования профиля
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка открытия окна добавления карточки
const profilePopup = document.querySelector('.popup-edit'); // Модальное окно редактирования профиля
const formProfile = document.querySelector('.popup__edit-form'); // Форма редактирования профиля в DOM
const formCard = document.querySelector('.popup__add-form');
const popupAddCard = document.querySelector('.popup__add-card'); // Форма добавления карточки в DOM

const popupList = document.querySelectorAll('.popup'); // Массив попапов

const showImage = document.querySelector('.popup__open-image');
const popupImage = showImage.querySelector('.popup__image');
const popupSubtitle =  showImage.querySelector('.popup__subtitle-image');

const elementsContainer = document.querySelector(".elements"); // Секция с карточками
//const buttonAddCard = document.querySelector("#buttonCreate"); // Кнопка "Создать" в модальном окне добавления карточек
const placeName = document.querySelector("#placeName"); // Поле ввода с названием места новой карточки 
const imageLink = document.querySelector("#imageLink"); // Поле ввода ссылки на изображение новой карточки
//const templateCard = document.querySelector("#templateCard"); // Заготовка для вставки новой карточки

const nameElement = document.querySelector('.profile__title'); // Значение имени в HTML
const jobElement = document.querySelector('.profile__description'); // Значение описания в HTML

const nameInput = document.querySelector('#name'); // Поле имени в модальном окне
const jobInput = document.querySelector('#about'); // Поле описания в модальном окне

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button-submit',
  buttonDisabledClass: 'popup__button-submit_disabled'
};

addStartCards(initialCards); // Вызов функции добавления изначальных карточек

const formValidatorProfile = new FormValidator(formValidationConfig, formProfile);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(formValidationConfig, formCard);
formValidatorCard.enableValidation();

/* Функции */
function handleEscape(evt) { // Нажатие на клавишу esc
  if (evt.key === 'Escape') {
    popupList.forEach(el => {
      if (el.classList.contains('popup_opened')) {
        closePopup(el);
      }
    })
  }
}
  const openPopup = (element) => { // Функция добавления видимости модальному окну
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

function handleOpenPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupSubtitle.textContent = name;
  openPopup(showImage);
}

function closePopup(element) { // Функция удаления видимости модальному окну
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}
function openProfilePopup() { // Функция добавления класса "видимости" модальному окну редактирования профиля
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup(profilePopup);
}
function openAddForm() { // Функция добавления класса "видимости" модальному окну добавления карточки
  formCard.resetValidation();
  openPopup(popupAddCard);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(profilePopup);
}
function addCard(evt) { // Функция добавления новой карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = createCard(placeName.value, imageLink.value);
  elementsContainer.prepend(cardElement);
  evt.target.reset()
  closePopup(popupAddCard);
}
// function deleteElement(btn) { // Фукция удаления карточки
//   btn.closest(".elements__element").remove();
// }
// function toggleLike(card) { // Функция активации / деактивации кнопки like
//   card.classList.toggle("elements__like_active");
// }
// function showImagePopup(image) { // Функция показа выбранного изображения
//   popupImage.src = image.src;
//   popupImage.alt = image.alt;
//   popupSubtitle.textContent = image.alt;
//   openPopup(showImage);
// }
// function addStartCards(elements) { // Функция добавления изначальных карточек
//   elements.forEach(({ name, link }) => {
//     createStartCard(name, link);
//   })
// }
function addStartCards(element) {
  element.forEach(({ name, link }) => {
    //const card = new Card({name, link}, '#templateCard');
    //const cardElement = card.generateCard();
    elementsContainer.prepend(createCard(name, link));
  });
}
// function createStartCard(name, link) { // Функция добавления одной изначальной карточки
//   const cardElement = createCard(name, link);
//   elements.prepend(cardElement); // Добавление дублированной заготовки в начало секции
// }
function createCard(name, link) {
  const card = new Card({ name, link }, '.template-card', handleOpenPopupImage);
  return card.generateCard();
}

/* События */
buttonEdit.addEventListener('click', openProfilePopup); // Нажатие на кнопку редактирования
profileForm.addEventListener('submit', handleProfileFormSubmit); // Нажатие на кнопку "Сохранить"
buttonAdd.addEventListener('click', openAddForm); // Нажатие на кнопку добавления карточки
popupAddCard.addEventListener('submit', addCard); // Нажатие на кнопку "Создать"

popupList.forEach(function (el) {
  el.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup__content')) { // Закрытие попапа кликом на оверлей 
      closePopup(el);
    }
    if (evt.target.classList.contains('popup__close-icon')) { // Нажатие на любую из 3-х кнопок закрытия модального окна
      closePopup(el);
    }
  });
})