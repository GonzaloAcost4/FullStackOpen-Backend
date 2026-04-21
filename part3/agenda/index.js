const express = require('express')
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Phonebook!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get ('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => { 
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    const index = persons.indexOf(person) // obtiene el índice del elemento seleccionado del array persons
    persons.splice(index, 1) // elimina el elemento seleccionado del array persons 
    response.status(204).end() // devuelve una respuesta sin contenido
  } else {
    response.status(404).end() // devuelve una respuesta de error si el elemento no se encuentra
  }
})

const generateId = () => {
  const id = Math.floor(Math.random() * 1000000)
  return id
} 

app.post('/api/persons', (request, response) => {
  const body = request.body 
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  } else if (persons.find(person => person.number === body.number)) { 
    return response.status(400).json({ 
      error: 'number must be unique' 
    })
  }


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons.push(person) // agrega el nuevo objeto person al array persons

  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})