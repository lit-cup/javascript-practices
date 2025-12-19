class toolView {
  _inputEdit = document.querySelector('.edit__option');
  _inputDelAll = document.querySelector('.edit__delAll');
  _inputSort = document.querySelector('.edit__sort');
  _inputShowAll = document.querySelector('.edit__showAll');
  _workoutContainer = document.querySelector('.work');
  #isEdited = false;
  ICONS = { edit: 'img/edit.png', cancel: 'img/cancel.png' };

  addHandlerEditClick(_handleEditClick) {
    this._inputEdit.addEventListener('click', function (e) {
      _handleEditClick();
    });
  }

  addHandlerSortClick(_handleSortClick) {
    this._inputSort.addEventListener('click', function (e) {
      _handleSortClick();
    });
  }

  addHandlerShowAllWorkout(_handleShowAllWorkout) {
    this._inputShowAll.addEventListener('click', function (e) {
      _handleShowAllWorkout();
    });
  }

  addHandlerDeleteAll(_handleDeleteAll) {
    this._inputDelAll.addEventListener('click', function (e) {
      _handleDeleteAll();
    });
  }

  addHandlerContainerClick(_handleDeleteWorkout, _handleWorkoutClick) {
    this._workoutContainer.addEventListener('click', e => {
      const workoutEl = e.target.closest('.workout');
      if (!workoutEl) return;
      if (e.target.classList.contains('edit__delete')) {
        _handleDeleteWorkout(workoutEl.dataset.id, e);
        return;
      }
      _handleWorkoutClick(workoutEl.dataset.id);
    });
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
