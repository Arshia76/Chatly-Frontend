import styles from '../../styles/components/HomePage/SearchUser.module.css';
import PropTypes from 'prop-types';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useCreateChat } from '../../api/useChat';
import { useQueryClient } from 'react-query';
import { toggleModalSingleChat } from '../../store/features/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToBadgeList } from '../../store/features/chatSlice';
import { toast } from 'react-toastify';

const SearchUser = (props) => {
  const queryClient = useQueryClient();
  const modal = useSelector((state) => state.modal.modalSingleChat);
  const dispatch = useDispatch();
  const onAccessChatSuccess = () => {
    queryClient.invalidateQueries('chats');
    dispatch(toggleModalSingleChat());
    toast.success('چت با موفقیت ایجاد گردید');
    props.onClose();
  };
  const onAccessChatٍError = (error) => {
    console.log(error);
    toast.success('ایجاد چت با خطا مواجه شد');
  };
  const { mutate } = useCreateChat(onAccessChatSuccess, onAccessChatٍError);

  const onItemClick = () => {
    if (modal) {
      mutate({ userId: props.id });
    } else {
      dispatch(addToBadgeList(props));
    }
  };

  return (
    <div className={styles.container} onClick={onItemClick}>
      <div className={styles.group}>
        <img src={props.img} alt={props.username} />
        <h4>{props.username}</h4>
      </div>
      <MdPersonAddAlt1 size={30} color='grey' />
    </div>
  );
};

SearchUser.propTypes = {
  img: PropTypes.string,
  username: PropTypes.string,
};

export default SearchUser;
