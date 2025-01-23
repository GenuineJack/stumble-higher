import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [resource, setResource] = useState(null);
  const [resources, setResources] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      const response = await fetch('/api/resources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const { content } = await response.json();
      const parsedResources = parseResources(content);
      setResources(parsedResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }

  function parseResources(markdownData) {
    try {
      const lines = markdownData.split('\n');
      const headers = lines[0].split('|').map((header) => header.trim());
      const rows = lines.slice(2).map((row) => row.split('|').map((col) => col.trim()));

      const resources = rows.reduce((acc, row) => {
        const entry = Object.fromEntries(headers.map((header, index) => [header, row[index]]));
        const category = entry.Category || 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(entry);
        return acc;
      }, {});

      return resources;
    } catch (error) {
      console.error('Error parsing resources:', error);
      return {};
    }
  }

  function getRandomResource(resources) {
    const categories = Object.keys(resources);
    if (categories.length === 0) return null;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const items = resources[randomCategory];
    return items[Math.floor(Math.random() * items.length)];
  }

  function handleStumbleClick() {
    if (resources) {
      const randomResource = getRandomResource(resources);
      setResource(randomResource);
    } else {
      fetchResources();
    }
  }

  function handleWorldClick() {
    if (resource?.Link) {
      window.open(resource.Link, '_blank');
    }
  }

  function handleShareClick() {
    if (navigator.share && resource) {
      navigator.share({
        title: resource.Title,
        text: `Check out ${resource.Title} by ${resource.Author} on StumbleHigher.press!`,
        url: resource.Link,
      });
    }
  }

  function handleQuestionClick() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <div className="container">
      {!resource ? (
        <div className="homepage">
          <h1 className="logo">STUMBLE HIGHER</h1>
          <p className="tagline">A smarter way to scroll.</p>
          <p className="description">
            Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.
          </p>
          <button onClick={handleStumbleClick} className="press-button">
            PRESS TO GO HIGHER
          </button>
          <div onClick={handleQuestionClick} className="question-icon">
            ?
          </div>

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal-container">
                <button className="modal-close" onClick={handleModalClose}>
                  &times;
                </button>
                <h2>How It Works</h2>
                <ol>
                  <li>
                    <strong>Press the Button</strong> - Hit "PRESS TO GO HIGHER" to start your journey.
                    Each press takes you to a curated idea or resource.
                  </li>
                  <li>
                    <strong>Explore and Learn</strong> - Discover inspiring content that helps you think differently, grow, and go higher.
                  </li>
                  <li>
                    <strong>Press Again</strong> - Ready for more? Just press "Go Higher" to find your next discovery.
                  </li>
                  <li>
                    <strong>Share the Inspiration</strong> - If you love what you find, share it with others to keep the inspiration going.
                  </li>
                </ol>
              </div>
            </div>
          )}

          <footer className="homepage-footer">
            <a href="https://highermarket.xyz/" target="_blank" rel="noopener noreferrer" className="footer-link">
              A Higher Market Project
            </a>
            <a href="https://www.aimhigher.net/" target="_blank" rel="noopener noreferrer" className="footer-link">
              ↑
            </a>
            <a href="https://warpcast.com/genuinejack" target="_blank" rel="noopener noreferrer" className="footer-link">
              Built by Genuine Jack
            </a>
          </footer>
        </div>
      ) : (
        <div className="content-page">
          <iframe src={resource.Link} className="content-iframe" title="Resource Viewer" />
          <footer className="footer-banner">
            <div className="footer-content">
              <span onClick={() => window.location.href = '/'} className="home-icon" title="Home">
                🏠
              </span>
              <span className="resource-info">
                {resource.Title} by {resource.Author}
              </span>
              <button onClick={handleStumbleClick} className="go-higher-button">
                Go Higher
              </button>
              <span onClick={handleWorldClick} className="world-icon" title="Open in New Tab">
                🌐
              </span>
              <span onClick={handleShareClick} className="share-icon" title="Share">
                📢
              </span>
            </div>
          </footer>
        </div>
      )}

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            overflow: hidden;
          }

          .homepage {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100vh;
            padding: 2rem;
          }

          .logo {
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .tagline {
            font-size: 1.8rem;
            margin-bottom: 1rem;
          }

          .description {
            font-size: 1.4rem;
            margin-bottom: 2rem;
          }

          .homepage-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #f5f5f5;
            text-align: center;
            padding: 0.5rem 0;
            font-size: 0.9rem;
            display: flex;
            justify-content: space-around;
          }

          .footer-link {
            text-decoration: none;
            color: inherit;
          }

          .press-button {
            padding: 1rem 2.5rem;
            font-size: 1.2rem;
            background-color: #ff6600;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .press-button:hover {
            background-color: #e65c00;
          }

          .question-icon {
            position: absolute;
            top: 2rem;
            right: 2rem;
            font-size: 1.8rem;
            cursor: pointer;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .modal-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .modal-close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 1.5rem;
            border: none;
            background: none;
            cursor: pointer;
            color: #333;
          }

          .content-page {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }

          .content-iframe {
            width: 100vw;
            height: calc(100vh - 70px);
            border: none;
            position: absolute;
            left: 0;
            right: 0;
          }

          .footer-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 60px;
            background-color: #ff6600;
            color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .footer-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
            width: 100%;
          }

          .home-icon,
          .world-icon,
          .share-icon {
            font-size: 1.5rem;
            cursor: pointer;
          }

          .go-higher-button {
            font-size: 1.2rem;
            padding: 0.5rem 1.5rem;
            background-color: white;
            color: #ff6600;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}</style>
    </div>
  );
}
