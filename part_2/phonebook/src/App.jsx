import { useState } from 'react'  //named import

const App = () => { //block body {}
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])  /*state initialization. React useState hook returns an array, and we use array destructuring to pull out the values.*/
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState(''); // State initialization for error message

  const handleSubmit = (event) => { // event handler (addName is triggered when the user submits the form)
    event.preventDefault() // To stop the page from refreshing.

    // Prevent empty name submission
    if (newName.trim() === '') {
      setErrorMessage(`${newName} No name entered`);
      return
    }

    // Check for duplicate name
    if (persons.some(person => person.name === newName)) {

      setErrorMessage(`${newName} is already added to the phonebook`);
      return;
    }

    // Add the new name to the list
    setErrorMessage('');
    const newPerson = { name: newName, number: newPhone }
    setPersons([...persons, newPerson])

    // Clear input field after adding
    setNewName('')
    setNewPhone('')
  }

  const [search, setSearch] = useState('');


  const handleNameChange = (event) => { //event (or e) handler. handleNameChange is triggered when the user types something in the input field.
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => { //event (or e) handler. handleNameChange is triggered when the user types something in the input field.
    setNewPhone(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h2>Phonebook</h2>
      <input
        placeholder="filter shown with"
        value={search}
        onChange={handleSearchChange}
      /><br />
      <button type="text">Filter</button>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="New name"
            value={newName}
            onChange={handleNameChange}
          />

          <input
            placeholder="New phonenumber"
            value={newPhone}
            onChange={handlePhoneChange}
          />

          <br />
          <button type="submit">Add</button>
        </div>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <br />

      <h2>Filtered</h2>
      {search === '' ? (   //ternary operator: condition ? doThisIfTrue : doThisIfFalse
        <p>None</p>
      ) : (
        filteredPersons.length > 0 ? ( //.lenght array property
          filteredPersons.map((person, index) => ( //creates a new array by applying a function to each element of the original array.
            <li key={index}>{person.name}</li>
          ))
        ) : (
          <p>No matches found</p>
        )
      )}
      <h2>Numbers</h2>


      <ul>
        {persons.map((person, index) => (
          <div>
            <li key={index}>{person.name}: {person.number}</li>

          </div>

        ))}
      </ul>

      <br /><br />

    </div>
  )
}

export default App


/*In programming, an argument is the evidence or value you pass to a function, just like in a debate where arguments are used to support a point.A parameter is a placeholder inside a function that accepts input values (arguments) when the function is called.*/

/*<div>debug: {newName} {JSON.stringify(persons)}</div>*/
