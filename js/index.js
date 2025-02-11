// Create falling teddies with hearts
function createTeddyRain() {
  const elements = ["🧸", "💗", "✨", "🎀", "🐢", "🐥"];
  const teddy = document.createElement("div");
  teddy.innerHTML = elements[Math.floor(Math.random() * elements.length)];
  teddy.className = "teddy-rain text-2xl";
  teddy.style.left = Math.random() * 100 + "vw";
  teddy.style.animationDuration = Math.random() * 3 + 2 + "s";
  document.body.appendChild(teddy);

  setTimeout(() => {
    teddy.remove();
  }, 5000);
}

// Start teddy rain
setInterval(createTeddyRain, 400);

// Main teddy interaction with sparkle effect
const mainDuck = document.getElementById("mainDuck");
mainDuck.addEventListener("click", () => {
  mainDuck.classList.add("scale-125");
  createSparkles();
  setTimeout(() => {
    mainDuck.classList.remove("scale-125");
  }, 200);
});

function createSparkles() {
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "absolute";
    sparkle.style.left = "50%";
    sparkle.style.top = "50%";
    sparkle.style.transform = `translate(-50%, -50%) rotate(${
      Math.random() * 360
    }deg)`;
    sparkle.style.animation = "float 1s ease-out forwards";
    mainDuck.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

// Surprise message with enhanced animation
setTimeout(() => {
  const surprise = document.getElementById("surprise");
  surprise.classList.remove("hidden");
  gsap.from(surprise, {
    scale: 0,
    rotation: 360,
    duration: 1,
    ease: "elastic.out(1, 0.5)",
  });
  setTimeout(() => {
    gsap.to(surprise, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => surprise.classList.add("hidden"),
    });
  }, 2000); // Show for 2 seconds
}, 2000); // Show after 2 seconds

// Next button interaction with rainbow trail
document.getElementById("nextButton").addEventListener("click", () => {
  gsap.to("body", {
    opacity: 0,
    duration: 1,
    onComplete: () => (window.location.href = "Note.html"),
  });
});