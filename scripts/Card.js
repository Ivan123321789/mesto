import openPopup from './scripts.js'; 

export default class Card {
    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplateSelector)
            .content.querySelector('.elements__element')
            .cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._element
            .querySelector('.elements__delete')
            .addEventListener('click', () => this._handleDeleteClick());
        this._element
            .querySelector('.elements__like')
            .addEventListener('click', () => this._handleLikeClick());
        this._element
            .querySelector('.elements__image')
            .addEventListener('click', () => this._handleImageClick());
    }
    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }
    _handleLikeClick() {
        this._element
            .querySelector('.elements__like')
            .classList.toggle('elements__like_active');
    }
    _handleImageClick() {
        //console.log('Open Image Popup!');
        const showImage = document.querySelector('#showImage');
        const popupImage = showImage.querySelector('.popup__image');
        const popupSubtitle = showImage.querySelector('.popup__subtitle-image');
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupSubtitle.textContent = this._name;
        openPopup(showImage);
    }
    generateCard() {
        this._element = this._getTemplate();
        const cardTitle = this._element.querySelector('.elements__text');
        const cardImage = this._element.querySelector('.elements__image');
        cardTitle.textContent = this._name;
        cardImage.alt = this._name;
        cardImage.src = this._link;
        this._setEventListeners();
        return this._element;
    }
}