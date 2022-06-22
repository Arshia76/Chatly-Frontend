import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROUTE}`,
  headers: {
    'auth-token': `${localStorage.getItem('auth-token')}`,
  },
});

const getAllChats = async () => {
  const { data } = await axiosWithAuth.get('/chat');
  return data;
};

const createChat = async (chatData) => {
  const { data } = await axiosWithAuth.post(
    '/chat/create',
    JSON.stringify(chatData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const createGroupChat = async (groupData) => {
  const { data } = await axiosWithAuth.post(
    '/chat/group/create',
    JSON.stringify(groupData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const renameGroupChat = async (name) => {
  const { data } = await axiosWithAuth.post(
    '/chat/group/rename',
    JSON.stringify(name),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const addToGroup = async (addData) => {
  const { data } = await axiosWithAuth.post(
    '/chat/group/add',
    JSON.stringify(addData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const removeFromGroup = async (removeData) => {
  const { data } = await axiosWithAuth.post(
    '/chat/group/remove',
    JSON.stringify(removeData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const increaseUnreadMessages = async (chatData) => {
  const { data } = await axiosWithAuth.put(
    '/chat/increase/UnreadMessages',
    JSON.stringify(chatData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

const removeUnreadMessages = async (chatData) => {
  const { data } = await axiosWithAuth.put(
    '/chat/remove/UnreadMessages',
    JSON.stringify(chatData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

export function useGetAllChats(onSuccess, onError) {
  return useQuery('chats', getAllChats, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
}

export function useRemoveUnreadMessages(onSuccess, onError) {
  return useMutation(removeUnreadMessages, {
    onSuccess,
    onError,
  });
}

export function useIncreseUnreadMessages(onSuccess, onError) {
  return useMutation(increaseUnreadMessages, {
    onSuccess,
    onError,
  });
}

export function useCreateChat(onSuccess, onError) {
  return useMutation(createChat, {
    onSuccess,
    onError,
  });
}

export function useCreateGroupChat(onSuccess, onError) {
  return useMutation(createGroupChat, {
    onSuccess,
    onError,
  });
}

export function useRenameGroupChat(onSuccess, onError) {
  return useMutation(renameGroupChat, {
    onSuccess,
    onError,
  });
}

export function useAddToGroupChat(onSuccess, onError) {
  return useMutation(addToGroup, {
    onSuccess,
    onError,
  });
}

export function useRemoveFromGroupChat(onSuccess, onError) {
  return useMutation(removeFromGroup, {
    onSuccess,
    onError,
  });
}
