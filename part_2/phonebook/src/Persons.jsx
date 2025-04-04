
const Persons = ({ persons, search }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div>
      <ul>
      {filteredPersons.length > 0 ? (
          filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))
        ) : (
          <p>No matches found</p>
        )}
          
      </ul>


    </div>
        
  )
}
export default Persons;

/*      {search === '' ? (   //ternary operator: condition ? doThisIfTrue : doThisIfFalse
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
*/