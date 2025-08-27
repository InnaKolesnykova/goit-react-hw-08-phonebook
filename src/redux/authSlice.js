import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUserAPI } from './authAPI';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global';

const setTokenInLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

const setUserInfoInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserInfoFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await axios.post(`${API_URL}/users/signup`, { name, email, password });
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const token = response.data.token;
      setTokenInLocalStorage(token);
      setUserInfoInLocalStorage(response.data.user);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    const { token } = getState().auth;
    if (!token) {
      return { error: 'Token is not available' };
    }
    try {
      const response = await axios.post(`${API_URL}/users/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      removeTokenFromLocalStorage();
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return;
    }

    try {
      const response = await getCurrentUserAPI(token);
      return response.data;
    } catch (error) {
      removeTokenFromLocalStorage();
      localStorage.removeItem('user');
      return { error: error.message };
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: getUserInfoFromLocalStorage(),
    isLoggedIn: !!localStorage.getItem('token'),
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.status = 'succeeded';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.status = 'succeeded';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.status = 'succeeded';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.status = 'succeeded';
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { setLoggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;