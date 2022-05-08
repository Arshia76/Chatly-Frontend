import ChatContainer from '../projectComponents/HomePage/ChatContainer'
import Sidebar from '../projectComponents/HomePage/Sidebar'
import styles from '../styles/pages/Home.module.css'

const HomePage = () => {
  return (
    <main className={styles.container}>
        <Sidebar/>
        <ChatContainer/>
    </main>
  )
}

export default HomePage