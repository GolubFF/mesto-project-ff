import { initialCards } from '../utils/constants';
export default function api(name = '', link = '') {
  const cardsArr = []
  initialCards.forEach(card => cardsArr.push(card))
  cardsArr.forEach((card, index) => {
    card.like = false;
    card._id = index + 1;
  })
  if(name || link) {
    cardsArr.unshift({
      name,
      link,
      like: false,
      _id: cardsArr.length + 1
    })
    return cardsArr

  }
  return cardsArr
}
