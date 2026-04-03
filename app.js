const songs = [
  {
    title: "Ballade",
    artist: "Nicolas Berthe",
    notes: ["SI","LA","SI","SOL","SI","LA","SOL","SOL","LA","SI","SOL","SI","LA","SOL"]
  },
  {
    title: "Simple Tune",
    artist: "Unknown",
    notes: ["SOL","LA","SI","LA","SOL"]
  },
  {
    title: "Melody 1",
    artist: "Toni Gallart",
    notes: ["DO","RE","MI","RE","DO","RE","MI","FA","MI"]
  },
  {
    title: "Melody 2",
    artist: "Toni Gallart",
    notes: ["MI","FA","SOL","FA","MI","RE","DO"]
  },
  {
    title: "Piano Flow",
    artist: "Toni Gallart",
    notes: ["DO","MI","SOL","SI","SOL","MI","DO"]
  },
  {
    title: "Soft Ballad",
    artist: "Toni Gallart",
    notes: ["LA","SI","DO","SI","LA","SOL","LA"]
  },
  {
    title: "Dream Notes",
    artist: "Toni Gallart",
    notes: ["FA","SOL","LA","SOL","FA","MI","RE"]
  },
  {
    title: "Dark Melody",
    artist: "Toni Gallart",
    notes: ["MI","RE","DO","RE","MI","FA","MI"]
  },
  {
    title: "Classic Touch",
    artist: "Toni Gallart",
    notes: ["DO","DO","SOL","SOL","LA","LA","SOL"]
  }
];

const songList = document.getElementById("songList");
const search = document.getElementById("search");
const artistFilter = document.getElementById("artistFilter");

const player = document.getElementById("player");
const songTitle = document.getElementById("songTitle");
const notesContainer = document.getElementById("notesContainer");
const playBtn = document.getElementById("playBtn");

let currentSong = null;
let playing = false;

function loadArtists() {
  const artists = [...new Set(songs.map(s => s.artist))];
  artists.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    artistFilter.appendChild(opt);
  });
}

function renderSongs() {
  songList.innerHTML = "";

  const query = search.value.toLowerCase();
  const artist = artistFilter.value;

  songs
    .filter(s =>
      s.title.toLowerCase().includes(query) &&
      (artist === "" || s.artist === artist)
    )
    .forEach(song => {
      const div = document.createElement("div");
      div.className = "song";
      div.textContent = `${song.title} - ${song.artist}`;
      div.onclick = () => openSong(song);
      songList.appendChild(div);
    });
}

function openSong(song) {
  currentSong = song;
  player.classList.remove("hidden");
  songTitle.textContent = song.title;

  notesContainer.innerHTML = "";
  song.notes.forEach(n => {
    const span = document.createElement("span");
    span.className = "note";
    span.textContent = n;
    notesContainer.appendChild(span);
  });
}

function playSong() {
  if (!currentSong) return;

  let i = 0;
  const notes = document.querySelectorAll(".note");

  playing = true;

  const interval = setInterval(() => {
    if (!playing) {
      clearInterval(interval);
      return;
    }

    notes.forEach(n => n.classList.remove("active"));

    if (i < notes.length) {
      notes[i].classList.add("active");
      i++;
    } else {
      clearInterval(interval);
      playing = false;
    }
  }, 600);
}

playBtn.onclick = playSong;
search.oninput = renderSongs;
artistFilter.onchange = renderSongs;

loadArtists();
renderSongs();
