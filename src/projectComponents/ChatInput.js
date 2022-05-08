import { useState,useEffect } from 'react';
import {BsEmojiSmile} from 'react-icons/bs';
import {ImAttachment} from 'react-icons/im';
import {FaTelegramPlane} from 'react-icons/fa';
import { Picker } from 'emoji-mart-virtualized';
import { useFilePicker } from 'use-file-picker';
import 'emoji-mart-virtualized/css/emoji-mart.css';
import styles from '../styles/components/ChatInput.module.css';
import { useDispatch } from 'react-redux';
import { add } from '../store/features/messageSlice';
import moment from 'moment-jalali'

const ChatInput = () => {
  const [showEmoji,setShowEmoji] = useState(false);
  const [text,setText] = useState({});

  const dispatch = useDispatch()

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    // limitFilesConfig: { max: 1 },
    // // minFileSize: 0.1, // in megabytes
    // maxFileSize: 50,
    // imageSizeRestrictions: {
    //   maxHeight: 900, // in pixels
    //   maxWidth: 1600,
    //   minHeight: 600,
    //   minWidth: 768,
    // },
  });

 
  const selectEmoji = (emoji,e) => {
    setText(state => ({
      type:'text',
      message: state.message.concat(emoji.native),
      time:moment().format('HH:mm')
    }))
  }

  const onChangeText = (e) => {
      setText({
        type:'text',
        message:e.target.value,
        time:moment().format('HH:mm')
      });
  }


  useEffect(() => {
    if(filesContent.length > 0) {
      dispatch(add({
        type:'file',
        message:filesContent?.[0]?.content,
        time:moment().format('HH:mm')
      }))
    }
  } , [filesContent,dispatch])

  const send = (e) => {
    e.preventDefault();
    dispatch(add(text))
    setText({
      type:'text',
      message:'',
      time:''
    })
  }

  const onEnterPress = (e) => {
    if(e.key === 'Enter') {
      dispatch(add(text))
      setText({
        type:'text',
        message:'',
        time:''
      })
    }
  }

  const i18n = {
    search: 'جستجو',
    clear: 'حذف', // Accessible label on "clear" button
    notfound: 'اموجی پیدا نشد.',
    categories: {
        search: 'نتایج جستجو',
        recent: 'موارد پراستفاده',
        smileys: 'شکلک و لبخند',
        people: 'مردم و اعضای بدن',
        nature: 'حیوانات و طبیعت',
        foods: 'غذا و نوشیدنی',
        activity: 'فعالیت',
        places: 'سفر و اماکن',
        objects: 'اشیا',
        symbols: 'نشانه‌ها',
        flags: 'پرچم‌ها',
        custom: 'سنتی',
      },
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  }


  return (
    <div className={styles.container}>
        <div className={styles.group}>
            <BsEmojiSmile size={25} color='#707072'
             style={{cursor:'pointer'}} onClick={() => setShowEmoji(state => !state)}/>
            <input type="text" placeholder='تایپ کنید...' value={text.message}
            onChange={onChangeText} onKeyDown={onEnterPress} />
            <ImAttachment size={25} color='#707072'
             style={{cursor:'pointer'}} onClick={() => openFileSelector()}/>
        </div>
        <div className={styles.send}>
            <FaTelegramPlane size={25} color='#ffffff'
            onClick={send} />
        </div>
        <Picker set='apple' showPreview={false} showSkinTones={false}
        i18n={i18n} style={{position:'absolute',right:0,bottom:'50px',
        display:`${showEmoji ? 'block':'none'}`}}
        sheetSize={32} onClick={selectEmoji}/>
    </div>
  )
}

export default ChatInput