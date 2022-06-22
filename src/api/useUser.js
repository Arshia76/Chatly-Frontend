import { useQuery } from 'react-query';
import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROUTE}`,
  headers: {
    'auth-token': `${localStorage.getItem('auth-token')}`,
  },
});

const searchUser = async (query) => {
  const { data } = await axiosWithAuth.get(`/user/search?search=${query}`);
  return data;
};

export function useSearchUsers(query, onSuccess, onError) {
  return useQuery(['search', query], () => searchUser(query), {
    onSuccess,
    onError,
    retry: false,
    enabled: false,
    refetchOnMount: false,
  });
}
