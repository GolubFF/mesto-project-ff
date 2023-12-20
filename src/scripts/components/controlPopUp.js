function openPopUp(selector) {
  const popUpWindow = document.querySelector(selector)
  const closeButton = popUpWindow.querySelector('.popup__close')
  popUpWindow.classList.add('popup_is-opened')

  document.addEventListener('keydown', evt => esc(evt, selector))

  popUpWindow.addEventListener('click', (evt) => overlay(evt, selector))

  closeButton.addEventListener('click', () => {
    closePopUp(selector);
    closeButton.removeEventListener('click', closePopUp)
  })
}

function closePopUp(selector){
  const popUpWindow = document.querySelector(selector)
  popUpWindow.classList.add('popup_is-animated')
  popUpWindow.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', esc)
}

function esc(evt, selector) {
  if(evt.key === "Escape") {
    closePopUp(selector)
    document.removeEventListener('keydown', esc)
  }
}

function overlay(evt, selector) {
  if(evt.srcElement.classList.contains('popup')) {
    closePopUp(selector)
  }
}



export {openPopUp, closePopUp}
