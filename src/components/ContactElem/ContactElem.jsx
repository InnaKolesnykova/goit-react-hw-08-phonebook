import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactSlice';

const ContactElem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };
  return (
    <li key={contact.id}>
      {contact.name}: {contact.number}{' '}
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
};

export { ContactElem };
