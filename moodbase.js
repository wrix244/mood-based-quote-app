document.addEventListener("DOMContentLoaded", () => {
  const moodData = {
    happy: {
      quote: "Smile. It’s the key that fits the lock on everyone’s heart. 😊",
    },
    upset: {
      quote: "Whenever you're upset, just remember I'm here — As always. 🌧️❤️",
    },
    chill: {
      quote: "No rush. No pressure. Just vibes. 😌🌿",
    },
    angry: {
      quote: "I'm not arguing, I'm just explaining how wrong you are. 😡💢",
    },
  };

  // Mood Quote Buttons
  const quoteEl = document.getElementById("quote");
  document.querySelectorAll("button[data-mood]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = btn.getAttribute("data-mood");
      quoteEl.textContent = moodData[mood]?.quote || "No quote available.";
    });
  });

  // Music
  const music = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("toggle-music");
  const volumeControl = document.getElementById("volume-control");
  const startNotice = document.getElementById("start-notice");

  const enableMusic = () => {
    music.play().catch(() => {
      console.log("Autoplay blocked.");
    });
    if (startNotice) startNotice.style.display = "none";
    document.removeEventListener("click", enableMusic);
    document.removeEventListener("touchstart", enableMusic);
  };

  document.addEventListener("click", enableMusic, { once: true });
  document.addEventListener("touchstart", enableMusic, { once: true });

  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleBtn.textContent = "Pause Music";
    } else {
      music.pause();
      toggleBtn.textContent = "Play Music";
    }
  });

  volumeControl.addEventListener("input", (e) => {
    music.volume = e.target.value;
  });

  // Drawing Canvas
  const canvas = document.getElementById("drawCanvas");
  const ctx = canvas.getContext("2d");
  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseout", endPosition);

  document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvasToDisplaySize() {
  // Get the CSS size
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Only resize if the actual size differs from the display size
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

resizeCanvasToDisplaySize();
