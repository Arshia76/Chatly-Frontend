import styles from '../../styles/components/HomePage/Profile.module.css';
import PropTypes from 'prop-types'

const Profile = (props) => {
  return (
    <div className={styles.container}>
        <img src={'https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Setting-128.png'} alt="setting" />
        <img src={props.profileImg} alt={props.username} />
        <h4>{props.username}</h4>
    </div>
  )
}


Profile.propTypes ={
    profileImg:PropTypes.string,
    username:PropTypes.string
}

export default Profile