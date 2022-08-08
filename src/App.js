import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Resource from './Resource';
import { useDispatch } from 'react-redux';
import { useUser } from './api/useAuth';
import PrivateRoute from './utils/PrivateRoute';
import { setUser } from './store/features/authSlice';
import Loader from './projectComponents/Loader';
import useLocalStorage from 'use-local-storage';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { getSocket } from './store/features/chatSlice';
import useSound from 'use-sound';

let socket;

function App() {
  const [play] = useSound(
    'https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3',
    { interrupt: true }
  );
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'chatly-theme',
    defaultDark ? 'dark' : 'light'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_ROUTE);
    dispatch(getSocket(socket));
    // eslint-disable-next-line
  }, []);

  const onSuccess = (data) => {
    dispatch(setUser(data));

    navigate('/');
  };

  const { isLoading, data: user } = useUser(onSuccess);

  useEffect(() => {
    socket?.on('message recieved', (recievedData) => {
      if (recievedData?.sender?._id.toString() !== user?.id?.toString()) {
        play();
      }
    });
  });

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
