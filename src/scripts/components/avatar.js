import avatar from '../../images/avatar.jpg'

const url = `url('${avatar}')`

function avatarImagePlace() {
  const avatarBlock = document.querySelector('.profile__image')
  avatarBlock.style.backgroundImage = url;
}

export default avatarImagePlace
