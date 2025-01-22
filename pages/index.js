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
      const response = await fetch('/api/resources'); // Updated API route
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.text();
      const parsedResources = parseResources(data);
      setResources(parsedResources);
      const randomResource = getRandomResource(parsedResources);
      setResource(randomResource);
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
          <p className="project-credit">A Higher Market Project</p>
          <p className="author-credit">Made by Genuine Jack</p>
          <button onClick={handleStumbleClick} className="press-button">
            PRESS TO GO HIGHER
          </button>
          <div onClick={handleQuestionClick} className="question-icon">
            ?
          </div>

          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>
                  &times;
                </span>
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
        </div>
      ) : (
        <div className="content-page">
          <iframe src={resource.Link} className="content-iframe" title="Resource Viewer" />
          <footer className="footer-banner">
            <div className="footer-content">
              <span className="resource-info">
                {resource.Title} by {resource.Author}
              </span>
              <button onClick={handleStumbleClick} className="go-higher-button">
                Go Higher
              </button>
              <span onClick={handleWorldClick} className="world-icon" title="Open in New Tab">
                🌐
              </span>
              <span onClick={() => window.location.href = '/'} className="home-icon" title="Home">
                🏠
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

        .homepage, .content-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 100vh;
          padding: 2rem;
        }

        .footer-banner {
          width: 100%;
          position: fixed;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ff6600;
          color: white;
          height: 70px;
        }
      `}</style>
    </div>
  );
}
