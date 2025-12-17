class toolView {
  _inputEdit = document.querySelector('.edit__option');
  _spanEdit = document.querySelector('.desc__edit');
  _inputDelAll = document.querySelector('.edit__delAll');
  _spanDelAll = document.querySelector('.desc__delAll');
  _inputSort = document.querySelector('.edit__sort');
  _spanSort = document.querySelector('.desc__sort');
  _inputShowAll = document.querySelector('.edit__showAll');
  _spanShowAll = document.querySelector('.desc__showAll');
  _spanDelete = document.querySelector('.desc__delete');
  #seleted = true;
  ICONS = { edit: 'img/edit.png', cancel: 'img/cancel.png' };
  addHandlerEditClick(_handleEditClick) {
    this._inputEdit.addEventListener('click', function (e) {
      _handleEditClick();
    });
  }
  addHandlerDeleteAll(_handleDeleteAll) {
    this._inputDelAll.addEventListener('click', function (e) {
      _handleDeleteAll();
    });
  }
  //   iconSwitcher(workouts) {
  //     if (this.#seleted && workouts.length > 0) {
  //       this.setEditOpen();
  //     } else {
  //       this.setEditClose();
  //     }
  //   }
  setEditOpen() {
    this._inputEdit.src = this.ICONS.cancel;
    this._inputDelAll.style.display = 'block';
    // document.querySelectorAll('.edit__delete').forEach(items => {
    //   items.style.opacity = 1;
    //   items.addEventListener('mouseover', () => this.showTip(this.spanDelete));
    //   items.addEventListener('mouseout', () => this.hideTip(this.spanDelete));
    // });
    // check seleted
    this.#seleted = false;
  }
  setEditClose() {
    this._inputEdit.src = this.ICONS.edit;
    this._inputDelAll.style.display = 'none';
    // document.querySelectorAll('.edit__delete').forEach(items => {
    //   items.style.opacity = 0;
    //   items.addEventListener('mouseover', () => this.hideTip(this.spanDelete));
    //   items.addEventListener('mouseout', () => this.hideTip(this.spanDelete));
    // });
    // check seleted
    this.#seleted = true;
  }
  getSeleted() {
    return this.#seleted;
  }
  //   showTip(type) {
  //     type.style.display = 'block';
  //   }
  //   hideTip(type) {
  //     type.style.display = 'none';
  //   }
}

export default new toolView();
