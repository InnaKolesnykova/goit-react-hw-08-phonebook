import React, { useState } from 'react';
import css from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactSlice'; 

const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    

    const isNumberExist = contacts.find(contact => contact.number === number);

    if (isNumberExist) {
      alert(
        `Number ${number} is already in contacts!`
      );
      return;
    }
    
    const isNameExist = contacts.find(contact => contact.name === name);


    if (isNameExist) {
      alert(
        `Name ${name} is already in contacts!`
      );
      return;
    }
    
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formBox} onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" value={name} onChange={handleNameChange} required />
      </label>
      <label>
        Phone number
        <input type="tel" name="number" value={number} onChange={handleNumberChange} required />
      </label>
      <button className={css.btn} type="submit">
        Add Contact
      </button>
    </form>
  );
}; 

export { Form };   
