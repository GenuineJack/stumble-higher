function parseResources(markdownData) {
  try {
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
  } catch (error) {
    console.error('Error parsing resources:', error);
    return {};
  }
}

function getRandomResource(resources) {
  const categories = Object.keys(resources);
  if (categories.length === 0) return null; // Handle empty resources gracefully
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const items = resources[randomCategory];
  return items[Math.floor(Math.random() * items.length)];
}

// Ensure that if 'resource' is null, a fallback UI is shown
{!resource ? (
  // Existing fallback homepage JSX here
) : resource.Link ? (
  // Content experience if resource is valid
  <iframe src={resource.Link} className="content-iframe" />
) : (
  <div>Error: Invalid resource data</div>
)}
