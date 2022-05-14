import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import ChatUser from './ChatUser';
import Resource from '../../Resource';
import styles from '../../styles/components/HomePage/Sidebar.module.css';

const Sidebar = () => {
  const users = useSelector((state) => state.user.users);
  return (
    <div className={styles.container}>
      <Profile
        username='ارشیا'
        profileImg='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
      />
      <Input
        fieldClassName={'SearchUserField'}
        className={'SearchUserInput'}
        name={'search'}
        type={'text'}
        icon={Resource.Svg.SEARCH2}
        placeholder={'جستجو کاربر یا گروه...'}
      />
      <div className={styles.chatlist}>
        {users.map((user) => {
          return (
            <ChatUser
              img={
                user.avatar ||
                'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
              }
              username={user.username || 'آرش'}
              lastMsg={user.lastMsg || 'سلام ارشا چطوری؟'}
              time={user.time || '12:00'}
              unreadMsgs={user.unreadMsgs || 5}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
