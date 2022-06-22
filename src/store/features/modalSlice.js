import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalSingleChat: false,
  modalGroupChat: false,
  modalFile: false,
  modalVideoCall: false,
  modalVoice: false,
  modalSetting: false,
  modalProfile: false,
  modalChatInfo: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModalSingleChat: (state) => {
      state.modalSingleChat = !state.modalSingleChat;
    },
    toggleModalGroupChat: (state) => {
      state.modalGroupChat = !state.modalGroupChat;
    },
    toggleModalFile: (state) => {
      state.modalFile = !state.modalFile;
    },
    toggleModalVideoCall: (state) => {
      state.modalVideoCall = !state.modalVideoCall;
    },
    toggleModalVoice: (state) => {
      state.modalVoice = !state.modalVoice;
    },
    toggleModalChatInfo: (state) => {
      state.modalChatInfo = !state.modalChatInfo;
    },
    toggleModalSetting: (state) => {
      state.modalSetting = !state.modalSetting;
    },
    toggleModalProfile: (state) => {
      state.modalProfile = !state.modalProfile;
    },
  },
});

export const {
  toggleModalSingleChat,
  toggleModalGroupChat,
  toggleModalFile,
  toggleModalVideoCall,
  toggleModalVoice,
  toggleModalChatInfo,
  toggleModalSetting,
  toggleModalProfile,
} = modalSlice.actions;

export default modalSlice.reducer;
