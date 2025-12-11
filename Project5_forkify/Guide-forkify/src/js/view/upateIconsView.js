import iconPath from '../../img/icons.svg?url';

class UpdateIconsView {

    _icons = document.querySelectorAll('.nav__icon use');
    _iconType = '';

    constructor(){
        this._updateIcons();
    }
    _updateIcons(){
        if(!this._icons.length) return;
        this._icons.forEach(icon => {
            const href = icon.getAttribute('href');
            const indexHash = href.indexOf('#');
            if(indexHash === -1) return;

            this._iconType = href.slice(indexHash);
            icon.setAttribute('href', iconPath + this._iconType);
        });
    }
}

export default new UpdateIconsView();