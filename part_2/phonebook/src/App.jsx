import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import contactsService from "./services/contactsService";
import Notification from "./Notification";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  if (!message) return null;

  const dialogStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 1000,
    textAlign: "center",
  };

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#222",
    zIndex: 9999,
  };

  return (
    <div style={backdropStyle}>
      <div style={dialogStyle}>
        <p>{message}</p>
        <button
          onClick={onConfirm}
          style={{
            marginRight: "10px",
            padding: "8px 15px",
            backgroundColor: "#4CAC40",
            color: "#fff",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "8px 15px",
            backgroundColor: "#f34346",
            color: "#FFF",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const [confirmation, setConfirmation] = useState(null);
  const [dialogAction, setDialogAction] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  useEffect(() => {
    console.log("Fetching persons");
    contactsService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        showNotification("Error connecting to server", "error");
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    setConfirmation(`Delete ${person.name}?`);
    setDialogAction(() => () => {
      setConfirmation(null);
      contactsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(`Removed ${person.name}`, "success");
        })
        .catch((error) => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            "error",
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    });
  };

  const handleUpdateExisting = (personToUpdate) => {
    const updatedPerson = { ...personToUpdate, number: newPhone };
    contactsService
      .update(personToUpdate.id, updatedPerson)
      .then((response) => {
        setPersons(
          persons.map((person) =>
            person.id !== personToUpdate.id ? person : response.data,
          ),
        );
        setNewName("");
        setNewPhone("");
        showNotification(
          `Updated phone number for ${response.data.name}`,
          "success",
        );
      })
      .catch((error) => {
        showNotification(
          error.response?.data?.error ||
            `Error updating ${personToUpdate.name}`,
          "error",
        );
      });
  };

  const handleAddNewPerson = () => {
    const newPerson = { name: newName, number: newPhone };
    contactsService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhone("");
        showNotification(`Added ${response.data.name}`, "success");
      })
      .catch((error) => {
        showNotification(
          error.response?.data?.error || "Person NOT added!",
          "error",
        );
      });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (newName === "" || newPhone === "") {
      showNotification("Fill both name and phone number", "error");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      setConfirmation(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`,
      );
      setDialogAction(() => () => {
        setConfirmation(null);
        handleUpdateExisting(existingPerson);
      });
    } else {
      handleAddNewPerson();
    }
  };

  return (
    <div>
      <div className="page1">
        <h2>Phonebook</h2>

        <Notification message={notification.message} type={notification.type} />

        <ConfirmationDialog
          message={confirmation}
          onConfirm={dialogAction || (() => setConfirmation(null))}
          onCancel={() => setConfirmation(null)}
        />

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
      <div className="page2">
        <br />
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          search={search}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
