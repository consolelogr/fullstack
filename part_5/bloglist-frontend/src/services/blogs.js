import axios from 'axios'
const baseUrl = '/api/blogs' // Ensure this matches your backend route

// 1. Storage for the user token
let token = null

// 2. Function to receive and store the token from App.js
const setToken = newToken => {
  token = `Bearer ${newToken}` // The format required by JWT authentication
}

// Function to fetch all blogs (already exists)
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// 3. New function to create a blog
const create = async newObject => {
  // Configuration object to include the Authorization header
  const config = {
    headers: { Authorization: token }, 
  }

  // Send the POST request with the new object AND the config
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// 4. Export the new functions
export default { getAll, create, setToken }