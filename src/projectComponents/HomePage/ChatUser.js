import styles from '../../styles/components/HomePage/ChatUser.module.css';
import PropTypes from 'prop-types';
import { useGetChatMessages } from '../../api/useMessage';
import { useRemoveUnreadMessages } from '../../api/useChat';
import { useDispatch } from 'react-redux';
import { getCurrentChat } from '../../store/features/chatSlice';
import { getMessages } from '../../store/features/messageSlice';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';

const ChatUser = (props) => {
  const queryClient = useQueryClient();
  const socket = useSelector((state) => state.chat.socket);
  const onSuccess = (data) => {
    dispatch(getMessages(data));
  };

  const onRemoveUnreadMessagesSuccess = () => {
    queryClient.invalidateQueries('chats');
  };

  const { refetch } = useGetChatMessages(props.id, onSuccess);
  const { mutate: removeUnreadMessages } = useRemoveUnreadMessages(
    onRemoveUnreadMessagesSuccess
  );

  const dispatch = useDispatch();

  const accessChat = () => {
    dispatch(getCurrentChat(props));
    refetch(props.id);
    socket.emit('join chat', props.id);
    removeUnreadMessages({ chatId: props.id });
  };
  return (
    <div className={styles.container} onClick={accessChat}>
      <div className={styles.group}>
        <img src={props.img} alt={props.chatName} />
        <div className={styles.group2}>
          <h4>{props.username}</h4>
          {props.lastMsg && <p>{props.lastMsg}</p>}
        </div>
      </div>
      <div className={styles.group3}>
        {props.time && <span>{props.time}</span>}
        {props.unreadMessages.length ? (
          <span>{props.unreadMessages.length}</span>
        ) : null}
      </div>
    </div>
  );
};

ChatUser.propTypes = {
  img: PropTypes.string,
  username: PropTypes.string,
  lastMsg: PropTypes.string,
  time: PropTypes.string,
  unreadMessages: PropTypes.number,
};

export default ChatUser;