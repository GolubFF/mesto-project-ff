import './pages/index.css'

import {openModal, closeModal, overlayCloseModal} from "./scripts/components/modal";
import * as card from "./scripts/components/card"
import {getUser, getCardArr, patchUserApi, addCardApi, changeAvatarApi} from "./scripts/components/api";
import {setEventListeners, clearValidation, toggleButtonState} from "./scripts/components/validation";


const avatarBlock = document.querySelector('.profile__image')
const editAvatarPopUp = document.querySelector('.popup_change-avatar')
const formAvatarEdit = editAvatarPopUp.querySelector('.popup__form')
const formAvatarEditField = formAvatarEdit.elements
const formEditAvatar = editAvatarPopUp.querySelector('.popup__form')
const btnAvatarPopUpClose = editAvatarPopUp.querySelector('.popup__close')
const btnSaveAvatarPopUp = editAvatarPopUp.querySelector('.popup__button')


const cardList = document.querySelector('.places__list');
const autor = document.querySelector('.profile__title')
const profile_description = document.querySelector('.profile__description')
const profileEditButton = document.querySelector('.profile__edit-button')
const addNewCardButton = document.querySelector('.profile__add-button')

const editProfilePopUp = document.querySelector('.popup_type_edit')
const formEditProfile = editProfilePopUp.querySelector('.popup__form')
const formEditProfileFields = formEditProfile.elements
const btnCloseEditProfilePopUp = editProfilePopUp.querySelector('.popup__close')
const btnSendProfileData = editProfilePopUp.querySelector('.popup__button')

const popUpAddCard = document.querySelector('.popup_type_new-card')
const formAddCard = popUpAddCard.querySelector('.popup__form')
const btnCloseAddNewCardPopUP = popUpAddCard.querySelector('.popup__close')
const btnSendNewCard = popUpAddCard.querySelector('.popup__button')

const popupTypeImage = document.querySelector('.popup_type_image')
const btnClosePopUpTypeImage = popupTypeImage.querySelector('.popup__close')
const popUpImage = popupTypeImage.querySelector('.popup__image')
const popUpImageTitle = popupTypeImage.querySelector('.popup__caption')

const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanErrorClass: 'form__input-error_active'
}



initial();

function initial() {

  Promise.all([getUser(), getCardArr()])
    .then(([user, initialCardList]) => {
      const userId = user._id

      initialUser(user)
      createCardList(initialCardList, userId)

      const popUpArr = document.querySelectorAll('.popup')
      popUpArr.forEach(el => el.classList.add('popup_is-animated'))

      avatarBlock.addEventListener('click', clickEditAvatar)
      btnAvatarPopUpClose.addEventListener('click', () => closeModal(editAvatarPopUp))
      formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit)
      editAvatarPopUp.addEventListener('click', overlayCloseModal)

      profileEditButton.addEventListener('click', clickProfileEditBtn);
      formEditProfile.addEventListener('submit', handleProfileFormSubmit)
      btnCloseEditProfilePopUp.addEventListener('click', () => closeModal(editProfilePopUp))
      editProfilePopUp.addEventListener('click', overlayCloseModal)


      addNewCardButton.addEventListener('click', clickAddNewCard)
      formAddCard.addEventListener('submit', (evt) => handleAddNewCard(evt, userId))
      btnCloseAddNewCardPopUP.addEventListener('click', () => closeModal(popUpAddCard))
      popUpAddCard.addEventListener('click', overlayCloseModal)

      btnClosePopUpTypeImage.addEventListener('click', () => closeModal(popupTypeImage))
      popupTypeImage.addEventListener('click', overlayCloseModal)

      enableValidation()

  })


}
function createCardList(dataArr, userId) {
  dataArr.forEach(item => {
    const listElement = card.createCard(item, card.deleteCard, card.likeCard, openModalImage, userId)
    cardList.append(listElement)
  })
}

function clickEditAvatar() {
  clearValidation(editAvatarPopUp, dataValidation)
  toggleButtonState(editAvatarPopUp, dataValidation)
  openModal(editAvatarPopUp)
}
function clickProfileEditBtn() {
  clearValidation(editProfilePopUp, dataValidation)
  formEditProfileFields.name.value = autor.textContent
  formEditProfileFields.description.value = profile_description.textContent
  toggleButtonState(editProfilePopUp, dataValidation)
  openModal(editProfilePopUp);
}

function clickAddNewCard() {
  clearValidation(popUpAddCard, dataValidation)
  toggleButtonState(popUpAddCard, dataValidation)
  openModal(popUpAddCard)
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  btnSaveAvatarPopUp.textContent = 'Сохранение...'
  avatarImagePlace(formAvatarEditField.url.value)
  changeAvatarApi(formAvatarEditField.url.value)
    .then(response => {
      if(response) {
        btnSaveAvatarPopUp.textContent = 'Сохранить'
        closeModal(editAvatarPopUp)
        formAvatarEditField.url.value = ''
      }
    })

}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  btnSendProfileData.textContent = 'Сохранение...'
  patchUserApi(formEditProfileFields.name.value, formEditProfileFields.description.value)
    .then(response => {
      if(response.flag) {
        console.log(response.user)
        autor.textContent = response.user.name
        profile_description.textContent = response.user.about
        closeModal(editProfilePopUp)
        btnSendProfileData.textContent = 'Сохранить'
      }
    })

}
function handleAddNewCard(evt, userId) {
  console.log(userId)
  evt.preventDefault()
  const placeNameFields = formAddCard.elements
  const newCardData = {
    name: placeNameFields['place-name'].value,
    link: placeNameFields['link'].value
  }
  btnSendNewCard.textContent = 'Сохранение...'
  addCardApi(newCardData)
    .then(response => {
        if(response.flag) {
          btnSendNewCard.textContent = 'Сохранить'
          const newCard = card.createCard(response.card, card.deleteCard, card.likeCard, openModalImage, userId)
          cardList.prepend(newCard)
          placeNameFields['place-name'].value = '';
          placeNameFields['link'].value = '';
          closeModal(popUpAddCard)
        }
      })


}
function openModalImage(data) {
  popUpImage.src = data.link
  popUpImage.alt = data.name
  popUpImageTitle.textContent = data.name
  openModal(popupTypeImage)
}
function avatarImagePlace(url) {
  avatarBlock.style.backgroundImage = `url('${url}')`;
}

function initialUser(user) {
  avatarImagePlace(user.avatar)
  autor.textContent = user.name
  profile_description.textContent = user.about
}


function enableValidation() {
  const formList = Array.from(document.querySelectorAll(dataValidation.formSelector))
  formList.forEach(form => setEventListeners(form, dataValidation))
}




