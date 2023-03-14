export default class Card {
    constructor(data, cardTemplateSelector, handleOpenPopupImage) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleOpenPopupImage = handleOpenPopupImage;
        
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplateSelector)
            .content.querySelector('.elements__element')
            .cloneNode(true);
        return cardElement;
    }
   
    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }
    _handleLikeClick() {
        this._likeButton.classList.toggle('elements__like_active');
    }
    //_handleImageClick() {
        //console.log('Open Image Popup!');
        
       // this._popupImage.src = this._link;
        //this._popupImage.alt = this._name;
       // this._popupSubtitle.textContent = this._name;
      //  openPopup(showImage);
    //}

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._cardImage.addEventListener('click', () => this._handleOpenPopupImage(this._name, this._link));
    }

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