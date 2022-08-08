import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  filteredMessages: [],
  file: '',
  messageToReply: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getFile: (state, action) => {
      state.file = action.payload;
    },
    removeFile: (state) => {
      state.file = '';
    },
    setMessageToReply: (state, action) => {
      state.messageToReply = action.payload;
    },
    removeMessageToReply: (state) => {
      state.messageToReply = null;
    },
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    add: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    remove: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id.toString() !== action.payload._id.toString()
      );
    },
    search: (state, action) => {
      const array = current(state.messages);
      state.filteredMessages = array.filter((message) => {
        return message.content.toString().includes(action.payload);
      });
    },
  },
});

export const {
  getMessages,
  add,
  remove,
  getFile,
  removeFile,
  search,
  setMessageToReply,
  removeMessageToReply,
} = messageSlice.actions;

export default messageSlice.reducer;
