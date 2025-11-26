import axios from 'axios'
const baseUrl = '/api/blogs' 


// 1. Storage for the user token
let token = null

// 2. Function to receive and store the token from App.js
const setToken = newToken => {
  token = `Bearer ${newToken}` // The format required by JWT authentication
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  // Configuration object to include the Authorization header
  const config = {
    headers: { Authorization: token }, 
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}



const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

export default { getAll, create, update, setToken }
