import "./App.css";
import { useState, useEffect, useRef } from "react";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import Filter from "./components/Filter/Filter.jsx";
import { nanoid } from "nanoid";

import { ContactContext } from "./ContactContext";

function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Mary", number: "+(38) 099 123 45 67" },
    { id: "id-2", name: "Ira", number: "+(38) 067 234 56 78" },
    { id: "id-3", name: "Danya", number: "+(38) 095 345 67 89" },
    { id: "id-4", name: "Vanya", number: "+(38) 096 456 78 90" },
  ]);

  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameInputRef = useRef(null);

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    }

    if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prev) => [...prev, newContact]);

    setName("");
    setNumber("");

    nameInputRef.current?.focus();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ContactContext.Provider value={{ deleteContact }}>
      <div>
        <h1>Phonebook</h1>

        <ContactForm
          name={name}
          number={number}
          onChange={handleChange}
          onSubmit={handleSubmit}
          nameInputRef={nameInputRef}
        />

        <h2>Contacts</h2>

        <Filter value={filter} onChange={handleFilterChange} />

        <ContactList contacts={filteredContacts} />
      </div>
    </ContactContext.Provider>
  );
}

export default App;
