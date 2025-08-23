import React from 'react';
import { Form } from './Form/Form';
import { Search } from './Search/Search';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <Form/>
      <h2>Contacts</h2>
      <Search />
      <ContactList />
    </div>
  );
};
