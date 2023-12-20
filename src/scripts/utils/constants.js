const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const profileEditButton = document.querySelector('.profile__edit-button')
const autor = document.querySelector('.profile__title')
const profile_description = document.querySelector('.profile__description')
const editProfilePopUp = document.querySelector('.popup_type_edit')
const formEditProfile = editProfilePopUp.querySelector('form')
const formEditProfileFields = formEditProfile.elements
const addNewCardButton = document.querySelector('.profile__add-button')
const popUpAddCard = document.querySelector('.popup_type_new-card')
const formAddCard = popUpAddCard.querySelector('form')



export {initialCards,
        profileEditButton,
        autor,
        profile_description,
        editProfilePopUp,
        formEditProfile,
        formEditProfileFields,
        addNewCardButton,
        popUpAddCard,
        formAddCard}
