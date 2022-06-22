import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import styles from '../../styles/components/Modal/Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModalProfile } from '../../store/features/modalSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/Button';

const SingleChatModal = () => {
  const profileSchema = yup.object({
    img: yup.string().required('عکس پروفایل نمی‌تواند خالی باشد'),
    username: yup.string().required('نام کاربری نمی‌تواند خالی باشد'),
    password: yup
      .string()
      .min(6, 'رمز عبور حداقل 6 کاراکتر می‌باشد')
      .required('پسورد جدید را وارد نمایید'),
    newPassword: yup
      .string()
      .min(6, 'رمز عبور حداقل 6 کاراکتر می‌باشد')
      .required('پسورد فعلی را وارد نمایید'),
  });

  const isOpen = useSelector((state) => state.modal.modalProfile);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(toggleModalProfile());
  };

  const onSubmitProfile = (values) => {
    console.log(values);
  };

  const profileForm = useFormik({
    initialValues: {
      img: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png',
      username: '',
      password: '',
      newPassword: '',
    },
    validationSchema: profileSchema,
    onSubmit: onSubmitProfile,
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={{
        base: 'ProfileModal',
        afterOpen: 'ProfileModal__after-open',
        beforeClose: 'ProfileModal__before-close',
      }}
      overlayClassName={{
        base: 'ProfileOverlay',
        afterOpen: 'ProfileOverlay__after-open',
        beforeClose: 'ProfileOverlay__before-close',
      }}
    >
      <form onSubmit={profileForm.handleSubmit} className={styles.container}>
        <img
          className={styles.profileImg}
          src={
            'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
          }
          alt='user-img'
        />
        <Input
          fieldClassName={'ProfileField'}
          className={'ProfileInput'}
          type={'text'}
          value={profileForm.values.username}
          onChange={profileForm.handleChange}
          placeholder={'نام کاربری'}
        />
        <Button className='ProfileBtn' title='اعمال تغییرات' />
        <h4>تغییر رمز عبور</h4>
        <Input
          fieldClassName={'ProfileField'}
          className={'ProfileInput'}
          type={'text'}
          value={profileForm.values.password}
          onChange={profileForm.handleChange}
          placeholder={'رمز عبور فعلی'}
        />
        <Input
          fieldClassName={'ProfileField'}
          className={'ProfileInput'}
          type={'text'}
          value={profileForm.values.newPassword}
          onChange={profileForm.handleChange}
          placeholder={'رمز عبور جدید'}
        />
        <Button className='ProfileBtn' title='تغییر رمز عبور' />
      </form>
    </Modal>
  );
};

export default SingleChatModal;
