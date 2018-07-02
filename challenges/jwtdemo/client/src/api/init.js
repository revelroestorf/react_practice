import axios from 'axios'

const api = axios.create({
  baseUrl: 'http://localhost:4000/'
})

const setJwt = (token) => {
  api.default.headers.common['Authorization'] = `Bearer ${token}`
  // api is an instyance of axios request
  // default and headers are options in axios
  // common means FOR ALL REQUESTS
}

export { api, setJwt }
