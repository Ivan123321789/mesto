export default class Card {
  constructor({data, handleOpenPopupImage, handleLikeClick,  
      handleDeleteClick, currentUserId}, cardTemplateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardId = data._id;
      this._ownerId = data.owner._id;
      this._myId = currentUserId;
      this._countLike = data.likes.length;
      this._cardTemplateSelector = cardTemplateSelector;
      this._handleOpenPopupImage = handleOpenPopupImage;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteClick = handleDeleteClick;
  }
  _getTemplate() {
      const cardElement = document
          .querySelector(this._cardTemplateSelector)
          .content.querySelector('.elements__element')
          .cloneNode(true);
      return cardElement;
  }

  getCardId() {
      return this._cardId;
  }

  isLiked() {
      return this._likeButton.classList.contains("elements__like_active");
  }

  likeCard() {
      this._likeButton.classList.toggle("elements__like_active");
      this._likeCounter.textContent = this._data.likes.length;
  };
 
  _handleDeleteClick() {
      this._element.remove();
      this._element = null;
  }
  _handleLikeClick() {
      this._likeButton.classList.toggle('elements__like_active');
  }
 
  _setEventListeners() {
      this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
      this._likeButton.addEventListener('click', () => this._handleLikeClick());
      this._cardImage.addEventListener('click', () => this._handleOpenPopupImage(this._name, this._link));
  }

  removeCard() {
      console.log("Я работаю");
      this._element.remove();
      this._element = null;
  };


  generateCard() {
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.elements__like');
      this._deleteButton = this._element.querySelector('.elements__delete')
      this._cardTitle = this._element.querySelector('.elements__text');
      this._cardImage = this._element.querySelector('.elements__image');
      this._cardTitle.textContent = this._name;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;
      this._setEventListeners();
      return this._element;
  }
}