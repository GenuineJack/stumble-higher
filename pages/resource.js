// pages/resource.js
import { useEffect, useState } from 'react'
import styles from '../styles/Resource.module.css'

export default function Resource() {
  const [resources, setResources] = useState([])
  const [currentResource, setCurrentResource] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch resource data from public folder
  useEffect(() => {
    fetch('/stumble-higher-resources-final-1.json')
      .then(response => response.json())
      .then(data => {
        // Filter out header rows
        const validResources = data.Books.filter(
          item => item.id !== 'title' && !item.id.startsWith('-')
        )
        setResources(validResources)
        if (validResources.length > 0) {
          loadRandomResource(validResources)
        }
      })
      .catch(error => {
        console.error('Error loading resource data:', error)
      })
  }, [])

  const loadRandomResource = (resourceList = resources) => {
    if (resourceList.length === 0) {
      console.error('No valid resources available.')
      return
    }
    setLoading(true)
    const randomResource = resourceList[Math.floor(Math.random() * resourceList.length)]
    setCurrentResource(randomResource)

    const iframe = document.getElementById('resource-iframe')
    const loadTimeout = setTimeout(() => {
      console.warn('Resource took too long to load. Skipping to next resource...')
      setLoading(false)
      loadRandomResource(resourceList)
    }, 5000)

    iframe.onload = () => {
      clearTimeout(loadTimeout)
      setLoading(false)
      console.log('Resource loaded successfully:', randomResource)
    }

    iframe.onerror = () => {
      clearTimeout(loadTimeout)
      setLoading(false)
      console.warn('Error loading resource. Skipping to next resource...')
      loadRandomResource(resourceList)
    }

    // In the JSON, the resource URL is stored in the "author" field
    iframe.src = randomResource.author
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {loading && <div className={styles.spinner}></div>}
        <iframe
          id="resource-iframe"
          className={styles.iframe}
          title="Resource Viewer"
        ></iframe>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span id="resource-info">
            {currentResource ? `${currentResource.id} by ${currentResource.title}` : 'Loading resource...'}
          </span>
        </div>
        <div className={styles.footerCenter}>
          <button className={styles.mainBtn} onClick={() => loadRandomResource()}>
            Go Higher
          </button>
        </div>
        <div className={styles.footerRight}>
          <button
            title="Open in New Tab"
            onClick={() => {
              if (currentResource && currentResource.author) {
                window.open(currentResource.author, '_blank')
              }
            }}
          >
            🌐
          </button>
          <button
            title="Share"
            onClick={() => {
              if (navigator.share && currentResource) {
                navigator.share({
                  title: currentResource.id,
                  text: `Check out "${currentResource.id}" by ${currentResource.title} on Stumble Higher!`,
                  url: currentResource.author
                }).catch(err => console.error('Error sharing:', err))
              } else {
                alert(
                  'Sharing not supported. Copy the URL: ' + currentResource.author
                )
              }
            }}
          >
            🔗
          </button>
        </div>
      </footer>
    </div>
  )
}
