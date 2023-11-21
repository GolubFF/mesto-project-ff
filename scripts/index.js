const cardTemplate = document.querySelector('#card-template').content
const cardList = document.querySelector('.places__list')
function createCard(item, func) {
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const buttonDelete = card.querySelector('.card__delete-button')

  card.querySelector('.card__title').textContent = item.name
  card.querySelector('.card__image').src = item.link

  buttonDelete.addEventListener('click', (evt) => func(evt.currentTarget))

  cardList.append(card)
}
function deleteCard(item) {
  const deleteItem = item.closest('.card')
  deleteItem.remove()
}
initialCards.forEach(item => createCard(item, deleteCard))
