import ChatContainer from '../projectComponents/HomePage/ChatContainer';
import Sidebar from '../projectComponents/HomePage/Sidebar';
import FileModal from '../projectComponents/Modal/File';
import SingleChatModal from '../projectComponents/Modal/SingleChat';
import GroupChatModal from '../projectComponents/Modal/GroupChat';
import VideoChatModal from '../projectComponents/Modal/VideoCall';
import ProfileModal from '../projectComponents/Modal/Profile';
import styles from '../styles/pages/Home.module.css';
import VoiceModal from '../projectComponents/Modal/Voice';
import SettingModal from '../projectComponents/Modal/Setting';

const HomePage = (props) => {
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
    </main>
  );
};

export default HomePage;
