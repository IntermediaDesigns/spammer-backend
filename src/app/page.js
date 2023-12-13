import GetPosts from './components/GetPosts.jsx'
import NewPosts from './components/NewPosts.jsx'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <h1 className={styles.spammerTitle}>Spammer</h1>
      <NewPosts />
      <GetPosts />
    </>
  )
}
