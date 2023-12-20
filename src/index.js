import './pages/index.css'

import avatarImagePlace from "./scripts/components/avatar";
import {openPopUp, closePopUp} from "./scripts/components/controlPopUp";
import {profileEditButton,
        autor,
        profile_description,
        formEditProfile,
        formEditProfileFields,
        addNewCardButton,
        formAddCard} from "./scripts/utils/constants";

import makeCardList from "./scripts/components/makeCardList";
import api from "./scripts/components/api"


const initialCardsArr = api()
avatarImagePlace();
makeCardList(initialCardsArr);

profileEditButton.addEventListener('click', () => {
  formEditProfileFields.name.value = autor.innerHTML
  formEditProfileFields.description.value = profile_description.innerHTML
  openPopUp('.popup_type_edit')
})

formEditProfile.addEventListener('submit', handleFormSubmit);
addNewCardButton.addEventListener('click', () => openPopUp('.popup_type_new-card'))
formAddCard.addEventListener('submit', evt => {
  evt.preventDefault()
  const placeNameFields = formAddCard.elements
  const cardsArr = api(placeNameFields[0].value, placeNameFields[1].value )
  placeNameFields[0].value = '';
  placeNameFields[1].value = '';
  closePopUp('.popup_type_new-card')
  makeCardList(cardsArr);
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  autor.textContent = formEditProfileFields.name.value
  profile_description.textContent = formEditProfileFields.description.value
  closePopUp('.popup_type_edit')
}
