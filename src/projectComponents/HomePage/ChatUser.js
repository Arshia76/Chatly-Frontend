import styles from '../../styles/components/HomePage/ChatUser.module.css';
import PropTypes from 'prop-types';

const ChatUser = (props) => {
  return (
    <div className={styles.container}>
       <div className={styles.group}>
        <img src={props.img} alt={props.username} />
        <div className={styles.group2}>
            <h4>{props.username}</h4>
            <p>{props.lastMsg}</p>
         </div>
       </div>
       <div className={styles.group3}>
        <span>{props.time}</span>
        <span>{props.unreadMsgs}</span>
       </div>
    </div>
  )
}

ChatUser.propTypes = {
  img: PropTypes.string,
  username: PropTypes.string,
  lastMsg: PropTypes.string,
  time: PropTypes.string,
  unreadMsgs:PropTypes.number
}

export default ChatUser