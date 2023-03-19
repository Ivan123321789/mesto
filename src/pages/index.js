import "./index.css";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards} from '../utils/initialCards.js';
import {buttonEdit, buttonAdd, formProfile, formCard, nameInput, jobInput, formValidationConfig} from '../utils/constans.js';

const formValidatorProfile = new FormValidator(formValidationConfig, formProfile); // Экземпляр валидации формы профиля
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(formValidationConfig, formCard); // Экземпляр валидации формы добавления карточки
formValidatorCard.enableValidation();

const popupShowImage = new PopupWithImage('.popup_open-image'); // Создание экземпляра класса папапа просмотра картинки
popupShowImage.setEventListeners();

const handleOpenPopupImage = (name, link) => {  //Колбэк, связывающий классы Карточки и Просмотра изображения
  popupShowImage.open(name, link);
}

function createCard(data) { 
  console.log(data);   // Создание экземпляра карточки
  const card = new Card(data, '.template-card', handleOpenPopupImage);
  return card.generateCard();
}

const elementsContainer = new Section({   
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    elementsContainer.addItemAppend(cardElement);
  }
}, ".elements");

elementsContainer.renderItems();  //  Вызов метода отрисовки массива карточек

const callbackFormSubmitCard = (data) => {   // Колбэк, связывающий классы Секции, Карты и Попапа добавления новой карты
  const newCardElement = createCard(data);
  elementsContainer.addItemPrepend(newCardElement);
  popupAddCard.close();
}
const popupAddCard = new PopupWithForm({    // Создание экземпляра Попапа добавления новой карты
  popupSelector: '.popup_add-card', 
  callbackFormSubmit: callbackFormSubmitCard}); 

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {   //  Слушатель события нажатия на кнопку открытия Попапа добавления новой карты 
  formCard.reset();
  formValidatorCard.resetValidation();
  popupAddCard.open();
});

const userProfile = new UserInfo(     //  Сщздание объекта с данными пользователя
  {userNameSelector:'.profile__title', 
   userAboutSelector:'.profile__description'});

const handleFormSubmitProfile = (data) => {   // Колбэк, связывающий классы ЮзерИнфо и Попапа редактирования профиля
  userProfile.setUserInfo(data);
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm({   //  Создание экземпляра Попапа редактирования профиля
  popupSelector: '.popup_edit-profile', 
  callbackFormSubmit: handleFormSubmitProfile});
popupEditProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {     //  Слушатель события нажатия на кнопку открытия Попапа редактирования
  const dataUserProfile = userProfile.getUserInfo();
  nameInput.value = dataUserProfile.name;
  jobInput.value = dataUserProfile.about;
  formValidatorProfile.resetValidation();
  popupEditProfile.open();  
});
