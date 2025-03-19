// pages/index.js
import { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Welcome to Stumble Higher</h1>
        <p>Discover curated ideas that elevate your mind.</p>
        <Link href="/resource">
          <button className={styles.mainBtn}>Press To Go Higher</button>
        </Link>
        <button className={styles.infoBtn} onClick={() => setModalVisible(true)}>?</button>
      </main>
      {modalVisible && (
        <div className={styles.modal} onClick={(e) => { if (e.target === e.currentTarget) setModalVisible(false) }}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModalVisible(false)}>&times;</span>
            <h2>How It Works</h2>
            <ol>
              <li>Press "Press To Go Higher" to start your journey.</li>
              <li>You will be taken to a resource page with a curated idea.</li>
              <li>Explore the resource and enjoy your discovery.</li>
            </ol>
          </div>
        </div>
      )}
      <footer className={styles.footer}>
        <p>A Higher Market Project - <a href="https://highermarket.xyz/" target="_blank" rel="noopener noreferrer">highermarket.xyz</a></p>
      </footer>
    </div>
  )
}
