import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'resources.json'); // Updated path to the JSON file

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // Parse the JSON file
    res.status(200).json(data); // Return the JSON content
  } catch (error) {
    console.error('Error reading the resource file:', error);
    res.status(500).json({ error: 'Failed to read the resource file' });
  }
}
