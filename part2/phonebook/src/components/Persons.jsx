import React from "react";

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      <div>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Persons;
