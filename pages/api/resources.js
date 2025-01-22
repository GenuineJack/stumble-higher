import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'stumble-higher-MASTER-resource-lists.md');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json({ content: data });
  } catch (error) {
    console.error('Error reading the resource file:', error);
    res.status(500).json({ error: 'Failed to read the resource file' });
  }
}
