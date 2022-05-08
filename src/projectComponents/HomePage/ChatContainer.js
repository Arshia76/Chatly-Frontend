import React from 'react'
import Header from '../Header';
import CurrentUser from '../HomePage/CurrentUser'
import styles from '../../styles/components/HomePage/ChatContainer.module.css'
import Message from './Message';
import ChatInput from '../ChatInput';
import { useSelector } from 'react-redux';

const ChatContainer = () => {
  const messages = useSelector((state) => state.message.messages)
  return (
    <div className={styles.container}>
        <Header/>
        <CurrentUser username='آرش' img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'/>
        <div className={styles.messageContainer}>
           {
             messages.map((data) => {
               return (
                <Message message= {data.message}  time={data.time}
                type={data.type} username='آرش' avatar='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
                fromSelf={true} />
               )
             })
           }
           
        </div>
        <ChatInput/>
    </div>
  )
}

export default ChatContainer