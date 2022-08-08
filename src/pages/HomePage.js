import { useEffect } from 'react';
import ChatContainer from '../projectComponents/HomePage/ChatContainer';
import Sidebar from '../projectComponents/HomePage/Sidebar';
import FileModal from '../projectComponents/Modal/File';
import SingleChatModal from '../projectComponents/Modal/SingleChat';
import GroupChatModal from '../projectComponents/Modal/GroupChat';
import GroupProfileModal from '../projectComponents/Modal/GroupProfile';
import VideoChatModal from '../projectComponents/Modal/VideoCall';
import ProfileModal from '../projectComponents/Modal/Profile';
import styles from '../styles/pages/Home.module.css';
import VoiceModal from '../projectComponents/Modal/Voice';
import SettingModal from '../projectComponents/Modal/Setting';
import { useDispatch, useSelector } from 'react-redux';
import { getOnlineUsers } from '../store/features/userSlice';

const HomePage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const socket = useSelector((state) => state.chat.socket);

  useEffect(() => {
    socket.emit('setup', user);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('onlineUsers', (data) => {
      dispatch(getOnlineUsers(data));
    });

    socket.on('offlineUsers', (data) => {
      dispatch(getOnlineUsers(data));
    });
  });

  return (
    <main className={styles.container}>
      <Sidebar />
      <ChatContainer />
      <SingleChatModal />
      <GroupChatModal />
      <FileModal />
      <VideoChatModal />
      <VoiceModal />
      <ProfileModal />
      <SettingModal setTheme={props.setTheme} />
      <GroupProfileModal />
    </main>
  );
};

export default HomePage;
