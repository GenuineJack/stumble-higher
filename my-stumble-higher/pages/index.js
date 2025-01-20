import { useState, useEffect } from 'react';

export default function Home() {
  const [resources, setResources] = useState(null);
  const [resource, setResource] = useState(null);

  // Fetch resources on load
  useEffect(() => {
    async function loadResources() {
      try {
        const response = await fetch('/resources.json');
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error loading resources:', error);
      }
    }
    loadResources();
  }, []);

  // Get a random resource
  function getRandomResource(resources) {
    const categories = Object.keys(resources).filter(cat => resources[cat].length > 0);
    if (categories.length === 0) return null;

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const items = resources[randomCategory];
    return items[Math.floor(Math.random() * items.length)];
  }

  // Handle the "Press to Go Higher" button
  function handleStumbleClick() {
    if (!resources) {
      alert("Resources are not loaded yet. Please wait.");
      return;
    }

    const randomResource = getRandomResource(resources);
    if (randomResource) {
      setResource(randomResource);
    } else {
      alert("No resources available to show. Please try again later.");
    }
  }

  return (
    <div className="container">
      <h1 className="logo">STUMBLE HIGHER</h1>
      <p className="tagline">Explore curated ideas to inspire your higher self.</p>
      {!resource ? (
        <button onClick={handleStumbleClick} className="press-button">Press to Go Higher</button>
      ) : (
        <div className="content">
          <iframe src={resource.link} title={resource.title} className="stumble-iframe"></iframe>
        </div>
      )}
    </div>
  );
}
