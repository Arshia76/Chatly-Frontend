import React, { useState, useEffect } from 'react';
import Header from '../Header';
import CurrentUser from '../HomePage/CurrentUser';
import styles from '../../styles/components/HomePage/ChatContainer.module.css';
import Message from './Message';
import ChatInput from '../ChatInput';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChatMessages } from '../../api/useMessage';
import Loader from '../Loader';
import ScrollToBottom from 'react-scroll-to-bottom';
import { toast } from 'react-toastify';
import { search } from '../../store/features/messageSlice';

const ChatContainer = (props) => {
  const [filter, setFilter] = useState();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const moveToElement = (id) => {
    console.log(id);
    const doc = document.getElementById(id);
    if (doc) {
      doc.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const onGetMessagesError = () => {
    toast.error('خطا در بارگزاری پیام ها', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const onGetMessagesSuccess = () => {
    toast.success('بارگزاری موفق');
  };
  const messages = useSelector((state) => state.message.messages);
  const filteredMessages = useSelector(
    (state) => state.message.filteredMessages
  );

  const chat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const { isLoading } = useGetChatMessages(
    chat.id,
    onGetMessagesSuccess,
    onGetMessagesError
  );

  useEffect(() => {
    dispatch(search(filter));
  }, [dispatch, filter]);

  return (
    <div className={styles.container}>
      {/* <Header setTheme={props.setTheme} /> */}
      <CurrentUser filter={filter} setFilter={setFilter} />
      <ScrollToBottom checkInterval={100} className={styles.messageContainer}>
        {isLoading ? (
          <Loader />
        ) : filter ? (
          filteredMessages &&
          filteredMessages
            .filter((message, index, array) => array.indexOf(message) === index)
            .map((data) => {
              return (
                <Message
                  data={data}
                  key={data._id}
                  id={data._id}
                  moveToElement={moveToElement}
                  onClick={() => setId(null)}
                  onDoubleClick={() => setId(data._id)}
                  show={id === data._id}
                  replyTo={data?.replyTo}
                  message={data.content}
                  time={data.time}
                  type={data.type}
                  username={data.sender.username}
                  avatar={
                    data.sender.avatar ||
                    'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
                  }
                  fromSelf={data.sender._id === user.id}
                />
              );
            })
        ) : (
          messages &&
          messages
            .filter((message, index, array) => array.indexOf(message) === index)
            .map((data) => {
              return (
                <Message
                  data={data}
                  key={data._id}
                  id={data._id}
                  moveToElement={moveToElement}
                  onClick={() => setId(null)}
                  onDoubleClick={() => setId(data._id)}
                  replyTo={data?.replyTo}
                  show={id === data._id}
                  message={data.content}
                  time={data.time}
                  type={data.type}
                  username={data.sender.username}
                  avatar={
                    data.sender.avatar ||
                    'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
                  }
                  fromSelf={data.sender._id === user.id}
                />
              );
            })
        )}
      </ScrollToBottom>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
