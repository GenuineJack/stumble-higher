import { parseMarkdownTable, extractUrl, filterResourcesByCategory, getRandomItem } from '../utils/parseMarkdown';

describe('parseMarkdownTable', () => {
  it('should parse markdown table correctly', () => {
    const input = `
| ID | Title | Author |
|----|-------|--------|
| 1 | Book 1 | Author 1 |
| 2 | Book 2 | Author 2 |
    `.trim();
    
    const result = parseMarkdownTable(input);
    expect(result).toEqual([
      { id: '1', title: 'Book 1', author: 'Author 1' },
      { id: '2', title: 'Book 2', author: 'Author 2' }
    ]);
  });

  it('should throw error for invalid table format', () => {
    const input = 'invalid table';
    expect(() => parseMarkdownTable(input)).toThrow();
  });
});

describe('extractUrl', () => {
  it('should extract URL from markdown link', () => {
    const input = '[Link Text](https://example.com)';
    const result = extractUrl(input);
    expect(result).toBe('https://example.com');
  });

  it('should return original text if not markdown link', () => {
    const input = 'https://example.com';
    const result = extractUrl(input);
    expect(result).toBe('https://example.com');
  });

  it('should handle empty string', () => {
    const result = extractUrl('');
    expect(result).toBe('');
  });
});

describe('filterResourcesByCategory', () => {
  const resources = [
    { title: 'Book 1', category: 'Fiction' },
    { title: 'Book 2', category: 'Non-Fiction' },
    { title: 'Book 3', category: 'Fiction/Fantasy' }
  ];

  it('should filter resources by category', () => {
    const result = filterResourcesByCategory(resources, 'Fiction');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Book 1');
    expect(result[1].title).toBe('Book 3');
  });

  it('should return all resources for "All" category', () => {
    const result = filterResourcesByCategory(resources, 'All');
    expect(result).toHaveLength(3);
  });

  it('should return empty array for non-matching category', () => {
    const result = filterResourcesByCategory(resources, 'Mystery');
    expect(result).toHaveLength(0);
  });

  it('should ignore case when filtering', () => {
    const result = filterResourcesByCategory(resources, 'fiction');
    expect(result).toHaveLength(2);
  });
});

describe('getRandomItem', () => {
  it('should return a random item from array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getRandomItem(array);
    expect(array).toContain(result);
  });

  it('should throw error for empty array', () => {
    expect(() => getRandomItem([])).toThrow();
  });

  it('should throw error for null/undefined input', () => {
    expect(() => getRandomItem(null)).toThrow();
    expect(() => getRandomItem(undefined)).toThrow();
  });
});