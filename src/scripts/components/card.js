const cardTemplate = document.querySelector('#card-template').content;
function createCard(item, deleteCard, likeCard, openPopUp) {
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const buttonDelete = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button');
  const imageCard = card.querySelector('.card__image')
  const name = item.name
  const link = item.link

  card.querySelector('.card__title').textContent = item.name
  card.querySelector('.card__image').src = item.link
  card.querySelector('.card__image').alt = item.name

  buttonDelete.addEventListener('click', (evt) => deleteCard(card))
  likeButton.addEventListener('click', (evt) => likeCard(likeButton))
  imageCard.addEventListener('click', (evt) => openPopUp({name, link}))

  return card
}
function deleteCard(deleteItem) {
  deleteItem.remove()
}
function likeCard(likedItem) {
  likedItem.classList.toggle('card__like-button_is-active')
}

export {createCard, deleteCard, likeCard}
