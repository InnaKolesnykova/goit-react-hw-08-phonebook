import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://connections-api.goit.global/contacts';
const tokenSelector = (state) => state.auth.token;

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    const token = tokenSelector(thunkAPI.getState());
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    const token = tokenSelector(thunkAPI.getState());
    try {
      const response = await axios.post(baseUrl, { name, number }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async(contactId, thunkAPI) => {
    if (!contactId) {
      throw new Error('Contact ID is required');
    }
    try {
      const token = tokenSelector(thunkAPI.getState());
      await axios.delete(`${baseUrl}/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(contactId);
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedData }, thunkAPI) => {
    const token = tokenSelector(thunkAPI.getState());
    try {
      const response = await axios.patch(`${baseUrl}/${contactId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    loading: {
      fetchContacts: false,
      addContact: false,
      deleteContact: false,
      updateContact: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.loading.fetchContacts = true;
        state.error = null;
      })
     .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loading.fetchContacts = false;
        state.items = action.payload;
      })
     .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.loading.fetchContacts = false;
        state.error = action.error.message;
      })
     .addCase(addContact.pending, (state) => {
        state.loading.addContact = true;
      })
     .addCase(addContact.fulfilled, (state, action) => {
        state.loading.addContact = false;
        state.items.push(action.payload);
      })
     .addCase(addContact.rejected, (state, action) => {
        state.loading.addContact = false;
        state.error = action.error.message;
      })
     .addCase(deleteContact.pending, (state) => {
        state.loading.deleteContact = true;
      })
     .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading.deleteContact = false;
        state.items = state.items.filter((contact) => contact.id!== action.payload);
      })
     .addCase(deleteContact.rejected, (state, action) => {
        state.loading.deleteContact = false;
        state.error = action.error.message;
      })
     .addCase(updateContact.pending, (state) => {
        state.loading.updateContact = true;
      })
     .addCase(updateContact.fulfilled, (state, action) => {
        state.loading.updateContact = false;
        const index = state.items.findIndex((contact) => contact.id === action.payload.id);
        if (index!== -1) {
          state.items[index] = action.payload;
        }
      })
     .addCase(updateContact.rejected, (state, action) => {
        state.loading.updateContact = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;

export const contactsReducer = contactsSlice.reducer;