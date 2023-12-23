function openModal(element) {
  element.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeByEsc)
}
function closeModal(element){
  element.classList.remove('popup_is-opened')
  element.removeEventListener('keydown', closeByEsc)
}
function closeByEsc(evt) {
  if(evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
function overlayCloseModal(evt) {
  const openedPopup = evt.target
  if(openedPopup.classList.contains('popup')) {
    closeModal(openedPopup)
  }
}

export {openModal, closeModal, overlayCloseModal}
