const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}`

function getPeppa(){
  return fetch(BASE_URL)
  .then(res => res.json())
}

function updatePeppa(){
  return fetch(BASE_URL, {
    method: 'PUT'
  })
  .then(res => res.json())
}

export{
  getPeppa,
  updatePeppa
}