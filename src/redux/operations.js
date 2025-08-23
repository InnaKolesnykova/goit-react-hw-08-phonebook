import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

const fetchContacts = createAction('contacts/fetchAllContacts');
const addContact = createAction('contacts/addContact');
const updateContact = createAction('contacts/updateContact');
const deleteContact = createAction('contacts/deleteContact');

export const fetchAllContacts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/contacts');
    dispatch(fetchContacts(response.data));
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
};

export const addContactToServer = (contact) => async (dispatch) => {
  try {
    const response = await axios.post('/api/contacts', contact);
    dispatch(addContact(response.data));
  } catch (error) {
    console.error('Error adding contact:', error);
  }
};

export const updateContactOnServer = (contact) => async (dispatch) => {
  try {
    await axios.put(`/api/contacts/${contact.id}`, contact);
    dispatch(updateContact(contact));
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};

export const deleteContactFromServer = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch(deleteContact(id));
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};