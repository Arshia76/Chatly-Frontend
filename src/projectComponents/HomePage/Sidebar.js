import { useState } from 'react';
import Input from '../../components/Input';
import Profile from './Profile';
import ChatUser from './ChatUser';
import Resource from '../../Resource';
import styles from '../../styles/components/HomePage/Sidebar.module.css';
import { useGetAllChats } from '../../api/useChat';
import moment from 'moment-jalali';
import Loader from '../Loader';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [filter, setFilter] = useState();
  const { data, isLoading } = useGetAllChats();
  const user = useSelector((state) => state.auth.user);

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
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        icon={Resource.Svg.SEARCH2}
        placeholder={'جستجو کاربر یا گروه...'}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.chatlist}>
          {filter
            ? data &&
              data
                .filter((chat) => chat.chatName.includes(filter))
                .map((chat) => {
                  return (
                    <ChatUser
                      key={chat?._id}
                      id={chat?._id}
                      img={
                        chat?.users?.[1]?.avatar ||
                        'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
                      }
                      username={chat?.chatName}
                      lastMsg={
                        chat?.latestMessage?.type === 'text'
                          ? chat?.latestMessage?.content
                          : chat?.latestMessage?.type === 'file' ||
                            chat?.latestMessage?.type === 'document'
                          ? 'محتوای فایلی'
                          : chat?.latestMessage?.type === 'audio'
                          ? 'محتوای صوتی'
                          : ''
                      }
                      time={
                        chat?.latestMessage?.createdAt &&
                        moment(chat?.latestMessage?.createdAt).format(
                          'jYYYY/jMM/jDD'
                        )
                      }
                      unreadMessages={chat?.unreadMessages.filter(
                        (message, index, array) =>
                          message.sender !== user.id &&
                          array.indexOf(message) === index
                      )}
                      isGroupChat={chat?.isGroupChat}
                    />
                  );
                })
            : data &&
              data.map((chat) => {
                return (
                  <ChatUser
                    key={chat?._id}
                    id={chat?._id}
                    img={
                      chat.isGroupChat
                        ? 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
                        : chat?.users?.[0]?.avatar ||
                          'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
                    }
                    username={
                      chat?.isGroupChat
                        ? chat?.chatName
                        : chat?.users[0].username
                    }
                    lastMsg={
                      chat?.latestMessage?.type === 'text'
                        ? chat?.latestMessage?.content
                        : chat?.latestMessage?.type === 'file' ||
                          chat?.latestMessage?.type === 'document'
                        ? 'محتوای فایلی'
                        : chat?.latestMessage?.type === 'audio'
                        ? 'محتوای صوتی'
                        : ''
                    }
                    time={
                      chat?.latestMessage?.createdAt &&
                      moment(chat?.latestMessage?.createdAt).format(
                        'jYYYY/jMM/jDD'
                      )
                    }
                    unreadMessages={chat?.unreadMessages.filter(
                      (message, index, array) =>
                        message.sender !== user.id &&
                        array.indexOf(message) === index
                    )}
                    isGroupChat={chat?.isGroupChat}
                  />
                );
              })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
