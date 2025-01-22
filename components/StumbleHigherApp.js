import React, { useState, useEffect, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import LoadingSpinner from '@/components/LoadingSpinner';
import Tooltip from '@/components/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, ExternalLink, HelpCircle } from 'lucide-react';
import Papa from 'papaparse';
import _ from 'lodash';

const CATEGORIES = [
  'All',
  'Creative Process',
  'Business/Innovation',
  'Design',
  'Personal Development',
  'Psychology',
  'Technology'
];

const StumbleHigherApp = () => {
  const [resource, setResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [resources, setResources] = useState([]);
  const [announcement, setAnnouncement] = useState('');

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };

  // Announce changes to screen readers
  useEffect(() => {
    if (announcement) {
      const timeout = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timeout);
    }
  }, [announcement]);

  const parseMarkdownTable = (tableContent) => {
    try {
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
    } catch (error) {
      console.error('Error parsing table:', error);
      throw new Error('Failed to parse resource data');
    }
  };

  const extractUrl = (markdownLink) => {
    try {
      const match = markdownLink.match(/\[.*?\]\((.*?)\)/);
      return match ? match[1] : markdownLink;
    } catch (error) {
      console.error('Error extracting URL:', error);
      return markdownLink;
    }
  };

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const content = await window.fs.readFile('stumble-higher-MASTER-resource-lists.md', { encoding: 'utf8' });
      const sections = content.split('##').slice(1);
      let allResources = [];
      
      sections.forEach(section => {
        const tableContent = section.split('\n\n')[1];
        if (tableContent) {
          const items = parseMarkdownTable(tableContent);
          allResources = [...allResources, ...items];
        }
      });
      
      setResources(allResources);
      setAnnouncement('Resources loaded successfully');
    } catch (error) {
      console.error('Error loading resources:', error);
      setError('Failed to load resources. Please try again later.');
      setAnnouncement('Error loading resources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const getRandomResource = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      let filteredResources = resources;
      
      if (selectedCategory !== 'All') {
        filteredResources = resources.filter(r => 
          r.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }
      
      if (filteredResources.length === 0) {
        throw new Error('No resources found in selected category');
      }
      
      const randomItem = filteredResources[Math.floor(Math.random() * filteredResources.length)];
      
      if (randomItem.link) {
        randomItem.url = extractUrl(randomItem.link);
      }
      
      setResource(randomItem);
      setAnnouncement(`Now showing: ${randomItem.title} by ${randomItem.author}`);
    } catch (error) {
      console.error('Error getting random resource:', error);
      setError(error.message || 'Failed to get resource. Please try again.');
      setAnnouncement('Error getting resource');
    } finally {
      setIsLoading(false);
    }
  }, [resources, selectedCategory]);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setResource(null);
    setAnnouncement(`Category changed to ${category}`);
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleStumbleClick();
    }
  }, [handleStumbleClick]);

  return (
    <div className="min-h-screen bg-white">
      {/* Accessibility announcement region */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AnimatePresence mode="wait">
        {!resource ? (
          <motion.div
            key="home"
            {...fadeIn}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            <h1 className="text-4xl font-bold mb-4">STUMBLE HIGHER</h1>
            <p className="text-xl mb-2">A smarter way to scroll.</p>
            <p className="text-lg mb-8 text-gray-600 max-w-md text-center">
              Stumble into curated ideas that elevate your mind, inspire your journey, and take you higher.
            </p>
            
            <div className="mb-4 w-full max-w-xs">
              <label htmlFor="category-select" className="sr-only">
                Choose a category
              </label>
              <Select
                id="category-select"
                value={selectedCategory}
                onValueChange={handleCategoryChange}
                options={CATEGORIES}
                placeholder="Select Category"
                aria-label="Resource category"
              />
            </div>

            <button
              onClick={handleStumbleClick}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              aria-busy={isLoading}
              className={`group bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className={`inline-flex items-center ${isLoading ? 'invisible' : ''}`}>
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  'PRESS TO GO HIGHER'
                )}
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            {...fadeIn}
            className="flex flex-col min-h-screen"
          >
            <div className="flex-1 p-4">
              <Card className="mb-4 p-6">
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <p className="text-gray-600">by {resource.author}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.category.split('/').map((cat) => (
                      <span
                        key={cat}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                        role="tag"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <Tooltip content="Open in new tab">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 inline-flex items-center"
                        aria-label={`Visit ${resource.title} (opens in new tab)`}
                      >
                        Visit Resource <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </Tooltip>
                    <Tooltip content="Share this resource">
                      <button
                        onClick={handleShareClick}
                        className="text-gray-500 hover:text-gray-600 inline-flex items-center"
                        aria-label="Share resource"
                      >
                        Share <Share2 className="ml-1 h-4 w-4" />
                      </button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
              <button
                onClick={handleStumbleClick}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                aria-busy={isLoading}
                className="w-full group bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105"
              >
                <span className={`inline-flex items-center ${isLoading ? 'invisible' : ''}`}>
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Go Higher'
                  )}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-4 text-center text-gray-600">
        <a 
          href="https://highermarket.xyz/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-900"
          aria-label="Visit Higher Market website"
        >
          A Higher Market Project
        </a>
        {' | '}
        <a 
          href="https://warpcast.com/genuinejack" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-900"
          aria-label="Visit Genuine Jack's Warpcast profile"
        >
          Built by Genuine Jack
        </a>
      </footer>

      <Tooltip content="Help">
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-4 right-4 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
          aria-label="Open help modal"
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </Tooltip>
    </div>
  );
};

export default StumbleHigherApp;