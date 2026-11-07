const PIN = "08112008";

const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");
const pinInput = document.getElementById("pin-input");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");

function login() {
  if (pinInput.value === PIN) {
    loginScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    loginError.textContent = "Hmm... wrong PIN. Try again ";
    pinInput.value = "";
    pinInput.focus();
  }
}
loginButton.addEventListener("click", login);
pinInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") login();
});

// LETTER MODAL
const letterModal = document.getElementById("letter-modal");
const openLetter = document.getElementById("open-letter");

openLetter.addEventListener("click", () => {
  letterModal.classList.add("show");
});

// POEM MODALS
document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.open);
    if (modal) modal.classList.add("show");
  });
});

// CLOSE ALL MODALS
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.close).classList.remove("show");
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("show");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
  }
});

/* ========================================
   FLOWER GARDEN INTERACTION
======================================== */

const flowerField = document.getElementById("flower-field");
const gardenMessage = document.getElementById("garden-message");
const resetButton = document.getElementById("garden-reset");

const flowerMessages = {
 "🌼": "I'm glad I get to know you, love.",
 "🌷": "Hope you have a lovely day.",
 "🌻": "You make things feel a brighter.",
 "🌸": "A little reminder that I adore you."
};

document.querySelectorAll(".flower-button").forEach(button => {
  button.addEventListener("click", () => {
    const flower = button.dataset.flower;

    const bloom = document.createElement("span");
    bloom.className = "bloom";
    bloom.textContent = flower;
    bloom.setAttribute("aria-label", "A flower blooming");

    flowerField.appendChild(bloom);

    gardenMessage.style.opacity = "0";
    gardenMessage.style.transform = "translate(-50%, -40%)";

    setTimeout(() => {
      gardenMessage.textContent = flowerMessages[flower];
      gardenMessage.style.opacity = "1";
      gardenMessage.style.transform = "translate(-50%, -50%)";
    }, 180);

    if (flowerField.children.length > 24) {
      flowerField.removeChild(flowerField.firstElementChild);
    }
  });
});

resetButton.addEventListener("click", () => {
  flowerField.innerHTML = "";

  gardenMessage.style.opacity = "0";

  setTimeout(() => {
    gardenMessage.textContent = "A little garden, waiting for you...";
    gardenMessage.style.opacity = "1";
    gardenMessage.style.transform = "translate(-50%, -50%)";
  }, 180);
});

// MUSIC PLAYER
const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const musicStatus = document.getElementById("music-status");
const musicDisc = document.querySelector(".music-disc");

const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

const prevButton = document.getElementById("music-prev");
const nextButton = document.getElementById("music-next");
const playlistContainer = document.getElementById("music-playlist");

// SONG LIST
const songs = [
  {
    title: "Birthday",
    artist: "Katy Perry",
    file: "assets/Birthday.mp3"
  },
  {
    title: "I Like Me Better",
    artist: "Lauv",
    file: "assets/I Like Me Better.mp3"
  },
  {
    title: "Glue Song",
    artist: "beabadoobee",
    file: "assets/Glue Song.mp3"
  },
  {
    title: "18",
    artist: "One Direction",
    file: "assets/18.mp3"
  },
  {
    title: "It's Magic",
    artist: "Lyla",
    file: "assets/Magic.mp3"
  }
];

let currentSong = 0;

// LOAD SONG
function loadSong(index) {
  currentSong = (index + songs.length) % songs.length;

  const song = songs[currentSong];

  music.src = song.file;
  trackTitle.textContent = song.title;
  trackArtist.textContent = song.artist;

  updatePlaylist();
}

// PLAY SONG
async function playSong() {
  try {
    await music.play();

    musicButton.textContent = "Pause the song ♫";
    musicStatus.textContent = "Now playing something special ♡";
    musicDisc.classList.add("playing");

  } catch (error) {
    musicStatus.textContent = "Unable to play this song. Check the file path.";
  }
}

// PAUSE SONG
function pauseSong() {
  music.pause();

  musicButton.textContent = "Play the song ♫";
  musicStatus.textContent = "Paused for a little while.";
  musicDisc.classList.remove("playing");
}

// PLAY / PAUSE BUTTON
musicButton.addEventListener("click", () => {
  if (music.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// NEXT SONG
nextButton.addEventListener("click", () => {
  loadSong(currentSong + 1);
  playSong();
});

// PREVIOUS SONG
prevButton.addEventListener("click", () => {
  loadSong(currentSong - 1);
  playSong();
});

// AUTO NEXT WHEN SONG ENDS
music.addEventListener("ended", () => {
  loadSong(currentSong + 1);
  playSong();
});

// UPDATE PLAYLIST DISPLAY
function updatePlaylist() {
  playlistContainer.innerHTML = "";

  songs.forEach((song, index) => {
    const item = document.createElement("button");

    item.className = "playlist-item";
    item.textContent = `${String(index + 1).padStart(2, "0")}  ${song.title}`;

    if (index === currentSong) {
      item.classList.add("active");
    }

    item.addEventListener("click", () => {
      loadSong(index);
      playSong();
    });

    playlistContainer.appendChild(item);
  });
}

// INITIALIZE
loadSong(0);
// MUSIC PROGRESS
const progressFill = document.getElementById("progress-fill");
const progressContainer = document.getElementById("progress-container");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

function formatTime(time) {
  if (!Number.isFinite(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

// UPDATE PROGRESS
music.addEventListener("timeupdate", () => {
  if (!music.duration) return;

  const percentage = (music.currentTime / music.duration) * 100;

  progressFill.style.width = `${percentage}%`;
  currentTimeDisplay.textContent = formatTime(music.currentTime);
});

// SHOW DURATION
music.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(music.duration);
  progressFill.style.width = "0%";
  currentTimeDisplay.textContent = "0:00";
});

// CLICK PROGRESS BAR TO SEEK
progressContainer.addEventListener("click", (event) => {
  if (!music.duration) return;

  const rect = progressContainer.getBoundingClientRect();
  const position = (event.clientX - rect.left) / rect.width;

  music.currentTime = position * music.duration;
});

// REVEAL ANIMATION
const revealElements = document.querySelectorAll(
  ".section-heading, .letter-paper, .poem-card, .garden-box, .music-card"
);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
// =========================================
// LITTLE MOMENTS GALLERY MODAL
// =========================================

const galleryModal = document.getElementById("photo-gallery-modal");
const galleryOpen = document.getElementById("gallery-open");
const galleryClose = document.getElementById("gallery-close");
const galleryCollage = document.getElementById("gallery-collage");

// GENERATE 40 PHOTOS
function generateGallery() {
  galleryCollage.innerHTML = "";

  for (let i = 1; i <= 40; i++) {
    const number = String(i).padStart(2, "0");

    const polaroid = document.createElement("div");
    polaroid.className = "gallery-polaroid";

    const photo = document.createElement("img");
    photo.src = `assets/dika-${number}.jpeg`;
    photo.alt = `Dika photo ${number}`;
    photo.loading = "lazy";

    const decoration = document.createElement("span");
    decoration.textContent = ["♡", "✦", "✧", "♡", "✿"][i % 5];

    polaroid.appendChild(photo);
    polaroid.appendChild(decoration);

    galleryCollage.appendChild(polaroid);
  }
}

// OPEN GALLERY
galleryOpen.addEventListener("click", () => {
  galleryModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

// CLOSE GALLERY
function closeGallery() {
  galleryModal.classList.remove("show");
  document.body.style.overflow = "";
}

galleryClose.addEventListener("click", closeGallery);

// CLICK OUTSIDE TO CLOSE
galleryModal.addEventListener("click", (event) => {
  if (event.target === galleryModal) {
    closeGallery();
  }
});

// ESCAPE TO CLOSE
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    galleryModal.classList.contains("show")
  ) {
    closeGallery();
  }
});

// INITIALIZE GALLERY
generateGallery();
