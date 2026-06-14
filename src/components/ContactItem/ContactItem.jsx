import { useContext } from "react";
import { Item, Text, Button } from "./ContactItem.styled.js";
import { ContactContext } from "../../ContactContext";

function ContactItem({ contact }) {
  const { deleteContact } = useContext(ContactContext);

  return (
    <Item>
      <Text>
        {contact.name}: {contact.number}
      </Text>

      <Button onClick={() => deleteContact(contact.id)}>Delete</Button>
    </Item>
  );
}

export default ContactItem;
