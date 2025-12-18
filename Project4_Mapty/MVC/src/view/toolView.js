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
  _workoutContainer = document.querySelector('.work');
  #isEdited = false;
  ICONS = { edit: 'img/edit.png', cancel: 'img/cancel.png' };

  addHandlerEditClick(_handleEditClick) {
    this._inputEdit.addEventListener('click', function (e) {
      _handleEditClick();
    });
    // this._inputEdit.addEventListener('mouseover', showTip);
    // this._inputEdit.addEventListener('mouseout', hideTip);
  }
  addHandlerDeleteAll(_handleDeleteAll) {
    this._inputDelAll.addEventListener('click', function (e) {
      _handleDeleteAll();
    });
  }
  addHandlerShowAllWorkout(_handleShowAllWorkout) {
    this._inputShowAll.addEventListener('click', function (e) {
      _handleShowAllWorkout();
    });
  }
  addDeleteHoverHandler(showTip, hideTip) {
    // items.addEventListener('mouseover', showTip);
    // items.addEventListener('mouseout', hideTip);
  }
  toggleDeleteButtons() {
    this._workoutContainer.classList.toggle('edit-mode');
  }
  switchEditState(state) {
    this.#isEdited = state;
  }
  setEditOpen() {
    this._inputEdit.src = this.ICONS.cancel;
    this._inputDelAll.style.display = 'block';
    this.toggleDeleteButtons();
    // // set isEdit is false to switch
    this.#isEdited = true;
  }
  setEditClose() {
    this._inputEdit.src = this.ICONS.edit;
    this._inputDelAll.style.display = 'none';
    this.toggleDeleteButtons();
    this.#isEdited = false;
    // // set isEdit is false to keep it close
    // this.#isEdited = true;
  }
  getIsEdited() {
    return this.#isEdited;
  }
  showTip(type) {
    type.style.display = 'block';
  }
  hideTip(type) {
    type.style.display = 'none';
  }
}

export default new toolView();
