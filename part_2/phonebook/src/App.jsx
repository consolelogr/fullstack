import { useState } from 'react'  //named import
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

// State initialization. React useState hook returns an array, and we use array destructuring to pull out the values.
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('');




  // handlers stay in App.jsx
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handlePhoneChange = (event) => { setNewPhone(event.target.value) }
  const handleSearchChange = (event) => { setSearch(event.target.value) }


  // Prevent form from refreshing the page
  const handleAddPerson = (event) => {
    event.preventDefault();

    // Check if name already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    // Create new person object
    const newPerson = { name: newName, number: newPhone, id: persons.length + 1 };
    setPersons([...persons, newPerson]);

    // Update state
    setPersons([...persons, newPerson]);

    // Clear input fields
    setNewName('');
    setNewPhone('');
  };


  return (
    <div>
      <div className='page1'>
        <h2>Phonebook</h2>
   
        <Filter search={search} handleSearchChange={handleSearchChange} />
        <br />
        <h2>Add new</h2>

        <PersonForm
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          newName={newName}
          newPhone={newPhone}
          handleAddPerson={handleAddPerson}
        />
      </div>
      <div className='page2'>
        <br />
        <h2>Numbers</h2>
   
        <Persons persons={persons} search={search} />
      </div>
       </div >
   )
}

export default App

/* 
{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the App root component.

It is sufficient to extract three components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people to the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.*/


/*In programming, an argument is the evidence or value you pass to a function, just like in a debate where arguments are used to support a point.A parameter is a placeholder inside a function that accepts input values (arguments) when the function is called.*/

/*<div>debug: {newName} {JSON.stringify(persons)}</div>*/
/*const App = () => {
 // ...

 return (
   <div>
     <h2>Phonebook</h2>

     <Filter ... />

     <h3>Add a new</h3>

     <PersonForm 
       ...
     />

     <h3>Numbers</h3>

     <Persons ... />
   </div>
 )
}*/