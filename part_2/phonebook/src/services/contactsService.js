import axios from 'axios'
const baseUrl = '/api/persons'
//contactService ( === "notes" in the example)
const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

// DELETE a contact
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}



export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove 
}
