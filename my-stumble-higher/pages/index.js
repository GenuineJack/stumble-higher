import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [resource, setResource] = useState(null);

  const resources = [
    { url: 'https://example1.com', title: 'Inspiring Article 1', author: 'Author A' },
    { url: 'https://example2.com', title: 'Inspiring Article 2', author: 'Author B' },
    { url: 'https://example3.com', title: 'Inspiring Article 3', author: 'Author C' },
  ];

  const getRandomResource = () => {
    const randomResource = resources[Math.floor(Math.random() * resources.length)];
    setResource(randomResource);
  };

  return (
    <div>
      <Head>
        <title>Stumble Higher</title>
      </Head>
      <div id="main-container">
        <h1>A smarter way to scroll.</h1>
        <p>Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.</p>
        <button onClick={getRandomResource} className="button">
          PRESS TO GO HIGHER
        </button>
        {resource && (
          <iframe
            id="stumble-iframe"
            src={resource.url}
            title={resource.title}
            style={{ width: '90%', height: '70vh', border: '2px solid #ddd', margin: '20px 0' }}
          ></iframe>
        )}
      </div>
      <footer>
        <div>
          Stumble Higher &copy; 2025 | Built by Genuine Jack
        </div>
      </footer>
    </div>
  );
}
