import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const CONTACTS_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? CONTACTS
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const newContact = ({ name, number }) => {
    const isNameSaved = name.toLowerCase();
    let savedName = false;

    contacts.forEach(element => {
      if (element.name.toLowerCase() === isNameSaved) {
        alert(`${name} is already in contacts`);
        savedName = true;
      }
    });
    if (savedName) {
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const searchContacts = () => {
    const savedNameFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(savedNameFilter)
    );
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = e => {
    setContacts(prevState => prevState.filter(contact => contact.id !== e));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={newContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterChange} />
      <ContactList
        contacts={searchContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
