import {useEffect,useState} from 'react';
import {io} from 'socket.io-client'

let socket;

function App() {

  const [message,setMessage] = useState('');
  // const [room,setRoom] = useState('');
  const [recievedMessage,setRecievedMessage] = useState('')
  const [isData,setIsData] = useState(false)
  const [user,setUser] = useState('')

  const onChange = (e) => {
    setMessage(e.target.value)

  }

  // const onChangeRoom = (e) => {
  //   setRoom(e.target.value);
  // }

  useEffect(() => {
  socket = io('http://localhost:5000'); 

  },[])

  useEffect(() => {
    
    console.log('called');
    socket.on('recieveMessage',(data) => {
        console.log(data);
        setRecievedMessage(data);
    })
  },[isData])

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit('sendMessage',message,room)
  //   setIsData(state => !state)
  // }

  // const joinRoom = (e) => {
  //   e.preventDefault();
  //   socket.emit('joinRoom',room)
  // }



  const getId = (e) => {
    e.preventDefault();
    setUser(e.target.id)
    socket.emit('getUser',e.target.id);
  }

  const privateMessage = (e) => {
    e.preventDefault();
    setIsData(state => !state)
    socket.emit('privateMessage',message,user)
    console.log('called');
  }

  

  return (
    // <div>
    //   <input onChange={onChangeRoom} value={room}/>
    //   <button onClick={joinRoom}>join Room</button>

    //   <input value={message} onChange={onChange}/>
    //   <button onClick={sendMessage}>send message</button>

    //   <h2>{recievedMessage}</h2>

     <>
      <div>
        <h2 id='1' onClick={getId}>arshia</h2>
        <h2 id='2' onClick={getId}>arash</h2>
        <h2 id='3' onClick={getId}>ali</h2>
        <h2 id='4' onClick={getId}>manizhe</h2>

      </div>

      <div>
        <input onChange= {onChange} value={message}/>
        <button onClick={privateMessage}>send message to user</button>
      </div>

      <div>
        {recievedMessage}
      </div>
      </>
    // </div>
  );
}

export default App;
