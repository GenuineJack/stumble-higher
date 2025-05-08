let resources = [];

// Function to fetch resource data from the external JSON file.
function loadResources() {
  fetch('stumble-higher-resources-final-1.json')
    .then(response => response.json())
    .then(data => {
      // Filter out header rows or invalid entries.
      resources = data.Books.filter(item => item.id !== "title" && !item.id.startsWith("-"));
      if (resources.length === 0) {
        console.error("No valid resources found.");
      } else {
        loadRandomResource();
      }
    })
    .catch(error => {
      console.error('Error loading resource data:', error);
    });
}

// Utility to select a random resource from the array.
function getRandomResource() {
  if (resources.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * resources.length);
  return resources[randomIndex];
}

// We'll keep track of the currently displayed resource here.
let currentResource = null;

function showLoadingSpinner() {
  document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoadingSpinner() {
  document.getElementById('loading-spinner').classList.add('hidden');
}

// Load a random resource into the iframe and update the footer.
function loadRandomResource() {
  const resource = getRandomResource();
  if (!resource) {
    console.error("No resource to load.");
    return;
  }

  // Show the spinner immediately.
  showLoadingSpinner();

  currentResource = resource;
  document.getElementById('resource-info').textContent = `${resource.id} by ${resource.title}`;

  // Grab the iframe and set its src.
  const iframe = document.getElementById('resource-iframe');
  iframe.src = resource.author;

  // Set up a fallback in case the iframe never fires onload.
  const loadTimeout = setTimeout(() => {
    console.warn("Resource took too long to load. Skipping to the next resource...");
    hideLoadingSpinner();
    loadRandomResource(); // Skip to the next resource automatically.
  }, 5000);

  // onload: if the resource loads, clear the timeout and hide the spinner.
  iframe.onload = () => {
    clearTimeout(loadTimeout);
    hideLoadingSpinner();
    console.log("Resource loaded successfully:", resource);
  };

  // onerror: if an error occurs, skip to the next resource.
  // (Note: For cross-domain iframes, this may or may not trigger.)
  iframe.onerror = () => {
    clearTimeout(loadTimeout);
    hideLoadingSpinner();
    console.warn("Error loading resource. Skipping to next resource...");
    loadRandomResource();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  loadResources();

  // "Go Higher" button loads another random resource.
  document.getElementById('new-resource-btn').addEventListener('click', loadRandomResource);

  // "Open in New Tab" button
  document.getElementById('open-tab-btn').addEventListener('click', () => {
    if (currentResource && currentResource.author) {
      window.open(currentResource.author, '_blank');
    }
  });

  // "Share" button
  document.getElementById('share-btn').addEventListener('click', () => {
    if (navigator.share && currentResource) {
      navigator.share({
        title: currentResource.id,
        text: `Check out "${currentResource.id}" by ${currentResource.title} on Stumble Higher!`,
        url: currentResource.author
      }).catch(error => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on your browser. Please copy the URL: ' + currentResource.author);
    }
  });
});
