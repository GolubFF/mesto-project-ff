function openModal(element) {

  const closeButton = element.querySelector('.popup__close')
  element.classList.add('popup_is-opened')

  document.addEventListener('keydown', closeByEsc)
  element.addEventListener('click', overlay)
  closeButton.addEventListener('click', () => closeModal(element))
}

function closeModal(element){
  element.classList.add('popup_is-animated')
  element.classList.remove('popup_is-opened')
  element.removeEventListener('keydown', closeByEsc)
}

function closeByEsc(evt) {
  if(evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function overlay(evt) {
  const openedPopup = evt.currentTarget
  if(openedPopup.classList.contains('popup')) {
    closeModal(openedPopup)
  }
}

export {openModal, closeModal}
