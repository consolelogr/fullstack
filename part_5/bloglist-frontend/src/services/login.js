import axios from 'axios'
// The standard endpoint for the login resource in FSO is /api/login
const baseUrl = '/services/login'

const login = async credentials => {
  // axios.post automatically serializes the credentials object to JSON
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// Export the function directly as the default export
export default login