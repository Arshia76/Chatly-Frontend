import Input from '../../components/Input'
import Profile from './Profile';
import ChatUser from './ChatUser';
import Resource from '../../Resource'
import styles from '../../styles/components/HomePage/Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.container}>
        <Profile username='ارشیا' profileImg='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'/>
        <Input fieldClassName={'SearchUserField'} className={'SearchUserInput'} name={'search'}
                                   type={'text'} icon={Resource.Svg.SEARCH2}
                                   placeholder={'جستجو کاربر یا گروه...'}/>
        <div className={styles.chatlist}>
            <ChatUser img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
            username='آرش' lastMsg='سلام ارشا چطوری؟' time='12:00' unreadMsgs={5}/>
            <ChatUser img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
            username='آرش' lastMsg='سلام ارشا چطوری؟' time='12:00' unreadMsgs={5}/>
            <ChatUser img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
            username='آرش' lastMsg='سلام ارشا چطوری؟' time='12:00' unreadMsgs={5}/>
            <ChatUser img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
            username='آرش' lastMsg='سلام ارشا چطوری؟' time='12:00' unreadMsgs={15}/>
            <ChatUser img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
            username='آرش' lastMsg='سلام ارشا چطوری؟' time='12:00' unreadMsgs={5}/>
            <ChatUser img='https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_5-128.png'
            username='آرش' lastMsg='سلام ارشا چطوری؟' time='12:00' unreadMsgs={5}/>
            
        </div>
    </div>
  )
}

export default Sidebar