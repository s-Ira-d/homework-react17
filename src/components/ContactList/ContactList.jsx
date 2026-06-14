import ContactItem from "../ContactItem/ContactItem.jsx";
import { List } from "./ContactList.styled.js";

function ContactList({ contacts }) {
  return (
    <List>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
}

export default ContactList;
