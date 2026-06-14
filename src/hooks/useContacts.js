import { useReducer, useEffect } from "react";
import { nanoid } from "nanoid";

const initialState = {
  contacts: [
    { id: "id-1", name: "Mary", number: "+(38) 099 123 45 67" },
    { id: "id-2", name: "Ira", number: "+(38) 067 234 56 78" },
    { id: "id-3", name: "Danya", number: "+(38) 095 345 67 89" },
    { id: "id-4", name: "Vanya", number: "+(38) 096 456 78 90" },
  ],
  filter: "",
  name: "",
  number: "",
};

function contactsReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    case "SET_NUMBER":
      return {
        ...state,
        number: action.payload,
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        name: "",
        number: "",
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    case "LOAD_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };

    default:
      return state;
  }
}

export function useContacts() {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      dispatch({
        type: "LOAD_CONTACTS",
        payload: JSON.parse(savedContacts),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: name === "name" ? "SET_NAME" : "SET_NUMBER",
      payload: value,
    });
  };

  const handleFilterChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      payload: e.target.value,
    });
  };

  const addContact = () => {
    const isDuplicate = state.contacts.some(
      (contact) => contact.name.toLowerCase() === state.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${state.name} is already in contacts`);
      return false;
    }

    dispatch({
      type: "ADD_CONTACT",
      payload: {
        id: nanoid(),
        name: state.name,
        number: state.number,
      },
    });

    return true;
  };

  const deleteContact = (id) => {
    dispatch({
      type: "DELETE_CONTACT",
      payload: id,
    });
  };

  const filteredContacts = state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(state.filter.toLowerCase())
  );

  return {
    ...state,
    handleChange,
    handleFilterChange,
    addContact,
    deleteContact,
    filteredContacts,
  };
}
