const resources = [
  { url: "https://example1.com", title: "Inspiring Article 1", author: "Author A" },
  { url: "https://example2.com", title: "Inspiring Article 2", author: "Author B" },
  { url: "https://example3.com", title: "Inspiring Article 3", author: "Author C" },
];

function getRandomResource() {
  return resources[Math.floor(Math.random() * resources.length)];
}

const iframe = document.getElementById("stumble-iframe");
const stumbleButton = document.getElementById("stumble-button");
const worldIcon = document.getElementById("world-icon");
const shareIcon = document.getElementById("share-icon");

stumbleButton.addEventListener("click", () => {
  const resource = getRandomResource();
  iframe.src = resource.url;
});

worldIcon.addEventListener("click", () => {
  if (iframe.src) window.open(iframe.src, "_blank");
});

shareIcon.addEventListener("click", () => {
  if (navigator.share && iframe.src) {
    navigator.share({
      title: "Check this out on Stumble Higher!",
      url: iframe.src,
    });
  } else {
    alert("Sharing is not supported on this device.");
  }
});

const modal = document.getElementById("how-it-works");
const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("close-modal");

document.querySelector("#stumble-button").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  modal.classList.add("active");
  overlay.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
