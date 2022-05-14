import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROUTE}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosWithAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROUTE}`,
  headers: {
    'auth-token': `${localStorage.getItem('auth-token')}`,
  },
});

const login = async (userData) => {
  const { data } = await axiosInstance.post(
    '/auth/login',
    JSON.stringify(userData)
  );
  return data;
};

const register = async (userData) => {
  const { data } = await axiosInstance.post(
    '/auth/register',
    JSON.stringify(userData)
  );
  return data;
};

const getUser = async () => {
  const { data } = await axiosWithAuth.get('/auth/user');
  return data;
};

export function useLogin(onSuccess, onError) {
  return useMutation(login, {
    onSuccess,
    onError,
  });
}

export function useRegister(onSuccess, onError) {
  return useMutation(register, {
    onSuccess,
    onError,
  });
}

export function useUser(onSuccess, onError) {
  return useQuery('user', getUser, {
    onSuccess,
    onError,
    retry: false,
  });
}
