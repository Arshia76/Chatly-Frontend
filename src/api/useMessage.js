import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROUTE}`,
  headers: {
    'auth-token': `${localStorage.getItem('auth-token')}`,
  },
});

const uploadFile = async (file) => {
  const { data } = await axiosWithAuth.post(`/upload/message`, file, {});
  return data;
};

const uploadAudio = async (audioBlob) => {
  const { data } = await axiosWithAuth.post(`/upload/audio`, audioBlob, {});
  return data;
};

const uploadDocument = async (document) => {
  const { data } = await axiosWithAuth.post(`/upload/document`, document, {});
  return data;
};

const downloadDocument = async (file) => {
  const { data } = await axiosWithAuth.post('/download', JSON.stringify(file), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const getChatMessages = async (id) => {
  const { data } = await axiosWithAuth.get(`/message/messages/${id}`);
  return data;
};

const sendMessage = async (messageData) => {
  const { data } = await axiosWithAuth.post(
    '/message/send',
    JSON.stringify(messageData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const reply = async ([messageData, messageId]) => {
  const { data } = await axiosWithAuth.post(
    `/message/reply/${messageId}`,
    JSON.stringify(messageData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

export function useGetChatMessages(id, onSuccess, onError) {
  return useQuery(['messages', id], () => getChatMessages(id), {
    onSuccess,
    onError,
    retry: false,
    enabled: false,
  });
}

export function useSendMessage(onSuccess, onError) {
  return useMutation(sendMessage, {
    onSuccess,
    onError,
  });
}

export function useReplyMessage(onSuccess, onError) {
  return useMutation(reply, {
    onSuccess,
    onError,
  });
}

export function useUploadMessage(onSuccess, onError) {
  return useMutation(uploadFile, {
    onSuccess,
    onError,
  });
}

export function useDownloadDocument(onSuccess, onError) {
  return useMutation(downloadDocument, {
    onSuccess,
    onError,
  });
}

export function useUploadAudio(onSuccess, onError) {
  return useMutation(uploadAudio, {
    onSuccess,
    onError,
  });
}

export function useUploadDocument(onSuccess, onError) {
  return useMutation(uploadDocument, {
    onSuccess,
    onError,
  });
}
