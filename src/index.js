import './pages/index.css'
import avatarImagePlace from "./scripts/components/avatar";
import {openModal, closeModal} from "./scripts/components/modal";
import api from "./scripts/components/api"
import * as card from "./scripts/components/card"

const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button')
const autor = document.querySelector('.profile__title')
const profile_description = document.querySelector('.profile__description')
const editProfilePopUp = document.querySelector('.popup_type_edit')
const formEditProfile = editProfilePopUp.querySelector('.popup__form')
const formEditProfileFields = formEditProfile.elements
const addNewCardButton = document.querySelector('.profile__add-button')
const popUpAddCard = document.querySelector('.popup_type_new-card')
const formAddCard = popUpAddCard.querySelector('.popup__form')
const popUpEditProfile = document.querySelector('.popup_type_edit')

initial();


function initial() {
  const initialCardsArr = api()
  avatarImagePlace();
  createCardList(initialCardsArr)
  profileEditButton.addEventListener('click', clickProfileEditBtn);
  addNewCardButton.addEventListener('click', () => openModal(popUpAddCard))
  formAddCard.addEventListener('submit', handleAddNewCard)
}
function createCardList(dataArr) {
  dataArr.forEach(item => {
    const listElement = card.createCard(item, card.deleteCard, card.likeCard, card.popUpCard)
    cardList.append(listElement)
  })
}
function clickProfileEditBtn() {
  formEditProfileFields.name.value = autor.innerHTML
  formEditProfileFields.description.value = profile_description.innerHTML
  openModal(popUpEditProfile)
  formEditProfile.addEventListener('submit', handleProfileFormSubmit);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = formEditProfileFields.name.value
  profile_description.textContent = formEditProfileFields.description.value
  closeModal(popUpEditProfile)
}
function handleAddNewCard(evt) {
  evt.preventDefault()
  const placeNameFields = formAddCard.elements
  const newCardData = {
    name: placeNameFields[0].value,
    link: placeNameFields[1].value
  }
  const newCard = card.createCard(newCardData, card.deleteCard, card.likeCard, card.popUpCard )
  cardList.insertBefore(newCard, cardList.firstChild)
  placeNameFields[0].value = '';
  placeNameFields[1].value = '';
  closeModal(popUpAddCard)
}
