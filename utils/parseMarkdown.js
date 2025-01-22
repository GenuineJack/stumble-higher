/**
 * Parse markdown table content into structured data
 * @param {string} tableContent - Raw markdown table content
 * @returns {Array} Parsed table data as array of objects
 */
export const parseMarkdownTable = (tableContent) => {
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
    console.error('Error parsing markdown table:', error);
    throw new Error('Failed to parse markdown table data');
  }
};

/**
 * Extract URL from markdown link format
 * @param {string} markdownLink - Markdown formatted link
 * @returns {string} Extracted URL
 */
export const extractUrl = (markdownLink) => {
  try {
    const match = markdownLink.match(/\[.*?\]\((.*?)\)/);
    return match ? match[1] : markdownLink;
  } catch (error) {
    console.error('Error extracting URL:', error);
    return markdownLink;
  }
};

/**
 * Filter resources by category
 * @param {Array} resources - Array of resource objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered resources
 */
export const filterResourcesByCategory = (resources, category) => {
  if (!category || category === 'All') {
    return resources;
  }
  return resources.filter(resource => 
    resource.category.toLowerCase().includes(category.toLowerCase())
  );
};

/**
 * Get random item from array
 * @param {Array} array - Array to select from
 * @returns {*} Random item from array
 */
export const getRandomItem = (array) => {
  if (!array || array.length === 0) {
    throw new Error('Empty or invalid array');
  }
  return array[Math.floor(Math.random() * array.length)];
};