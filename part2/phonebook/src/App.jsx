import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (personExists && personExists.number === newPerson.number) {
      window.alert(`${newPerson.name} is already added to phonebook`);
    } else if (personExists && personExists.number !== newPerson.number) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        personService
          .update(personExists.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setNotification({
              message: `number of ${newPerson.name} is changed.`,
              type: "success",
            });
            setTimeout(() => setNotification(null), 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${newPerson.name} has already been removed from server.`,
              type: "error",
            });
            setTimeout(() => setNotification(null), 5000);
            setPersons(persons.filter((p) => p.id !== personExists.id));
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
          message: `Added ${returnedPerson.name}`,
          type: "success",
        });
        setTimeout(() => setNotification(null), 5000);
      });
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotification({
            message: `Deleted ${person.name}`,
            type: "success",
          });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${person.name} has already been removed from server.`,
            type: "error",
          });
          setTimeout(() => setNotification(null), 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
      setPersons(persons.filter((p) => p.id !== id));
    }
    return;
  };

  if (!persons) {
    return null;
  }

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h2>add a new</h2>
      <PersonForm
        handleNewPerson={handleNewPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
