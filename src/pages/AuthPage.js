import React, {useState} from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import File from "../components/File";
import Resource from "../Resource";
import styles from '../styles/pages/Auth.module.css'
import {CSSTransition} from "react-transition-group";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [animationType, setAnimationType] = useState('signup')

    const AuthSide = () => {
        return (
            <div className={styles.AuthSide}>
                <img src={'https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/70-128.png'}/>
                <h4>به پیام رسان خوش آمدید.</h4>
                <Button className={'AuthSideBtn'} title={isSignIn ? 'ثبت نام' : 'ورود'}
                        onClick={() => {
                            setIsSignIn(isSignIn => !isSignIn)
                            setAnimationType(animationType => animationType === 'signup' ? 'signin' : 'signup')
                        }}/>
            </div>
        )
    }

    const SignInTemplate = () => {
        return (
            <div className={styles.AuthChild}>
                <AuthSide/>
                <CSSTransition appear={animationType === 'signup'} in={animationType === 'signup'} timeout={1000} classNames={{
                    enterActive: styles.authFadeEnterActive,
                    enterDone: styles.authFadeEnterDone,
                    appear: styles.authFadeAppear,
                    appearActive: styles.authFadeAppearActive,
                    exitActive: styles.authFadeExit,
                    exitDone: styles.authFadeExitActive
                }}>
                    <div className={[styles.Sign, styles.SignIn].join(' ')}>
                        <h4>ورود</h4>
                        <div className={styles.SocialBtns}>
                            <Button icon={Resource.Images.GOOGLE} className={'SocialBtn'}/>
                            <Button icon={Resource.Images.FACEBOOK} className={'SocialBtn'}/>
                        </div>
                        <span>ورود از طریق نام کاربری</span>
                        <div className={styles.InputContainer}>
                            <Input fieldClassName={'AuthField'} className={'AuthInput'} name={'username'} type={'text'}
                                   icon={Resource.Svg.USER}
                                   placeholder={'نام کاربری خود را وارد کنید'}/>
                            <Input fieldClassName={'AuthField'} className={'AuthInput'} name={'password'}
                                   type={'password'} icon={Resource.Svg.PASSWORD2}
                                   placeholder={'رمز عبور خود را وارد کنید'}/>
                        </div>
                        <span className={styles.ForgotPassword}>رمز عبور خود را فراموش کردم؟</span>
                        <Button className={'SignBtn'} title={'ورود'}/>
                    </div>
                </CSSTransition>
            </div>
        );
    }

    const SignUpTemplate = () => {
        return (
            <div className={styles.AuthChild}>
                <AuthSide/>
                <CSSTransition appear={animationType === 'signin'} in={animationType === 'signin'} timeout={1000} classNames={{
                    enter: styles.authFadeEnter,
                    enterActive: styles.authFadeEnterActive,
                    appear: styles.authFadeAppear,
                    appearActive: styles.authFadeAppearActive,
                    exitActive: styles.authFadeExit,
                    exitDone: styles.authFadeExitActive
                }}>
                    <div className={[styles.Sign, styles.SignUp].join(' ')}>
                        <h4>ثبت نام</h4>
                        <div className={styles.SocialBtns}>
                            <Button className={'SocialBtn'} icon={Resource.Images.GOOGLE}/>
                            <Button className={'SocialBtn'} icon={Resource.Images.FACEBOOK}/>
                        </div>
                        <span>ثبت نام از طریق ورود اطلاعات</span>
                        <div className={[styles.InputContainer, styles.SignUpContainer].join(' ')}>
                            
                            <Input fieldClassName={'AuthField'} className={'AuthInput'} name={'username'} type={'text'}
                                   icon={Resource.Svg.USER}
                                   placeholder={'نام کاربری خود را وارد کنید'}/>
                            <Input fieldClassName={'AuthField'} className={'AuthInput'} name={'password'}
                                   type={'password'} icon={Resource.Svg.PASSWORD2}
                                   placeholder={'رمز عبور خود را وارد کنید'}/>
                           
                            <File leadingImage={Resource.Svg.ATTACHMENT} fileText={'عکس پروفایل خود را انتخاب کنید'}
                                  className={'Profile'}/>
                           
                           
                        </div>
                        <Button className={'SignBtn'} title={'ثبت نام'}/>
                    </div>
                </CSSTransition>
            </div>
        )
    }

    return (
        <div className={styles.AuthContainer}>
            <div className={styles.UpBlob}>
                <img src={Resource.Blob.AUTHUP}/>
            </div>
            {isSignIn ? <SignInTemplate/> : <SignUpTemplate/>}
            <div className={styles.DownBlob}>
                <img src={Resource.Blob.AUTHDOWN}/>
            </div>
        </div>
    );
};

export default Auth;
