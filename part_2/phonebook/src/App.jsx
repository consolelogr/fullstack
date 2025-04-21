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

