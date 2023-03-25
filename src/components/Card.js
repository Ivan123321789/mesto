export default class Card {
    constructor(cardTemplateSelector, {data, userId, handleOpenPopupImage, handleLikeClick, handleDeleteClick}) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        // this._ownerId = data.owner._id;
        this._myId = userId;
        this._likes = data.likes;
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

    hiddenTrash() {
        this.myCard = this._myId === this._data.owner._id;
        if (!this.myCard) {
            this._deleteButton.classList.toggle('elements__delete_hidden') 
        }
    }

    isLike() {
        return this._likeButton.classList.contains('elements__like_active');
    }

    like(count) {
        this._likes = this._data.likes;
        this._likeButton.classList.toggle('elements__like_active');
        this._counterLike.textContent = count;
    }

    delete() {
        this._element.remove();
        this._element = null; 
    } 
    
    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._cardImage.addEventListener('click', () => this._handleOpenPopupImage(this._name, this._link));
    }

    getCardId() {
        return this._cardId;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.elements__like');
        this._deleteButton = this._element.querySelector('.elements__delete')
        this._cardTitle = this._element.querySelector('.elements__text');
        this._cardImage = this._element.querySelector('.elements__image');
        this._counterLike = this._element.querySelector('.elements__like-counter');
        this.hiddenTrash();
        this._counterLike.textContent = this._likes.length;
        this._likes.forEach((e) => {
            if (e._id === this._myId) {
              this._likeButton.classList.add('elements__like_active');
            }
          })
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._setEventListeners();
        return this._element;
    }
}