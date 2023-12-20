
import {openPopUp} from "./controlPopUp";


export default function makeCardList(arr) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardList = document.querySelector('.places__list')
  cardList.innerHTML = ''
  arr.forEach(item => createCard(item, deleteCard, likeCard, popUpCard))

  function createCard(item, deleteCard, likeCard, popUpCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true)
    const buttonDelete = card.querySelector('.card__delete-button')
    const likeButton = card.querySelector('.card__like-button');
    const image = card.querySelector('img')


    card.id = item._id
    card.querySelector('.card__title').textContent = item.name
    card.querySelector('.card__image').src = item.link
    cardList.append(card)

    buttonDelete.addEventListener('click', deleteCard)
    likeButton.addEventListener('click', likeCard)
    image.addEventListener('click', popUpCard)
  }
}

  function deleteCard(evt) {
    const deleteItem = evt.currentTarget.closest('.card')
    deleteItem.remove()
  }

  function likeCard(evt) {
    const likeButton = evt.currentTarget
    likeButton.classList.contains('card__like-button_is-active') ?
      likeButton.classList.remove('card__like-button_is-active') :
      likeButton.classList.add('card__like-button_is-active')
  }

  function popUpCard(evt) {
    console.log('popUp')
    const image = document.querySelector('.popup__image')
    image.src = evt.currentTarget.src
    image.alt = evt.currentTarget.alt
    openPopUp('.popup_type_image')
  }









