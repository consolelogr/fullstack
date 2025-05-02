const express = require('express')
const app = express()
const cors = require('cors')



let persons = [
  {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
  }
];


app.use(express.json())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));


app.post('/api/persons', (request,response)  => {
  const person = request.body
  console.log(person)
  response.json(person)
  })

app.get('/', (request, response) => {
  response.send('<h1>Persons backend</h1>')
})




app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
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
