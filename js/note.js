import { notes, gifs } from './wordings.js';

let currentIndex = 0;

// Create falling hearts
function createHeart() {
  const heart = document.createElement("div");
  const heartSymbols = ["❤️", "💖", "💕", "💗", "💓", "💝"];
  heart.innerHTML =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.className = "heart-rain";

  // Random starting position
  const startX = Math.random() * window.innerWidth;
  heart.style.left = `${startX}px`;

  // Random ending position (swaying effect)
  const finalX = (Math.random() - 0.5) * 200;
  heart.style.setProperty("--finalX", `${finalX}px`);

  // Random duration
  const duration = Math.random() * 2 + 3;
  heart.style.animationDuration = `${duration}s`;

  document.body.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => heart.remove(), duration * 1000);
}

// Initialize content and progress dots
function initialize() {
  updateContent();
  createProgressDots();
  // Start creating hearts
  setInterval(createHeart, 300);
}

// Update both note and GIF
function updateContent() {
  updateNote();
  updateGIF();
  updateProgressDots();
  if (currentIndex === 4) {
    document.getElementById("nextPageButton").classList.remove("hidden");
  } else {
    document.getElementById("nextPageButton").classList.add("hidden");
  }
}

// Update the love note with animation
function updateNote() {
  const noteText = document.getElementById("noteText");
  gsap.to(noteText, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    onComplete: () => {
      noteText.textContent = notes[currentIndex];
      gsap.to(noteText, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out",
      });
    },
  });
}

// Update the GIF display
function updateGIF() {
  const gifImg = document.getElementById("gifDisplay");
  gsap.to(gifImg, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    onComplete: () => {
      gifImg.src = gifs[currentIndex];
      gsap.to(gifImg, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out",
      });
    },
  });
}

// Create progress dots
function createProgressDots() {
  const container = document.getElementById("progressDots");
  for (let i = 0; i < notes.length; i++) {
    const dot = document.createElement("div");
    dot.className = "w-3 h-3 rounded-full bg-pink-300";
    container.appendChild(dot);
  }
}

// Update progress dots
function updateProgressDots() {
  const dots = document.querySelectorAll("#progressDots div");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.className = "w-3 h-3 rounded-full bg-pink-500 beating";
    } else {
      dot.className = "w-3 h-3 rounded-full bg-pink-300";
    }
  });
}

// Handle next button click
document.getElementById("nextButton").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % notes.length;
  updateContent();
});

// Handle next page button click
document.getElementById("nextPageButton").addEventListener("click", () => {
  gsap.to("body", {
    opacity: 0,
    duration: 1,
    onComplete: () => (window.location.href = "Photo.html"),
  });
});

// Initialize the page
initialize();