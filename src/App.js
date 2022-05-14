import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Resource from './Resource';
import { useDispatch } from 'react-redux';
import { useUser } from './api/useAuth';
import PrivateRoute from './utils/PrivateRoute';
import { setUser } from './store/features/authSlice';
import Loader from './projectComponents/Loader';

// import { io } from 'socket.io-client';

// let socket;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = (data) => {
    console.log('called');
    dispatch(setUser(data));
    navigate('/');
  };

  const { isLoading } = useUser(onSuccess);

  if (isLoading) {
    return <Loader />;
  }

  // const [message,setMessage] = useState('');
  // // const [room,setRoom] = useState('');
  // const [recievedMessage,setRecievedMessage] = useState('')
  // const [isData,setIsData] = useState(false)
  // const [user,setUser] = useState('')

  // const onChange = (e) => {
  //   setMessage(e.target.value)

  // }

  // // const onChangeRoom = (e) => {
  // //   setRoom(e.target.value);
  // // }

  // useEffect(() => {
  // socket = io('http://localhost:5000');

  // },[])

  // useEffect(() => {

  //   console.log('called');
  //   socket.on('recieveMessage',(data) => {
  //       console.log(data);
  //       setRecievedMessage(data);
  //   })
  // },[isData])

  // // const sendMessage = (e) => {
  // //   e.preventDefault();
  // //   socket.emit('sendMessage',message,room)
  // //   setIsData(state => !state)
  // // }

  // // const joinRoom = (e) => {
  // //   e.preventDefault();
  // //   socket.emit('joinRoom',room)
  // // }

  // const getId = (e) => {
  //   e.preventDefault();
  //   setUser(e.target.id)
  //   socket.emit('getUser',e.target.id);
  // }

  // const privateMessage = (e) => {
  //   e.preventDefault();
  //   setIsData(state => !state)
  //   socket.emit('privateMessage',message,user)
  //   console.log('called');
  // }

  return (
    <Routes>
      <Route
        path={Resource.Routes.HOME}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route path={Resource.Routes.AUTH} element={<AuthPage />} />
    </Routes>
  );
}

export default App;
