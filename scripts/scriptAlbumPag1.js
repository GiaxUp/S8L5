console.log("pag1");
let params = new URLSearchParams(location.search);
console.log(params);

let ourID = params.get("id");
console.log(ourID);

const doveMettiAlbum = document.getElementById("albumCaricati");
const returnMinute = function (sec) {
  const minute = Math.floor(sec / 60);
  let restSeconds = sec - minute * 60;
  if (restSeconds < 10) {
    restSeconds = "0" + restSeconds;
  }
  const time = `${minute}:${restSeconds}`;
  return time;
};
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

playlistNames.forEach((el) => {
  playlistLida.innerHTML += `<li>
  <a href="#">${el}</a>
</li>`;
});

const caricaArtista = function (event) {
  console.log(event);
  location.assign(
    `../pages/artist.html?id=${event.target.getAttribute("idartist")}`
  );
};
const preferiti = [];
window.onload = () => {
  const arrayOfID = JSON.parse(localStorage.getItem("preferiti"));
  if (localStorage.getItem("preferiti")) {
    arrayOfID.forEach((el) => {
      preferiti.push(el);
    });
  }
};
const aggiungiPreferiti = function (event) {
  console.log("cliccato");
  console.log(event);
  if (preferiti.includes(event.target.getAttribute("idalbum"))) {
    console.log("c'e gia");
  } else {
    preferiti.push(event.target.getAttribute("idalbum"));
    console.log(event.target.getAttribute("idalbum"));
    console.log(preferiti);
    localStorage.setItem("preferiti", JSON.stringify(preferiti));
  }
};
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

const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const fetchUrlAlbum = async function () {
  try {
    let res = await fetch(`${urlAlbum}/${ourID}`);
    if (res.ok) {
      const data = await res.json();

      doveMettiAlbum.innerHTML += `
      <div class="position-absolute top-0 sfondo">
                <img
                  
                  src=${data.cover_big}
                  alt="album Cover"
                />
              </div>`;

      doveMettiAlbum.innerHTML += `
       <div class="row intestazioneAlbum text-light flex-column align-items-center flex-md-row">
              <div class="col-8 col-md-3">
                <img
                  class="img-fluid"
                  src=${data.cover_big}
                  alt="album Cover"
                />
              </div>
              <div class="col-9">
                <p>ALBUM</p>
                <h5>${data.title}</h5>
                <p > <span><img
                class="img-fluid"
                src=${data.artist.picture_small}
                alt="album Cover"
              /> </span><span class="cursorP" idartist="${
                data.artist.id
              }" onclick=caricaArtista(event)>${data.artist.name}</span>, ${
        data.release_date
      },${data.tracks.data.length} tracce, ${returnMinute(
        data.duration
      )} min</p>
              </div>
            </div>
            <div class="row ">
              <div class="col-12 bottoniAlbum">
                <button class="play" onclick="populatePlayer('${
                  data.tracks.data[0].artist.name
                }','${data.tracks.data[0].title}','${
        data.tracks.data[0].preview
      }','${
        data.tracks.data[0].album.cover_medium
      }')"><i class="bi bi-play-circle-fill"></i></button>
                <button  id="save" idalbum="${
                  data.id
                }" onclick=aggiungiPreferiti(event) ><i idalbum="${
        data.id
      }" class="bi bi-heart cursorP"></i></button>
                <button><i class="bi bi-arrow-down-circle"></i></button>
                <button><i class="bi bi-three-dots"></i></button>
              </div>
            </div>
            <div class="row intestazioneTracceAlbum">
              <div class="col-1 d-flex justify-content-center">
                <p>#</p>
              </div>
              <div class="col-5">
                <p>TITOLO</p>
              </div>
              <div class="col-3">
                <p class="text-end pe-3">RIPRODUZIONI</p>
              </div>
              <div class="col-3">
                <p class="text-end pe-4"><i class="bi bi-clock"></i></p>
              </div>
            </div>`;

      const tracks = data.tracks.data;
      // nextTrack(tracks, 0);
      populatePlayer(
        tracks[0].artist.name,
        tracks[0].title,
        tracks[0].preview,
        tracks[0].album.cover_medium
      );
      tracks.forEach((el, index) => {
        console.log(el);
        doveMettiAlbum.innerHTML += `
        <div class="row tracceAlbum">
              
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
                  <p >${el.title}</p>
                  <p class="cursorP" idartist="${
                    el.artist.id
                  }" onclick=caricaArtista(event)>${el.artist.name}</p>
                
              </div>
              <div class="col-3">
                <p class="text-end pe-3">${el.rank}</p>
              </div>
              <div class="col-3">
                <p class="text-end pe-4">${returnMinute(el.duration)}</p>
              </div>
            </div>`;
      });

      console.log(data);

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
fetchUrlAlbum();

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-xl-block");
};

closeFriends_btn.onclick = showFriends;
