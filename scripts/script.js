// Кнопки

const profile = document.querySelector('.profile');
const popupProfileOpenButton = profile.querySelector('.profile__edit-button');
const popupCardOpenButton = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupEditClose = popupEdit.querySelector('.popup__close-icon');
const popupAddClose = popupAdd.querySelector('.popup__close-icon');
const popupImageClose = popupImage.querySelector('.popup__close-icon');


// Формы

const formProfile = popupEdit.querySelector('.form');
const userNameInput = formProfile.querySelector('#user-name');
const userJobInput = formProfile.querySelector('#user-job');

const formCard = popupAdd.querySelector('.form');
const placeNameInput = formCard.querySelector('#place-name');
const placeImgInput = formCard.querySelector('#place-img');
const formCardSubmit = formCard.querySelector('.form__submit-button')
// Профиль

const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const inputList = Array.from(
  formCard.querySelectorAll(setting.inputSelector)
);
// Карточки

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

// Открытая картинка

const imageElement = popupImage.querySelector('.opened-image__image');
const imageCaption = popupImage.querySelector('.opened-image__caption');

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}
// Открытие и закрытие модальных окон

function openPopup(popup) {
  popup.classList.add('popup_animated');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  document.addEventListener('mouseup', closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  document.removeEventListener('mouseup', closePopupByOverlay);
}


// Открытие и закрытие модального окна с картинкой

function handlePreviewImage(popupImageData) {
  openPopup(popupImage);

  imageElement.src = popupImageData.link;
  imageElement.alt = popupImageData.name;
  imageCaption.textContent = popupImageData.name;
}

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
});


// Функции создания и добавления карточек

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const likeButton = cardElement.querySelector('.element__like-icon');
  const trashButton = cardElement.querySelector('.element__trash-icon');

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  elementTitle.textContent = cardData.name;

  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-icon_active');
  });

  trashButton.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  elementImage.addEventListener('click', evt => {
    const targetImage = evt.target;

    const cardData = {
      name: targetImage.alt,
      link: targetImage.src
    };

    handlePreviewImage(cardData);
  });

  return cardElement;
}

function addCard(cardData, cardContainer, newCard) {
  const card = createCard(cardData);

  if (newCard) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}


// Карточки

initialCards.forEach(item => {
  addCard(item, cardsList, false);
});


// Модальное окно редактирования профиля

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupEdit);

  userNameInput.value = profileTitle.textContent;
  userJobInput.value = profileSubtitle.textContent;
});

popupEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
  resetValidate(formProfile);
});

// Отправка формы редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = userJobInput.value;

  closePopup(popupEdit);

  resetValidate(formProfile);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);


// Модальное окно добавления карточки

popupCardOpenButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddClose.addEventListener('click', () => {
  closePopup(popupAdd);
  resetValidate(formCard);
});

// Отправка формы добавления карточки

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard({
    name: placeNameInput.value,
    link: placeImgInput.value
  }, cardsList, true);

  closePopup(popupAdd);
  resetValidate(formCard);
  toggleButtonState(inputList, formCardSubmit, setting);
}

formCard.addEventListener('submit', handleCardFormSubmit);


