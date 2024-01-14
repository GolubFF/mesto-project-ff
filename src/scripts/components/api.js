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
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then((result) => {
      return {
        _id: result._id,
        name: result.name,
        about: result.about,
        avatar: result.avatar,
        cohort: result.cohort
      }
    })
    .catch((err) => {
      console.log(err)
    })
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
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then(response => {
      return {
        user: response,
        flag: true
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getCardArr = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then(result => result)
    .catch((err) => {
      console.log(err)
    })
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
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then(result => {
      const response = {
        card: result,
        flag: true
      }
      console.log(result)
      return response
    })
    .catch((err) => {
      console.log(err)
    })
}

export const likeCardAPI = (id, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method,
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then(result => result)
    .catch((err) => {
      console.log(err)
    })
}

export const deleteCardAPI = (id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
    .then(res => {
      if(res.ok) {
        console.log('DELETE')
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then(result => console.log(result))
    .catch((err) => {
      console.log(err)
    })
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
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`)
    })
    .then(user => {
      console.log(user)
      return true
    })
    .catch((err) => {
      console.log(err)
    })

}


