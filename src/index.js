import './pages/index.css'
import avatar from './images/avatar.jpg'
import {openModal, closeModal, overlayCloseModal} from "./scripts/components/modal";
import initialCards from "./scripts/utils/constants";
import * as card from "./scripts/components/card"

const urlAvatar = `url('${avatar}')`
const avatarBlock = document.querySelector('.profile__image')

const cardList = document.querySelector('.places__list');
const autor = document.querySelector('.profile__title')
const profile_description = document.querySelector('.profile__description')
const profileEditButton = document.querySelector('.profile__edit-button')
const addNewCardButton = document.querySelector('.profile__add-button')

const editProfilePopUp = document.querySelector('.popup_type_edit')
const formEditProfile = editProfilePopUp.querySelector('.popup__form')
const formEditProfileFields = formEditProfile.elements
const btnCloseEditProfilePopUp = editProfilePopUp.querySelector('.popup__close')

const popUpAddCard = document.querySelector('.popup_type_new-card')
const formAddCard = popUpAddCard.querySelector('.popup__form')
const btnCloseAddNewCardPopUP = popUpAddCard.querySelector('.popup__close')

const popupTypeImage = document.querySelector('.popup_type_image')
const btnClosePopUpTypeImage = popupTypeImage.querySelector('.popup__close')
const popUpImage = popupTypeImage.querySelector('.popup__image')
const popUpImageTitle = popupTypeImage.querySelector('.popup__caption')


initial();
function initial() {
  avatarImagePlace();
  createCardList(initialCards)

  const popUpArr = document.querySelectorAll('.popup')
  popUpArr.forEach(el => el.classList.add('popup_is-animated'))

  profileEditButton.addEventListener('click', clickProfileEditBtn);
  formEditProfile.addEventListener('submit', handleProfileFormSubmit)
  btnCloseEditProfilePopUp.addEventListener('click', () => closeModal(editProfilePopUp))
  editProfilePopUp.addEventListener('click', overlayCloseModal)

  addNewCardButton.addEventListener('click', () => openModal(popUpAddCard))
  formAddCard.addEventListener('submit', handleAddNewCard)
  btnCloseAddNewCardPopUP.addEventListener('click', () => closeModal(popUpAddCard))
  popUpAddCard.addEventListener('click', overlayCloseModal)

  btnClosePopUpTypeImage.addEventListener('click', () => closeModal(popupTypeImage))
  popupTypeImage.addEventListener('click', overlayCloseModal)
}
function createCardList(dataArr) {
  dataArr.forEach(item => {
    const listElement = card.createCard(item, card.deleteCard, card.likeCard, openModalImage)
    cardList.append(listElement)
  })
}
function clickProfileEditBtn() {
  formEditProfileFields.name.value = autor.textContent
  formEditProfileFields.description.value = profile_description.textContent
  openModal(editProfilePopUp);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = formEditProfileFields.name.value
  profile_description.textContent = formEditProfileFields.description.value
  closeModal(editProfilePopUp)
}
function handleAddNewCard(evt) {
  evt.preventDefault()
  const placeNameFields = formAddCard.elements
  const newCardData = {
    name: placeNameFields['place-name'].value,
    link: placeNameFields['link'].value
  }
  const newCard = card.createCard(newCardData, card.deleteCard, card.likeCard, openModalImage)
  cardList.prepend(newCard)
  placeNameFields['place-name'].value = '';
  placeNameFields['link'].value = '';
  closeModal(popUpAddCard)
}
function openModalImage(data) {
  popUpImage.src = data.link
  popUpImage.alt = data.name
  popUpImageTitle.textContent = data.name
  openModal(popupTypeImage)
}
function avatarImagePlace() {
  avatarBlock.style.backgroundImage = urlAvatar;
}
