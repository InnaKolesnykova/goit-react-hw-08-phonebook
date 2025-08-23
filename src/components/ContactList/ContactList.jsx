import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, selectAllContacts } from '../../redux/contactSlice';
import { ContactElem } from '../ContactElem/ContactElem';
import { getFilter } from '../../redux/select'; 

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.contBox}>
      <h2 className={css.header}>Contacts</h2>
      {contacts.length > 0 ? (
        <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <ContactElem key={id} contact={{ id, name, number }} />
        ))}
      </ul>
      ) : (
      <p>You have no contacts saved yet. Add some to view contact list.</p>
      )}
      
    </div>
  );
};

export { ContactList };
