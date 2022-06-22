import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Resource from './Resource';
import { useDispatch } from 'react-redux';
import { useUser } from './api/useAuth';
import PrivateRoute from './utils/PrivateRoute';
import { setUser } from './store/features/authSlice';
import { getSocket } from './store/features/chatSlice';
import Loader from './projectComponents/Loader';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

import 'react-toastify/dist/ReactToastify.css';

let socket;

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'chatly-theme',
    defaultDark ? 'dark' : 'light'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_ROUTE);
  }, []);

  const onSuccess = (data) => {
    dispatch(setUser(data));

    dispatch(getSocket(socket));

    socket.emit('setup', data);
    socket.on('connected', () => {
      console.log(`${data.username} ${data.id} connected`);
    });
    navigate('/');
  };

  const { isLoading } = useUser(onSuccess);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          path={Resource.Routes.HOME}
          element={
            <PrivateRoute>
              <HomePage setTheme={setTheme} />
            </PrivateRoute>
          }
        />

        <Route path={Resource.Routes.AUTH} element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
