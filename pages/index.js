<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stumble Higher</title>
  
  <!-- Warpcast Frame Integration Meta Tag -->
  <meta name="warpcast-frame" content="enabled">
  
  <!-- Set the viewport for responsive behavior -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Include the Marked library from a CDN to parse Markdown -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  
  <style>
    /* Basic styles for the table and page */
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      padding: 0;
      background: #f9f9f9;
    }
    h1 {
      text-align: center;
    }
    #app {
      max-width: 1000px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    table th, table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    table th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <div id="app">
    <h1>Stumble Higher Resources</h1>
    <!-- This div will be filled with the table from the markdown file -->
    <div id="content"></div>
  </div>
  
  <script>
    // Function to initialize the Warpcast frame integration.
    // When the page is loaded in Warpcast, this should trigger the Frames v2 effect.
    function initWarpcastFrame() {
      // Check if the WarpcastFrame object exists and has an initialize function.
      if (window.WarpcastFrame && typeof window.WarpcastFrame.initialize === 'function') {
        window.WarpcastFrame.initialize({
          // You can add any necessary configuration parameters here.
          mode: 'frame'
        });
      }
    }
    
    // Run the Warpcast frame initialization when the DOM is fully loaded.
    document.addEventListener('DOMContentLoaded', initWarpcastFrame);
    
    // Function to fetch and display the markdown table.
    async function loadMarkdownTable() {
      try {
        // Fetch the markdown file from the public folder.
        const response = await fetch('/stumble-higher-MASTER-resource-lists.md');
        const markdownText = await response.text();
        
        // Use marked to convert the markdown to HTML.
        const htmlContent = marked.parse(markdownText);
        
        // Create a temporary container to parse the HTML string.
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        // Look for the first table element in the converted HTML.
        const tableElement = tempDiv.querySelector('table');
        
        // If a table is found, insert it into our content div; otherwise, insert all content.
        const contentDiv = document.getElementById('content');
        if (tableElement) {
          contentDiv.appendChild(tableElement);
        } else {
          contentDiv.innerHTML = htmlContent;
        }
      } catch (error) {
        console.error('Error loading markdown file:', error);
        document.getElementById('content').innerText = 'Failed to load resources.';
      }
    }
    
    // Load the markdown table once the page has finished loading.
    document.addEventListener('DOMContentLoaded', loadMarkdownTable);
  </script>
</body>
</html>
