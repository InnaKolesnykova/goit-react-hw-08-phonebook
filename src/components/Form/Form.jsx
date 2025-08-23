import React, { useState } from 'react';
import css from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactSlice';

const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const validateInput = () => {
    if (name.trim() === '' || number.trim() === '') {
      return false;
    }
    return true;
  };

  const checkContactExistence = () => {
    return contacts.some((contact) => contact.number === number || contact.name === name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInput()) {
      return;
    }

    if (checkContactExistence()) {
      alert(`Contact already exists!`);
      return;
    }

    try {
      await dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    } catch (error) {
      if (error.message.includes('Error code 14')) {
        setError('An error occurred while adding the contact. Please try again later.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <form className={css.formBox} onSubmit={handleSubmit}>
      <label className={css.label1} >
        <input className={css.input} placeholder='Name' type="text" name="name" value={name} onChange={handleNameChange} required />
      </label>
      <label className={css.label2}>
        <input className={css.input} placeholder='Phone number'  type="tel" name="number" value={number} onChange={handleNumberChange} required />
      </label>
      {error && <div style={{ color: 'ed' }}>{error}</div>}
      <button className={css.btn} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export { Form };