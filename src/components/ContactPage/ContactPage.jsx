import React from 'react';
import {ContactList} from '../ContactList/ContactList';
import { Form } from 'components/Form/Form';
import { Search } from 'components/Search/Search';
import css from './ContactPage.module.css';

const ContactsPage = () => {
return (
    <div>
      <h1 className={css.h1}>Contacts</h1>
      <div className={css.box}>
        <Form />
        <Search />
      </div>
      <ContactList />
    </div>
  );
};

export default ContactsPage;