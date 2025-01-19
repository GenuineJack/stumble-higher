import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [resource, setResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      const response = await fetch('stumble-higher-MASTER-resource-lists.md');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.text();
      const resources = parseResources(data);
      const randomResource = getRandomResource(resources);
      setResource(randomResource);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }

  function parseResources(markdownData) {
    // ... existing parseResources function ...
  }

  function getRandomResource(resources) {
    // ... existing getRandomResource function ...
  }

  function handleStumbleClick() {
    fetchResources();
  }

  function handleWorldClick() {
    window.open(resource.Link, '_blank');
  }

  function handleShareClick() {
    if (navigator.share) {
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
    <div>
      {/* StumbleHigher-1: Homepage */}
      <div className="homepage">
        <h1>A smarter way to scroll.</h1>
        <p>Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.</p>
        <button onClick={handleStumbleClick} className="pressButton">
          PRESS TO GO HIGHER
        </button>

        <div onClick={handleQuestionClick} className="questionIcon">
          ?
        </div>
      </div>

      {/* StumbleHigher-2: How It Works Modal */}
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
                <strong>Explore and Learn</strong> - Discover inspiring content that helps you
                think differently, grow, and go higher.
              </li>
              <li>
                <strong>Press Again</strong> - Ready for more? Just press "Go Higher" to find your
                next discovery.
              </li>
              <li>
                <strong>Share the Inspiration</strong> - If you love what you find, share it with
                others to keep the inspiration going.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* StumbleHigher-3: Content Experience Page */}
      {resource && (
        <div className="content-page">
          <iframe src={resource.Link} />

          <footer>
            <div className="footer-left">
              <Link href="/">
                <a className="logo">Stumble Higher</a>
              </Link>
              <span className="resource-info">
                {resource.Title} by {resource.Author}
              </span>
            </div>
            <button onClick={handleStumbleClick} className="go-higher-button">
              Go Higher
            </button>
            <div className="footer-right">
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
        /* CSS styles for the components */
        .homepage {
          text-align: center;
          padding: 2rem;
        }

        .pressButton {
          padding: 1rem 2rem;
          font-size: 1.2rem;
          background-color: #ff6600;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .questionIcon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 5px;
          max-width: 500px;
        }

        .close {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .content-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        iframe {
          flex: 1;
          border: none;
        }

        footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f5f5f5;
        }

        .footer-left {
          display: flex;
          align-items: center;
        }

        .logo {
          font-family: 'Helvetica', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          margin-right: 1rem;
          text-decoration: none;
          color: black;
        }

        .resource-info {
          font-size: 0.9rem;
        }

        .go-higher-button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #ff6600;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .footer-right {
          display: flex;
          align-items: center;
        }

        .world-icon,
        .share-icon {
          font-size: 1.2rem;
          margin-left: 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
