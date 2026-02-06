const songs = [
  {
    title: "Attention",
    artist: "Charlie Puth",
    src: "songs/song1.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
  },
  {
    title: "Stay",
    artist: "Justin Bieber",
    src: "songs/song2.mp3",
    cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
  },
  {
    title: "Rockstar",
    artist: "Post Malone",
    src: "songs/song3.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
  }
];

let index = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");
const playlist = document.getElementById("playlist");

function loadSong(i) {
  index = i;
  audio.src = songs[i].src;
  cover.src = songs[i].cover;
  title.innerText = songs[i].title;
  artist.innerText = songs[i].artist;
  highlight();
}

function playPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
  } else {
    audio.play();
    playBtn.innerText = "⏸";
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  loadSong((index + 1) % songs.length);
  audio.play();
  playBtn.innerText = "⏸";
  isPlaying = true;
}

function prevSong() {
  loadSong((index - 1 + songs.length) % songs.length);
  audio.play();
  playBtn.innerText = "⏸";
  isPlaying = true;
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  current.innerText = format(audio.currentTime);
  duration.innerText = format(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function format(t) {
  if (!t) return "0:00";
  let m = Math.floor(t / 60);
  let s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* Playlist UI */
songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "song";
  div.innerText = song.title;
  div.onclick = () => {
    loadSong(i);
    audio.play();
    playBtn.innerText = "⏸";
    isPlaying = true;
  };
  playlist.appendChild(div);
});

function highlight() {
  document.querySelectorAll(".song").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

loadSong(0);
