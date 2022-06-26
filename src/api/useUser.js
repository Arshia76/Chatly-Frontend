import { useQuery } from 'react-query';
import axios from 'axios';

const searchUser = async (query) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_ROUTE}/user/search?search=${query}`,
    {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    }
  );
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
