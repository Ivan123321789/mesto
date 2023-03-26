import "./index.css";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
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

const userProfile = new UserInfo({                //  Создание объекта с данными пользователя
  userNameSelector: '.profile__title', 
  userAboutSelector: '.profile__description',
  userAvatarSelector: '.profile__photo'});

let userId = "";

const elementsContainer = new Section({   
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    elementsContainer.addItemAppend(cardElement);
  }
}, ".elements");

api.getPromiseAll()                               // Запрос на сервер для получения необходимой информации
  .then(([serverCards, userData]) => {
    console.log(serverCards);
    console.log(userData);
    userProfile.setUserInfo(userData);            //  Получение информации о пользователе с сервера
    userProfile.setUserAvatar(userData);          //  Получение аватара с сервера 
    userId = userData._id;
    elementsContainer.renderItems(serverCards);   //  Вызов метода отрисовки массива карточек c сервера
  })
  .catch(err => console.log(err))

const formValidatorProfile = new FormValidator(formValidationConfig, formProfile); // Экземпляр валидации формы профиля
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(formValidationConfig, formCard); // Экземпляр валидации формы добавления карточки
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(formValidationConfig, formAvatar); // Экземпляр валидации формы смены аватара
formValidatorAvatar.enableValidation();

const popupShowImage = new PopupWithImage('.popup_open-image'); // Создание экземпляра класса папапа просмотра картинки
popupShowImage.setEventListeners();

const popupConfirmDelete = new PopupWithConfirmation('.popup_delete-card');   // Создание экземпляра класса папапа подтверждения удаления
popupConfirmDelete.setEventListeners();

function createCard(item) {                     // Создание экземпляра карточки
  const card = new Card('.template-card', {
    data: item, 
    userId: userId, 
    handleOpenPopupImage: (name, link) => {  
      popupShowImage.open(name, link);
    }, 
    handleLikeClick: () => {
      if (!card.isLike()) {
        api.addLike(card.getCardId())
          .then(res => {
          card.like(res.likes.length)
          })
          .catch(err => console.log(err))
      } else {
        api.deleteLike(card.getCardId())
          .then(res => {
            card.like(res.likes.length)
          })
          .catch(err => console.log(err))
      }
    }, 
    handleDeleteClick: () => {
      popupConfirmDelete.open();
      popupConfirmDelete.setSubmitDelete(() => {
        popupConfirmDelete.loadingDelete(true);
        api.deleteCardApi(card.getCardId())
          .then(() => {
            card.delete();
            popupConfirmDelete.close();
          })
          .catch(err => console.log(err))
          .finally(() => {popupConfirmDelete.loadingDelete(false)})
      });
    }});
  return card.generateCard();
}

const popupAddCard = new PopupWithForm({    // Создание экземпляра Попапа добавления новой карты
  popupSelector: '.popup_add-card', 
  callbackFormSubmit: (data) => { 
    popupAddCard.loading(true);
    api.postCard(data)
    .then((res) => {
      const newCardElement = createCard(res);
      elementsContainer.addItemPrepend(newCardElement);
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {popupAddCard.loading(false, "Создать")})
  }}); 
popupAddCard.setEventListeners();
buttonAdd.addEventListener('click', () => {   
  formValidatorCard.resetValidation();
  popupAddCard.open();
});

const popupEditProfile = new PopupWithForm({   //  Создание экземпляра Попапа редактирования профиля
  popupSelector: '.popup_edit-profile', 
  callbackFormSubmit: (data) => { 
    popupEditProfile.loading(true) 
    api.changeProfile(data)
      .then((res) => {
        userProfile.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => {popupEditProfile.loading(false, "Сохранить")})
  }});
popupEditProfile.setEventListeners();
buttonEdit.addEventListener('click', () => {     
  const dataUserProfile = userProfile.getUserInfo();
  nameInput.value = dataUserProfile.name;
  jobInput.value = dataUserProfile.about;
  formValidatorProfile.resetValidation();
  popupEditProfile.open();  
});

const popupChangeAvatar = new PopupWithForm({    // Создание экземпляра Попапа изменения аватара
  popupSelector: '.popup_change-avatar',
  callbackFormSubmit: (data) => {
    popupChangeAvatar.loading(true);
    api.changeAvatar(data)
      .then((res) => {
        userProfile.setUserAvatar(res);
        popupChangeAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {popupChangeAvatar.loading(false, "Сохранить")})
  }
});
popupChangeAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
  formValidatorAvatar.resetValidation();
  popupChangeAvatar.open();
});