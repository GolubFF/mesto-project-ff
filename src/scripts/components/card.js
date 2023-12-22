import {openModal} from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const image = document.querySelector('.popup__image')
const imageTitle = document.querySelector('.popup__caption')
function createCard(item, deleteCard, likeCard, popUpCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const buttonDelete = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button');
  const imageCard = card.querySelector('.card__image')


  card.querySelector('.card__title').textContent = item.name
  card.querySelector('.card__image').src = item.link
  buttonDelete.addEventListener('click', (evt) => {
    const card = evt.currentTarget.closest('.card')
    deleteCard(card)
  })
  likeButton.addEventListener('click', (evt) => likeCard(evt.currentTarget))
  imageCard.addEventListener('click', (evt) => popUpCard(evt.currentTarget))

  return card
}
function deleteCard(deleteItem) {
  deleteItem.remove()
}
function likeCard(likedItem) {
  likedItem.classList.toggle('card__like-button_is-active')
}
function popUpCard(item) {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const currentCard = item.closest('.card')

  imageTitle.textContent = currentCard.querySelector('.card__title').textContent
  image.src = currentCard.querySelector('.card__image').src
  image.alt = currentCard.querySelector('.card__image').alt

  openModal(popupTypeImage)
}

export {createCard, deleteCard, likeCard, popUpCard}
