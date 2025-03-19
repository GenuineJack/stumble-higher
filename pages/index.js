// pages/index.js
import { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <div className={styles.container}>
      {/* “?” info button in the top-right corner */}
      <button className={styles.infoBtn} onClick={() => setModalVisible(true)}>?</button>

      <main className={styles.main}>
        <h1 className={styles.title}>STUMBLE HIGHER</h1>
        <h2 className={styles.subtitle}>A better way to scroll.</h2>
        <p className={styles.description}>
          Stumble into curated ideas that elevate your mind and take you higher.
        </p>

        <Link href="/resource">
          <button className={styles.mainBtn}>Press To Go Higher</button>
        </Link>
      </main>

      {/* “How It Works” Modal */}
      {modalVisible && (
        <div
          className={styles.modal}
          onClick={(e) => {
            // close if user clicks outside modal content
            if (e.target === e.currentTarget) setModalVisible(false)
          }}
        >
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>How It Works</h2>
            <ol>
              <li>1. Press "Press To Go Higher" to start your journey</li>
              <li>2. You will be taken to a curated "Higher-Aligned" idea on the web</li>
              <li>3. Explore the resource and discover the wonders of the web</li>
              <li>4. Ready to move on? Click the "Go Higher" button to see the next idea</li>
              <li> ❓ Note: If a page fails to load, click the 🌐 button to open the page</li>
            </ol>
          </div>
        </div>
      )}

      {/* Footer with maker credit */}
      <footer className={styles.footer}>
        <p>
          A Higher Market Project –{' '}
          <a
            href="https://highermarket.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            highermarket.xyz
          </a>
        </p>
      </footer>
    </div>
  )
}
