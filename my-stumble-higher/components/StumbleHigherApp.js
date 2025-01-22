import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Papa from 'papaparse';
import _ from 'lodash';
import { Globe, Share2, HelpCircle } from 'lucide-react';

const StumbleHigherApp = () => {
  const [resource, setResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const parseMarkdownTable = (content) => {
    const sections = content.split('##').slice(1);
    const allResources = sections.flatMap(section => {
      const tableContent = section.split('\n\n')[1];
      const rows = tableContent.split('\n').filter(row => row.trim() && !row.includes('|-'));
      const headers = rows[0].split('|').map(h => h.trim()).filter(Boolean);
      
      return rows.slice(1).map(row => {
        const values = row.split('|').map(cell => cell.trim()).filter(Boolean);
        return headers.reduce((obj, header, index) => {
          obj[header.toLowerCase()] = values[index] || '';
          return obj;
        }, {});
      });
    });
    return allResources;
  };

  const extractUrl = (markdownLink) => {
    const match = markdownLink.match(/\[.*?\]\((.*?)\)/);
    return match ? match[1] : markdownLink;
  };

  const getRandomResource = async () => {
    setIsLoading(true);
    try {
      const response = await window.fs.readFile('stumble-higher-MASTER-resource-lists.md', { encoding: 'utf8' });
      const resources = parseMarkdownTable(response);
      const randomResource = resources[Math.floor(Math.random() * resources.length)];
      
      if (randomResource.link) {
        randomResource.url = extractUrl(randomResource.link);
      }
      
      setResource(randomResource);
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && resource) {
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
            onClick={getRandomResource}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition duration-200 hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'PRESS TO GO HIGHER'}
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <HelpCircle size={24} />
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
                  <Globe size={20} />
                </a>
                <button
                  onClick={handleShare}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </Card>
            <button
              onClick={getRandomResource}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition duration-200 hover:scale-105"
            >
              {isLoading ? 'Loading...' : 'Go Higher'}
            </button>
          </div>
        </div>
      )}
      
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">How It Works</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <ol className="space-y-4">
              <li><strong>Press the Button</strong> – Hit "PRESS TO GO HIGHER" to start your journey.</li>
              <li><strong>Explore and Learn</strong> – Discover inspiring content that helps you think differently.</li>
              <li><strong>Press Again</strong> – Ready for more? Just press "Go Higher" to find your next discovery.</li>
              <li><strong>Share the Inspiration</strong> – If you love what you find, share it with others.</li>
            </ol>
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
