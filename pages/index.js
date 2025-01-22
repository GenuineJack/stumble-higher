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
      const response = await fetch('/stumble-higher-MASTER-resource-lists.md');
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
  }

  function getRandomResource(resources) {
    const categories = Object.keys(resources);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const items = resources[randomCategory];
    return items[Math.floor(Math.random() * items.length)];
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
    <div className="container">
      {!resource ? (
        <>
          <div className="homepage">
            <h1 className="logo">STUMBLE HIGHER</h1>
            <p className="tagline">A better way to scroll.</p>
            <p className="description">
              Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.
            </p>
            <button onClick={handleStumbleClick} className="press-button">
              PRESS TO GO HIGHER
            </button>
            <div onClick={handleQuestionClick} className="question-icon">
              ?
            </div>
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
        </>
      ) : (
        <>
          <div className="content-page">
            <iframe src={resource.Link} className="content-iframe" />
            <footer className="footer">
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
        </>
      )}

      <footer className="app-footer">
        <Link href="https://highermarket.xyz/">
          <a target="_blank">A Higher Market Project</a>
        </Link>
        {' | '}
        <Link href="https://warpcast.com/genuinejack">
          <a target="_blank">Built by Genuine Jack</a>
        </Link>
      </footer>

      <style jsx>{`
        /* Styles omitted for brevity */
      `}</style>
    </div>
  );
}
