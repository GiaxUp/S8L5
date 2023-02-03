const ulrDeezer = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const contenitoreFirstSong = document.getElementById("firstSong");
const contenitoreAlbum = document.getElementById("albums");
const contenitoreAltro = document.getElementById("altro");

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

playlistNames.forEach((el) => {
  playlistLida.innerHTML += `<li>
  <a href="#">${el}</a>
</li>`;
});

const altraPag = function (event) {
  console.log(event.target.getAttribute("idalbum"));
  location.assign(
    `../pages/albumPage.html?id=${event.target.getAttribute("idalbum")}`
  );
};

const returnMinute = function (sec) {
  const minute = Math.floor(sec / 60);
  const restSeconds = sec - minute * 60;
  const time = `${minute}:${restSeconds}`;
  return time;
};

const caricaArtista = function (event) {
  console.log(event);
  location.assign(
    `../pages/artist.html?id=${event.target.getAttribute("idartist")}`
  );
};

const createAlbum = function (where, object) {
  where.innerHTML += `<div class="col ">
  <div  class="albumOrizzontali m-1">
    <div class="row g-0 align-items-center">
      <div class="col-2">
        <img idalbum="${object.album.id}" onclick=altraPag(event) src=${object.album.cover_small} class="img-fluid rounded-start cursorP" alt="..." />
      </div>
      <div class="col-10 d-flex align-items-center">
        <div class="card-body d-flex align-items-center justify-content-between">
          <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="card-title ps-1 cursorP">${object.album.title}</h5>
          
        <button onclick="populatePlayer('${object.title}','${object.artist.name}','${object.preview}','${object.album.cover_medium}')" class="play"><i class="bi bi-play-circle-fill"></i></button>
        
        </div>
      </div>
    </div>
    </div>
  </div>`;
};

const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-6 col-sm-3 p-2 mysong">
    <div class="card">
      <img idalbum="${object.album.id}" onclick=altraPag(event) src=${
    object.album.cover_medium
  } class="card-img-top cursorP" alt="album cover" />
      <div class="card-body pt-4">
        <h5  class="card-title">${object.title.toLowerCase()}</h5>
        <p class="card-text ">
          ${object.album.title.toLowerCase()}
        </p>
        
      </div>
    </div>
  </div>`;
};

const createFirstSong = function (where, object) {
  where.innerHTML += `<div class="col ">
    <div class="card mb-3 border-0 mainPageBg">
      <div class="row g-0 p-4">
        <div class="col-md-3 d-flex justify-content-center align-items-center bg-trasparent">
          <img
            src=${object.album.cover_big}
            class="img-fluid"
            alt="album cover"
          />
        </div>
        <div class="col-md-9 ">
          <div
            class="d-flex flex-column justify-content-between h-100 ps-3"
          >
            <p class="">ALBUM</p>
            <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="clickableAlbum cursorP">${object.album.title}</h5>
            <p idartist="${object.artist.id}" onclick=caricaArtista(event) class="clickableArtist cursorP">${object.artist.name}</p>
            <p class="subtitle">Ascolta il nuovo singolo dei ${object.artist.name}!</p>
            <p>
              <button onclick='populatePlayer("Beggin","${object.artist.name}","${object.preview}","${object.album.cover_medium}")'  class="button-green" role="button">Play</button> <button class="button-black" role="button">Salva</button>
              <button class="button-black" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg></button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

const fetchUrl = async function (search) {
  try {
    let res = await fetch(`${ulrDeezer}${search}`);
    if (res.ok) {
      const { data } = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const Album1 = async function () {
  try {
    let album = await fetchUrl("backinblack");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album1();
const Album2 = async function () {
  try {
    let album = await fetchUrl("FooFighter");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album2();
const Album3 = async function () {
  try {
    let album = await fetchUrl("Pink Floyd");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album3();
const Album4 = async function () {
  try {
    let album = await fetchUrl("system of a down");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album4();
const Album5 = async function () {
  try {
    let album = await fetchUrl("nickelback");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album5();
const Album6 = async function () {
  try {
    let album = await fetchUrl("My Chemical Romance");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album6();

const artista = async function () {
  try {
    let artista = await fetchUrl("maneskin");

    console.log(artista);
    const brani = [];
    artista.forEach((element) => {
      createCards(contenitoreAltro, element);
      brani.push(element);
    });

    const allMySongs = document.querySelectorAll(".mysong");

    for (let i = 0; i < allMySongs.length; i++) {
      if (i > 3) {
        allMySongs[i].classList.add("d-none");
      }
    }
    const showAllBtn = document.getElementById("showAll");
    const hideBtn = document.getElementById("hide");
    const show = function () {
      allMySongs.forEach((el) => {
        el.classList.remove("d-none");
      });
      showAllBtn.classList.add("d-none");
      hideBtn.classList.remove("d-none");
    };
    showAllBtn.onclick = show;
    const hide = function () {
      for (let i = 0; i < allMySongs.length; i++) {
        if (i > 3) {
          allMySongs[i].classList.add("d-none");
        }
      }
      showAllBtn.classList.remove("d-none");
      hideBtn.classList.add("d-none");
    };
    hideBtn.onclick = hide;

    createFirstSong(contenitoreFirstSong, artista[0]);
    console.log(artista[0]);
  } catch (error) {
    console.log(error);
  }
};
artista();

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-xl-block");
};

closeFriends_btn.onclick = showFriends;
