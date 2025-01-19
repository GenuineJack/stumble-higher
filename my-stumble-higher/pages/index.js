import { useState, useEffect } from 'react';

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
      <h1>A smarter way to scroll.</h1>
      <p>Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.</p>
      <button onClick={handleStumbleClick} className="pressButton">
        PRESS TO GO HIGHER
      </button>

      <div onClick={handleQuestionClick} className="questionMark">
        ?
      </div>

      {resource && (
        <>
          <iframe src={resource.Link} />

          <footer>
            <div id="left">
              <a href="https://highermarket.xyz/" target="_blank">
                A Higher Market Project
              </a>{' '}
              | <span id="resource-title">{resource.Title}</span> by{' '}
              <span id="resource-author">{resource.Author}</span>
            </div>
            <button onClick={handleStumbleClick}>Go Higher</button>
            <div id="right">
              <span onClick={handleWorldClick} title="Open in New Tab">
                🌐
              </span>
              <span onClick={handleShareClick} title="Share">
                📢
              </span>
            </div>
          </footer>
        </>
      )}

      {modalOpen && (
        <div id="modal">
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

      <style jsx>{`
        /* ... existing styles ... */
      `}</style>
    </div>
  );
}
