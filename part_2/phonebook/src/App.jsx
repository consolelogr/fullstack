import { useState, useEffect } from 'react'  //named import

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import contactsService from './services/contactsService'


// State initialization. React useState hook returns an array, and we use array destructuring to pull out the values.
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('');


  // useEffect is a hook that allows you to perform side effects in function components.
  useEffect(() => {
    console.log('Fetching persons from server...');
    contactsService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => console.error('Error fetching persons:', error));
  }, []);


  // handlers stay in App.jsx
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handlePhoneChange = (event) => { setNewPhone(event.target.value) }
  const handleSearchChange = (event) => { setSearch(event.target.value) } //SetSearch Sets search value
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (!confirmDelete) return;

    contactsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (newName ==="" || newPhone===""){
      alert("Fill both name and phone number")
      return
    }
    console.log(newName);
    if (newName !==""){
      if (persons.some(person => person.name === newName)) {
        if (confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`) === true);
        {
          const personToUpdate = persons.find(person => person.name === newName);
          const updatedPerson = { ...personToUpdate, number: newPhone };
          contactsService
            .update(personToUpdate.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(person => (person.id !== personToUpdate.id ? person : response.data)));
              setNewName('');
              setNewPhone('');
              console.log('Person updated:', response.data);
            })
            .catch(error => {
              console.error('Error updating person:', error);
            });

        }
        // Update the state with the updated person
        return;
      }
      
    }
    else { console.log("ei onnaa") }

    const newPerson = { name: newName, number: newPhone };

    contactsService // Create a new contact
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data)); // Update state with the new data
        setNewName('');
        setNewPhone('');
        console.log('New person added:', response.data);
      })
      .catch(error => console.error('Error adding person:', error));
    // Update the state with the new person 
  }

  //Return all wrapped in div
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
        <Persons persons={persons} search={search} handleDelete={handleDelete} />
      </div>
    </div >
  )
}

export default App

/* 
16042025
Exercises 2.12.-2.15.
2.13: The Phonebook step 8

Extract the code that "handles the communication with the backend into its own module" by following the example shown earlier in this part of the course material.

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
     '¨
    
     '
     ''''

     <PersonForm 
       ...
     />

     <h3>Numbers</h3>

     <Persons ... />
   </div>
 )
}*/