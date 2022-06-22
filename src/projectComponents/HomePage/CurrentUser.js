import PropTypes from 'prop-types';
import styles from '../../styles/components/HomePage/CurrentUser.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import Resource from '../../Resource';
import { BsCameraVideo } from 'react-icons/bs';
import { toggleModalVideoCall } from '../../store/features/modalSlice';

const CurrentUser = (props) => {
  const chat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {Object.keys(chat).length > 0 ? (
        <>
          <div className={styles.group}>
            <img src={chat.img} alt={chat.username} />
            <h4>{chat.username}</h4>
          </div>
          <div className={styles.group}>
            {!chat.isGroupChat && (
              <BsCameraVideo
                onClick={() => dispatch(toggleModalVideoCall())}
                size={25}
                style={{ cursor: 'pointer', marginLeft: '20px' }}
                color='var(--text-primary)'
              />
            )}
            <Input
              fieldClassName={'SearchUserField'}
              className={'SearchUserInput'}
              name={'search'}
              type={'text'}
              icon={Resource.Svg.SEARCH2}
              value={props.filter}
              onChange={(e) => props.setFilter(e.target.value)}
              placeholder={'جستجوی پیام...'}
            />
          </div>
        </>
      ) : (
        <h4>لطفا چتی را انتخاب کنید</h4>
      )}
    </div>
  );
};

CurrentUser.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

export default CurrentUser;
