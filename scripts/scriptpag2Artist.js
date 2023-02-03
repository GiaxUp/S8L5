// player audio
const audio = document.querySelector("audio");
let seek_slider = document.querySelector(".seek_slider");

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

const populatePlayer = function (artist, title, preview, img) {
  const artist_name = document.querySelector(".track-artist");
  const track_name = document.querySelector(".track-name");
  const audio = document.querySelector("audio");
  const image = document.querySelector(".cover img");

  artist_name.innerText = artist;
  track_name.innerText = title;

  audio.setAttribute("src", preview);
  image.setAttribute("src", img);
  // clearInterval(updateTimer);
};

const playpauseTrack = function () {
  const play_pause_btn = document.querySelector(".playpause-track");

  if (audio.paused) {
    audio.play();
    play_pause_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle-fill mx-2" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
  </svg>`;
    let updateTimer = setInterval(seekUpdate, 1000);
  } else {
    audio.pause();

    play_pause_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-circle-fill mx-2" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>`;
  }
};

const setVolume = function () {
  const volume_slider = document.querySelector(".volume_slider");
  audio.volume = volume_slider.value / 100;
};

const seekTo = function () {
  let seekto = audio.duration * (seek_slider.value / 100);
  audio.currentTime = seekto;
};

const seekUpdate = function () {
  let seekPosition = 0;

  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
};

// fine player

// Generare le playlist di Lidia
const playlistLida = document.getElementById("playlistLidia");
const playlistNames = [
  "Grazie a Lidia per la playlist <3",
  "Be The Young Seasons 1-5",
  "Be The Young Seasons 6-8",
  "persona di m*rda (gen-feb 2023)",
  "Musical 2022",
  "pippo, pluto e paperino (nov-dec 2022)",
  "early stage emily syndrome (sett-ott 2022)",
  "Be the young",
  "'...' cit. Kimiko (lug-ago 2022)",
  "saggio vibes 💃🩰",
  "main character energy (mag-giu 2022)",
  "that fucking mood 🔪☠️",
  "VEE, CARLOTTA E GIACOMO VANNO A BOSIO",
  "An Emily Winchester kind of mood 🔪🖕",
  "landing page (mar-apr 2022)",
  "2021 lol",
  "cosa cazzo vuol dire questa affermazione (gen-feb 2022)",
  "honey and glass (nov-dic 2021)",
  "(Revenge) Training Arc 🦍",
  "Lidia 🤝 Emily",
  "minecraft e nintendo switch (sep-oct 2021)",
  "silvano d'orba? I hardly know her (lug - ago 2021)",
  "Culo 2021",
  "Frah Quintale Mix",
  "Francesco Guccini Mix",
  "Lo Stato Sociale Mix",
  "chapter 4/? (mag-giu 2021)",
  "Strive School <> The Hunt Motivation",
  "mi stavo dimenticando (mar-apr 2021)",
  "high school musical 1,2,3",
  "quanto trash cazzo",
  "The 2020 Playlist",
  "ma(ncanza) che cazzo ne so io (gen-feb 2021)",
];

// Funzione che prende parametro ID dalla pagina precedente e genera un album
playlistNames.forEach((el) => {
  playlistLida.innerHTML += `<li>
  <a href="#">${el}</a>
  </li>`;
});

const ulrArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";
let params = new URLSearchParams(location.search);

let ourIDArtist = params.get("id");

const returnMinute = function (sec) {
  const minute = Math.floor(sec / 60);
  let restSeconds = sec - minute * 60;
  if (restSeconds < 10) {
    restSeconds = "0" + restSeconds;
  }
  const time = `${minute}:${restSeconds}`;
  return time;
};

const doveMettoArtista = document.getElementById("artistaCaricato");
const fetchUrlArtist = async function () {
  try {
    let res = await fetch(`${ulrArtist}/${ourIDArtist}`);
    if (res.ok) {
      const artista = await res.json();
      let tracklist = await fetch(artista.tracklist);
      const tracks = await tracklist.json();

      doveMettoArtista.innerHTML += `
       <div class="row pt-4 ">
             <div style="background-image: url(${artista.picture_big}) ;" class="intestazioneArtist">
             <p> <i class="bi bi-patch-check-fill"></i> Artista verificato</p>
                <h5>${artista.name}</h5>
                <p class="mb-3">${artista.nb_fan} ascoltatori mensili</p>
            </div>
            </div>
            <div class="row ps-4">
              <div class="col-12 bottoniArtista ">
                <button onclick="populatePlayer('${tracks.data[0].artist.name}','${tracks.data[0].title}','${tracks.data[0].preview}','${tracks.data[0].album.cover_medium}')" class="play"><i class="bi bi-play-circle-fill"></i></button>
                <button class="follow">FOLLOWING</button>
                <button><i class="bi bi-three-dots"></i></button>
              </div>
            </div>`;

      const contrainerTracce = document.getElementById("tracce");
      const containerBraniPreferiti = document.getElementById("braniPreferiti");
      containerBraniPreferiti.innerHTML += `
      <div class="row p-0 braniPreferiti">
      <div class="col-3 position-relative">
      <img src=${artista.picture_medium} alt="" />
      <span ><i class="bi bi-check-circle-fill"></i></span>
      </div>
      <div class="col-9 d-flex flex-column justify-content-center">
        <h5>Hai messo Mi piace a ${artista.nb_album} Brani</h5>
        <p>Di ${artista.name}</p>
      </div>
    </div>`;
      console.log(tracks.data);

      tracks.data.forEach((el, index) => {
        contrainerTracce.innerHTML += `
          <div class="row tracceArtista">
                
                  <div class="col-1 d-flex justify-content-center align-items-center ">
                    <p class="leftPlay cursorP" onclick="populatePlayer('${
                      el.artist.name
                    }','${el.title}','${el.preview}','${
          el.album.cover_medium
        }')"><span class="icona"><i class="bi bi-play-fill text-light"></i></span><span class="numero">${
          index + 1
        }</span></p>
                  </div>
                  <div class="col-5">
                  
                    <p><span><img
                    class="img-fluid"
                    src=${el.album.cover_small}
                    alt="album Cover"
                  /> </span>${el.title}</p>
                    
                
                </div>
                <div class="col-3">
                  <p class="text-end pe-3">${el.rank}</p>
                </div>
                <div class="col-3">
                  <p class="text-end pe-4">${returnMinute(el.duration)}</p>
                </div>
              </div>`;
      });

      return artista;
    }
  } catch (error) {
    console.log(error);
  }
};
fetchUrlArtist();

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-xl-block");
};

closeFriends_btn.onclick = showFriends;
