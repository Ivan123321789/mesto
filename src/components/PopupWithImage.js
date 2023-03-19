import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupSubtitle = this._popup.querySelector('.popup__subtitle-image');
    }

    open(name, link) {
        console.log(name);
        console.log(link);
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupSubtitle.textContent = name;
    
        super.open();
    }
}
