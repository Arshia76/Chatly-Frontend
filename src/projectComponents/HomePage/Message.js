import styles from '../../styles/components/HomePage/Message.module.css';
import PropTypes from 'prop-types';

const Message = (props) => {

    if(props.type === 'text') {
        return (
            <div className={styles.container} style={{justifyContent:`${!props.fromSelf && 'flex-end'}`}}>
                <img className={styles.avatar} src={props.avatar} alt={props.username} />
                <div className={styles.group}>
                    <p>{props.message}</p>
                    <span>{props.time}</span>
                </div>
            </div>
        )
    }

    else if(props.type === 'file') {
        return (
            <div className={[styles.container,styles.container2].join(' ')}>
                <img className={styles.avatar} src={props.avatar} alt={props.username} />
                <div className={styles.group}>
                    <img src={props.message} alt='img'/>
                    <span>{props.time}</span>
                </div>
            </div>
        )
    }
  
}

Message.propTypes = {
    fromSelf:PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string,
    avatar:PropTypes.string,
    username: PropTypes.string,
}

export default Message