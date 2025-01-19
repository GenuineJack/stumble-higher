
import { useState, useEffect } from 'react';

export default function Home() {
  const [resource, setResource] = useState(null);

  // Fetch the resources JSON
  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/resources.json'); // Adjust the path if hosting JSON elsewhere
        const data = await response.json();
        setResource(getRandomResource(data));
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    }

    fetchResources();
  }, []);

  // Function to get a random resource from the JSON
  function getRandomResource(resources) {
    const categories = Object.keys(resources);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const items = resources[randomCategory];
    return items[Math.floor(Math.random() * items.length)];
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>PRESS TO GO HIGHER</h1>
      {resource ? (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
          <h2 style={{ color: '#007acc' }}>{resource.title}</h2>
          <p><strong>Author:</strong> {resource.author}</p>
          <p><strong>Year:</strong> {resource.year}</p>
          <p>{resource.description}</p>
          <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007acc', textDecoration: 'none' }}>Learn More</a>
        </div>
      ) : (
        <p>aiming higher...</p>
      )}
      <button
        onClick={() => setResource(getRandomResource(resource))}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007acc', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Go Higher
      </button>
    </div>
  );
}
