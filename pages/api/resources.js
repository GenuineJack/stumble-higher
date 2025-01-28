import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'resources.json'); // Point to JSON file

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // Parse the JSON file
    res.status(200).json(data); // Serve the data
  } catch (error) {
    console.error('Error reading resources.json:', error);
    res.status(500).json({ error: 'Failed to load resources' });
  }
}
