import initialCards  from '../utils/constants';
export default function api(name = '', link = '') {
  const cardsArr = []
  initialCards.forEach(card => cardsArr.push(card))
  return cardsArr
}

