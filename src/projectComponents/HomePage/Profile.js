import styles from '../../styles/components/HomePage/Profile.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={styles.container}>
      <img
        src={
          'https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Setting-128.png'
        }
        alt='setting'
      />
      <img
        src={user.avatar || props.profileImg}
        alt={user.username || props.username}
      />
      <h4>{user.username || props.username}</h4>
    </div>
  );
};

Profile.propTypes = {
  profileImg: PropTypes.string,
  username: PropTypes.string,
};

export default Profile;
