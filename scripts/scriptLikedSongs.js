// Generare le playlist di Lidia
const containerLikedSongs = document.getElementById("likedSongs");
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

const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-3 my-2 mysong">
      <div class="card">
        <img src=${object.album.cover_medium} class="card-img-top" alt="album cover" />
        <div class="card-body">
          <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="card-title cursorP">${object.title}</h5>
          <p class="card-text">
            ${object.album.title}
          </p>
          
        </div>
      </div>
    </div>`;
};

const loadLikedSongs = function () {
  const arrayOfID = JSON.parse(localStorage.getItem("preferiti"));

  if (localStorage.getItem("preferiti")) {
    console.log(arrayOfID);
    const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";
    arrayOfID.forEach((id) => {
      const fetchUrlAlbum = async function () {
        try {
          let res = await fetch(`${urlAlbum}/${id}`);
          if (res.ok) {
            const data = await res.json();
            console.log(data.tracks.data);
            data.tracks.data.forEach((song) => {
              createCards(containerLikedSongs, song);
            });

            return data;
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUrlAlbum();
    });
  } else {
    containerLikedSongs.innerHTML = `
    <p class="text-light"> Non hai messo Mi Piace a nessuna canzone <i class="bi bi-emoji-frown"></i> </p>`;
  }
};
loadLikedSongs();
const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-xl-block");
};

closeFriends_btn.onclick = showFriends;
