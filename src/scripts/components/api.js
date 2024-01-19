const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '2f58622b-d0b5-4307-a605-706103b16a1d'
  }
}
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => getResponseData(res))
    .then(result => Promise.resolve(
      {
        _id: result._id,
        name: result.name,
        about: result.about,
        avatar: result.avatar,
        cohort: result.cohort
        }
    ))
}
export const patchUserApi = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(res => getResponseData(res))
    .then(user => Promise.resolve({user, flag: true}))
}
export const getCardArr = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => getResponseData(res))
    .then(result => Promise.resolve(result))
}
export const addCardApi = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(res => getResponseData(res))
    .then(card => Promise.resolve({card, flag: true}))
}
export const likeCardAPI = (id, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method,
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => getResponseData(res))
    .then(result => Promise.resolve(result))
}
export const deleteCardAPI = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => getResponseData(res))
    .then(result => Promise.resolve({result, flag: true}))
}
export const changeAvatarApi = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(res => getResponseData(res))
    .then(user => Promise.resolve({user, flag: true}))
}
function getResponseData(res) {
  if(!res.ok) {
    return Promise.reject(`Error: ${res.status}`)
  }
  return res.json()
}

