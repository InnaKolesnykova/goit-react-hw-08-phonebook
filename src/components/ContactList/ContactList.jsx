import React, { useEffect, useState } from 'react';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, selectAllContacts } from '../../redux/contactSlice';
import { ContactElem } from '../ContactElem/ContactElem';
import { getFilter } from '../../redux/select';
import { Loader } from 'components/Loader/Loader';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const filter = useSelector(getFilter);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const isLoading = useSelector(state => state.contacts.isLoading)

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, filter]);

  return (
    <div className={css.contBox}>
      {filteredContacts.length > 0 ? (
        <div>
          <h2 className={css.heading}>Your contacts</h2>
          <ul className={css.list}>
            {filteredContacts.map(({ id, name, number }) => (
              <ContactElem key={id} contact={{ id, name, number }} />
            ))}
          </ul>
        </div>
      ) : (
        isLoading ? (
          <Loader />
        ) : (
          <p className={css.none}>You have no contacts saved yet. Add some to view contact list.</p>
        )
      )}
    </div>
  );
};

export { ContactList };