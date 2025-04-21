const Persons = ({ persons, search, handleDelete }) => {
  // Check if persons is an array and not null/undefined
  const filteredPersons = (Array.isArray(persons) ? persons : []).filter((person) => (
    person?.name?.toLowerCase().includes(search.toLowerCase()) ?? false
  ));

  return (
    <div>
      <ul>
        {filteredPersons.length > 0 ? (
          filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
              &nbsp;&nbsp;
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </li>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </ul>
    </div>
  );
}

export default Persons;
