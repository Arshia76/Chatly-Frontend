import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    removeUser: (state,action) => {
        state.users.filter(user => user.id !== action.payload.id)
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
