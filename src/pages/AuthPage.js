import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import File from '../components/File';
import Resource from '../Resource';
import styles from '../styles/pages/Auth.module.css';
import { CSSTransition } from 'react-transition-group';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLogin, useRegister } from '../api/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/features/authSlice';
import Loader from '../projectComponents/Loader';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [animationType, setAnimationType] = useState('signup');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const {
    mutate: login,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
    data: LoginData,
  } = useLogin();
  const {
    mutate: register,
    isLoading: isLoadingRegister,
    isSuccess: isSuccessRegister,
    data: RegisterData,
  } = useRegister();

  const navigate = useNavigate();

  const SigninSchema = yup.object({
    username: yup.string().required('نام کاربری را وارد کنید'),
    password: yup.string().required('رمز عبور را وارد کنید'),
  });

  const SignupSchema = yup.object({
    username: yup.string().required('نام کاربری را وارد کنید'),
    email: yup
      .string()
      .email('ایمیل صحیحی را وارد کنید')
      .required('ایمیل را وارد کنید'),
    password: yup
      .string()
      .min(6, 'رمز عبور حداقل 6 کاراکتر می‌باشد')
      .required('رمز عبور را وارد کنید'),
    avatar: yup.string(),
  });

  const onSubmitSignin = (values) => {
    login(values);
  };

  const onSubmitSignup = (values) => {
    register(values);
  };

  const signInForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: onSubmitSignin,
  });

  const signUpForm = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
    validationSchema: SignupSchema,
    onSubmit: onSubmitSignup,
  });

  // const onSuccess = () => {
  //   navigate('/', { replace: true });
  // };

  // const { isLoading } = useUser(onSuccess);

  // if (isLoading) {
  //   return <Loader />;
  // }

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (isSuccessLogin || isSuccessRegister) {
    dispatch(setUser(LoginData || RegisterData));
    navigate(Resource.Routes.HOME);
  }

  if (isLoadingLogin || isLoadingRegister) {
    return <Loader />;
  }

  const authSide = () => {
    return (
      <div className={styles.AuthSide}>
        <img
          src={
            'https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/70-128.png'
          }
          alt='logo'
        />
        <h4>به پیام رسان خوش آمدید.</h4>
        <Button
          className={'AuthSideBtn'}
          title={isSignIn ? 'ثبت نام' : 'ورود'}
          onClick={() => {
            setIsSignIn((isSignIn) => !isSignIn);
            setAnimationType((animationType) =>
              animationType === 'signup' ? 'signin' : 'signup'
            );
          }}
        />
      </div>
    );
  };

  const signInTemplate = () => {
    return (
      <form className={styles.AuthChild} onSubmit={signInForm.handleSubmit}>
        {authSide()}
        <CSSTransition
          appear={animationType === 'signup'}
          in={animationType === 'signup'}
          timeout={1000}
          classNames={{
            enterActive: styles.authFadeEnterActive,
            enterDone: styles.authFadeEnterDone,
            appear: styles.authFadeAppear,
            appearActive: styles.authFadeAppearActive,
            exitActive: styles.authFadeExit,
            exitDone: styles.authFadeExitActive,
          }}
        >
          <div className={[styles.Sign, styles.SignIn].join(' ')}>
            <h4>ورود</h4>
            <div className={styles.SocialBtns}>
              <Button icon={Resource.Images.GOOGLE} className={'SocialBtn'} />
              <Button icon={Resource.Images.FACEBOOK} className={'SocialBtn'} />
            </div>
            <span>ورود از طریق نام کاربری</span>
            <div className={styles.InputContainer}>
              <Input
                id='username'
                fieldClassName={'AuthField'}
                className={'AuthInput'}
                name={'username'}
                type={'text'}
                value={signInForm.values.username}
                onChange={signInForm.handleChange}
                onBlur={signInForm.handleBlur}
                icon={Resource.Svg.USER}
                placeholder={'نام کاربری خود را وارد کنید'}
                error={
                  signInForm.errors.username && signInForm.touched.username
                    ? signInForm.errors.username
                    : null
                }
              />

              <Input
                id='password'
                fieldClassName={'AuthField'}
                className={'AuthInput'}
                name={'password'}
                type={'password'}
                value={signInForm.values.password}
                onChange={signInForm.handleChange}
                onBlur={signInForm.handleBlur}
                icon={Resource.Svg.PASSWORD2}
                placeholder={'رمز عبور خود را وارد کنید'}
                error={
                  signInForm.errors.password && signInForm.touched.password
                    ? signInForm.errors.password
                    : null
                }
              />
            </div>
            <span className={styles.ForgotPassword}>
              رمز عبور خود را فراموش کردم؟
            </span>
            <Button className={'SignBtn'} title={'ورود'} />
          </div>
        </CSSTransition>
      </form>
    );
  };

  const signUpTemplate = () => {
    return (
      <div className={styles.AuthChild}>
        {authSide()}
        <CSSTransition
          appear={animationType === 'signin'}
          in={animationType === 'signin'}
          timeout={1000}
          classNames={{
            enter: styles.authFadeEnter,
            enterActive: styles.authFadeEnterActive,
            appear: styles.authFadeAppear,
            appearActive: styles.authFadeAppearActive,
            exitActive: styles.authFadeExit,
            exitDone: styles.authFadeExitActive,
          }}
        >
          <form
            className={[styles.Sign, styles.SignUp].join(' ')}
            onSubmit={signUpForm.handleSubmit}
          >
            <h4>ثبت نام</h4>
            <div className={styles.SocialBtns}>
              <Button className={'SocialBtn'} icon={Resource.Images.GOOGLE} />
              <Button className={'SocialBtn'} icon={Resource.Images.FACEBOOK} />
            </div>
            <span>ثبت نام از طریق ورود اطلاعات</span>
            <div
              className={[styles.InputContainer, styles.SignUpContainer].join(
                ' '
              )}
            >
              <Input
                fieldClassName={'AuthField'}
                className={'AuthInput'}
                name={'username'}
                type={'text'}
                value={signUpForm.values.username}
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                icon={Resource.Svg.USER}
                placeholder={'نام کاربری خود را وارد کنید'}
                error={
                  signUpForm.errors.username && signUpForm.touched.username
                    ? signUpForm.errors.username
                    : null
                }
              />
              <Input
                fieldClassName={'AuthField'}
                className={'AuthInput'}
                name={'email'}
                type={'email'}
                value={signUpForm.values.email}
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                icon={Resource.Svg.PASSWORD2}
                placeholder={'ایمیل خود را وارد کنید'}
                error={
                  signUpForm.errors.email && signUpForm.touched.email
                    ? signUpForm.errors.email
                    : null
                }
              />

              <Input
                fieldClassName={'AuthField'}
                className={'AuthInput'}
                name={'password'}
                type={'password'}
                value={signUpForm.values.password}
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                icon={Resource.Svg.PASSWORD2}
                placeholder={'رمز عبور خود را وارد کنید'}
                error={
                  signUpForm.errors.password && signUpForm.touched.password
                    ? signUpForm.errors.password
                    : null
                }
              />

              <File
                leadingImage={Resource.Svg.ATTACHMENT}
                fileText={'عکس پروفایل خود را انتخاب کنید'}
                className={'Profile'}
              />
            </div>
            <Button className={'SignBtn'} title={'ثبت نام'} />
          </form>
        </CSSTransition>
      </div>
    );
  };

  return (
    <div className={styles.AuthContainer}>
      <div className={styles.UpBlob}>
        <img src={Resource.Blob.AUTHUP} alt='blob' />
      </div>
      {isSignIn ? signInTemplate() : signUpTemplate()}
      <div className={styles.DownBlob}>
        <img src={Resource.Blob.AUTHDOWN} alt='blob' />
      </div>
    </div>
  );
};

export default Auth;
