import Input from "../components/Input";
import Resource from "../Resource";
import styles from '../styles/components/Header.module.css'
import {IoMoonOutline} from 'react-icons/io5';
import {HiOutlineSun} from 'react-icons/hi';
import {BsBell} from 'react-icons/bs';
import moment from 'moment-jalali'

const Header = () => {
  return (
    <header className={styles.container}>
        <Input fieldClassName={'SearchUserField'} className={'SearchUserInput'} name={'search'}
                                   type={'text'} icon={Resource.Svg.SEARCH2}
                                   placeholder={'جستجوی پیام...'}/>

        <div className={styles.theme}>
            <div>
                <HiOutlineSun color="#ffffff" size={20}/>
            </div>
            <div style={{background:'#ffffff'}}>
                <IoMoonOutline color="#258C60" size={18}/>
            </div>
        </div>  

        <span>{moment().format('jYYYY/jMM/jDD')}</span>

        <div className={styles.notif}>
            <BsBell size={22}/>
            <img className={styles.dot} src={Resource.Svg.DOT} alt="dot-icon" />
        </div>
    </header>
  )
}

export default Header