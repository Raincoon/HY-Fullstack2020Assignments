import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/all'

const getCountries = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {getCountries}