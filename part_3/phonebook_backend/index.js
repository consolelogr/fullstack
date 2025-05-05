const express = require('express')
const app = express()

let persons =[
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const kello = new Date()

app.use(express.json())


app.get('/', (request, response) => {
	response.send('<h1>It is a fine day today!</h1>') 
 })

 app.get('/info', (request, response) => {
	response.send  
  ('There are ' + persons.length + ' persons in the phonebook' + '<br>' + '<br>' + 'Time: ' + kello.getHours() + ':' + kello.getMinutes() + ':' + kello.getSeconds() + ':' + kello.getMilliseconds() + '<br>' + 'Timezone: ' +  (kello.getTimezoneOffset()/60) + ' GMT' + '<br>' + 'Date: ' + kello.getDate() + '/' + (kello.getMonth() + 1) + '/' + kello.getFullYear() 
     ) 
 })


app.post('/api/persons', (request,response)  => {
  const person = request.body
  console.log(person)
  response.json(person)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })



app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(person => person.id === id)
  if (person) {
	  response.json(person)
	} else {
	  response.status(404).end()
	}
  })  
 

  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`PERSON Server running on port ${PORT}`)
})
