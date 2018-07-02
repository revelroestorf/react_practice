import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000'
})

const setJwt = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  localStorage['token'] = token
}

export { api, setJwt }
