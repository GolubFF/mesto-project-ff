import {likeCardAPI, deleteCardAPI} from "./api";

const cardTemplate = document.querySelector('#card-template').content;
function createCard(item, deleteCard, likeCard, openPopUp, userID) {
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const buttonDelete = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button');
  const countLike = card.querySelector('.card__count-like')
  const imageCard = card.querySelector('.card__image')
  const name = item.name
  const link = item.link
  const cardId = item._id
  const likesArr = item.likes



  card.querySelector('.card__title').textContent = item.name
  card.querySelector('.card__image').src = item.link
  card.querySelector('.card__image').alt = item.name



  if(checkLikeById(userID, likesArr)) {
    likeButton.classList.add('card__like-button_is-active')
  }


  if(item.owner._id !== userID) {
    buttonDelete.classList.add('hidden_button')
  }

  countLike.textContent = likesArr.length

  buttonDelete.addEventListener('click', (evt) => deleteCard(card, cardId))
  likeButton.addEventListener('click', (evt) => likeCard(likeButton, cardId))
  imageCard.addEventListener('click', (evt) => openPopUp({name, link}))

  return card
}
function deleteCard(deleteItem, cardId) {
  deleteCardAPI(cardId)
  deleteItem.remove()
}
function likeCard(likedItem, cardId) {
  const likeButton = likedItem.parentElement
  const countLike = likeButton.querySelector('.card__count-like')
  if(likedItem.classList.contains('card__like-button_is-active')){

    likeCardAPI(cardId, "DELETE")
      .then(res => {
        const likes = res.likes
        countLike.textContent = likes.length
      })

  } else {

    likeCardAPI(cardId, "PUT")
      .then(res => {
        const likes = res.likes
        countLike.textContent = likes.length
      })

  }
  likedItem.classList.toggle('card__like-button_is-active')

}

function checkLikeById(id, arr) {
  const idArr = arr.map(item => item._id)
  return idArr.includes(id)
}

export {createCard, deleteCard, likeCard}
