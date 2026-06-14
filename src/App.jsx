import "./App.css";
import { useRef } from "react";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import { ContactContext } from "./ContactContext";
import { useContacts } from "./hooks/useContacts";

function App() {
  const {
    name,
    number,
    filter,
    handleChange,
    handleFilterChange,
    addContact,
    deleteContact,
    filteredContacts,
  } = useContacts();

  const nameInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = addContact();

    if (success) {
      nameInputRef.current?.focus();
    }
  };

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
