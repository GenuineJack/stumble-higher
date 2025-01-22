import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const StumbleHigherApp = () => {
  const [resource, setResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Improved parsing function that handles the markdown table format
  const parseMarkdownTable = (tableContent) => {
    const rows = tableContent.split('\n').filter(row => row.trim() && !row.includes('|-'));
    const headers = rows[0].split('|').map(h => h.trim()).filter(Boolean);
    const items = rows.slice(1).map(row => {
      const values = row.split('|').map(cell => cell.trim()).filter(Boolean);
      return headers.reduce((obj, header, index) => {
        obj[header.toLowerCase()] = values[index] || '';
        return obj;
      }, {});
    });
    return items;
  };

  // Function to extract URL from markdown link format
  const extractUrl = (markdownLink) => {
    const match = markdownLink.match(/\[.*?\]\((.*?)\)/);
    return match ? match[1] : markdownLink;
  };

  const getRandomResource = async () => {
    setIsLoading(true);
    try {
      const content = await window.fs.readFile('stumble-higher-MASTER-resource-lists.md', { encoding: 'utf8' });
      const sections = content.split('##').slice(1);
      
      // Randomly select a section
      const randomSection = sections[Math.floor(Math.random() * sections.length)];
      
      // Get the content after the table header
      const tableContent = randomSection.split('\n\n')[1];
      
      // Parse the table and get random item
      const items = parseMarkdownTable(tableContent);
      const randomItem = items[Math.floor(Math.random() * items.length)];
      
      // Clean up the URL
      if (randomItem.link) {
        randomItem.url = extractUrl(randomItem.link);
      }
      
      setResource(randomItem);
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStumbleClick = () => {
    getRandomResource();
  };

  const handleWorldClick = () => {
    if (resource?.url) {
      window.open(resource.url, '_blank');
    }
  };

  const handleShareClick = () => {
    if (navigator.share && resource?.url) {
      navigator.share({
        title: resource.title,
        text: `Check out ${resource.title} by ${resource.author} on StumbleHigher.press!`,
        url: resource.url
      }).catch(console.error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!resource ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-4xl font-bold mb-4">STUMBLE HIGHER</h1>
          <p className="text-xl mb-2">A smarter way to scroll.</p>
          <p className="text-lg mb-8 text-gray-600 max-w-md text-center">
            Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.
          </p>
          <button
            onClick={handleStumbleClick}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition duration-200 hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'PRESS TO GO HIGHER'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <Card className="mb-4 p-6">
              <h2 className="text-2xl font-bold mb-2">{resource.title}</h2>
              <p className="text-gray-600 mb-4">by {resource.author}</p>
              <p className="mb-4">{resource.description}</p>
              <div className="flex space-x-4">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Visit Resource
                </a>
                <button
                  onClick={handleShareClick}
                  className="text-gray-500 hover:text-gray-600"
                >
                  Share
                </button>
              </div>
            </Card>
            <button
              onClick={handleStumbleClick}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition duration-200 hover:scale-105"
            >
              {isLoading ? 'Loading...' : 'Go Higher'}
            </button>
          </div>
        </div>
      )}
      
      <footer className="p-4 text-center text-gray-600">
        <a href="https://highermarket.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
          A Higher Market Project
        </a>
        {' | '}
        <a href="https://warpcast.com/genuinejack" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
          Built by Genuine Jack
        </a>
      </footer>
    </div>
  );
};

export default StumbleHigherApp;