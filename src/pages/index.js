import "./index.css";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards} from '../utils/initialCards.js';
import {buttonEdit, buttonAdd, buttonAvatar, formProfile, formCard, formAvatar, nameInput, jobInput, avatarInput, formValidationConfig} from '../utils/constans.js';
import {Api} from '../components/Api.js';

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "8b330631-1fca-4744-b015-50bbb705af05",
    "Content-Type": "application/json",
  }
})

let userId = "";

api.getPromiseAll()                               // Запрос на сервер для получения необходимой информации
  .then(([serverCards, userData]) => {
    console.log(serverCards);
    console.log(userData);
    userProfile.setUserInfo(userData);            //  Получение информации о пользователе с сервера
    userProfile.setUserAvatar(userData);          //  Получение аватара с сервера 
    userId = userData._id;
    elementsContainer.renderItems(serverCards);   //  Вызов метода отрисовки массива карточек c сервера
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})

const formValidatorProfile = new FormValidator(formValidationConfig, formProfile); // Экземпляр валидации формы профиля
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(formValidationConfig, formCard); // Экземпляр валидации формы добавления карточки
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(formValidationConfig, formAvatar); // Экземпляр валидации формы смены аватара
formValidatorAvatar.enableValidation();

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

// elementsContainer.renderItems();  //  Вызов метода отрисовки массива карточек

const handleFormSubmitCard = (data) => {   // Колбэк, связывающий классы Секции, Карты и Попапа добавления новой карты
  api.postCard(data)
  .then((res) => {
    const newCardElement = createCard(data);
    elementsContainer.addItemPrepend(newCardElement);
    popupAddCard.close();
  })
  .catch(err => console.log(err))
}
const popupAddCard = new PopupWithForm({    // Создание экземпляра Попапа добавления новой карты
  popupSelector: '.popup_add-card', 
  callbackFormSubmit: handleFormSubmitCard}); 

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {   //  Слушатель события нажатия на кнопку открытия Попапа добавления новой карты 
  formCard.reset();
  formValidatorCard.resetValidation();
  popupAddCard.open();
});

const userProfile = new UserInfo({     //  Создание объекта с данными пользователя
    userNameSelector: '.profile__title', 
    userAboutSelector: '.profile__description',
    userAvatarSelector: '.profile__photo'});

const handleFormSubmitProfile = (data) => {   // Колбэк, связывающий классы ЮзерИнфо и Попапа редактирования профиля
  api.changeProfile(data)
    .then((res) => {
      userProfile.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
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

const handleFormSubmitAvatar = (data) => {
  api.changeAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res);
      popupChangeAvatar.close();
    })
    .catch(err => console.log(err))
}
const popupChangeAvatar = new PopupWithForm({    // Создание экземпляра Попапа изменения аватара
  popupSelector: '.popup_change-avatar',
  callbackFormSubmit: handleFormSubmitAvatar
});
popupChangeAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
  const dataUserProfile = userProfile.getUserInfo();
  // avatarInput.value = dataUserProfile.avatar;
  formValidatorAvatar.resetValidation();
  popupChangeAvatar.open();
});