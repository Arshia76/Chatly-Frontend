import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages:[],

}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    add: (state,action) => {
      state.messages = [...state.messages,action.payload]
    },
    remove: (state,action) => {
      state.messages.filter(message => message.id !== action.payload.id)
    },
  },
})


export const { add, remove } = messageSlice.actions

export default messageSlice.reducer