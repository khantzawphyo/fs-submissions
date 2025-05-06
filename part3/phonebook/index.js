const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000);
  } while (persons.some((p) => p.id === id));
  return String(id);
};

app.get('/api/persons/', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  response.send(`
      <p>Phonebook has info for ${persons.length} people<p>
      <p>${new Date().toString()}</p>
    `);
});

// GET PERSON WITH ID
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({
      error: 'Person not found',
    });
  }
});

// DELETE
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
  } else {
    response.status(404).json({
      error: 'Person not found',
    });
  }
});

// CREATE
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'name and number missing',
    });
  }

  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
