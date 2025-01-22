// Updated StumbleHigherApp.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tooltip from '../components/Tooltip';
import LoadingSpinner from '../components/LoadingSpinner';

const StumbleHigherApp = () => {
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch and parse the updated resources
  const fetchRandomResource = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/stumble-higher-MASTER-resource-lists.md');
      if (!response.ok) throw new Error('Failed to load resource list');

      const text = await response.text();

      // Parse the Markdown table
      const rows = text.split('\n').filter(line => line.includes('|'));
      const headers = rows[0].split('|').map(col => col.trim());
      const data = rows.slice(2).map(row => {
        const values = row.split('|').map(col => col.trim());
        return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
      });

      // Select a random resource
      const randomResource = data[Math.floor(Math.random() * data.length)];

      // Extract URL from Markdown link
      const urlMatch = randomResource.Link.match(/\((http.*?)\)/);
      const url = urlMatch ? urlMatch[1] : null;

      if (!url) throw new Error('Invalid resource URL');

      setResource({ ...randomResource, url });
    } catch (err) {
      console.error(err);
      setError('Unable to fetch a random resource. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Welcome to Stumble Higher</h1>
      <button className="go-higher-button" onClick={fetchRandomResource} disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Go Higher!'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {resource && (
        <div className="resource-container">
          <iframe
            title={resource.Title}
            src={resource.url}
            className="resource-iframe"
          ></iframe>
          <div className="resource-details">
            <h2>{resource.Title}</h2>
            <p>{resource.Description}</p>
            <Tooltip content={`Category: ${resource.Category}`}>
              <span>Learn more about {resource.Category}</span>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default StumbleHigherApp;
