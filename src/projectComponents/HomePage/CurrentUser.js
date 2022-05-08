import PropTypes from 'prop-types';
import styles from '../../styles/components/HomePage/CurrentUser.module.css'

const CurrentUser = (props) => {
  return (
    <div className={styles.container}>
        <img src={props.img} alt={props.username} />
        <h4>{props.username}</h4>
    </div>
  )
}

CurrentUser.propTypes = {
    img: PropTypes.string,
    username: PropTypes.string
}

export default CurrentUser