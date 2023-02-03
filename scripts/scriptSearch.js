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

// Apri/chiudi sidebar a dx
const closeFriends_btn = document.querySelector(".show-friends");
const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-xl-block");
};

closeFriends_btn.onclick = showFriends;

// Rimanda alla pagina album
const altraPag = function (event) {
  console.log(event.target.getAttribute("idalbum"));
  location.assign(
    `../pages/albumPage.html?id=${event.target.getAttribute("idalbum")}`
  );
};

// Crea le cards album
const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-6 mb-5 col-sm-4 col-md-3 mysong">
    <div class="card m-2">
      <img src=${
        object.album.cover_medium
      } class="card-img-top" alt="album cover" />
      <div class="card-body pt-2">
        <h5 idalbum="${
          object.album.id
        }" onclick=altraPag(event) class="card-title cursorP">${object.title.toLowerCase()}</h5>
        <p class="card-text ">
          ${object.album.title.toLowerCase()}
        </p>
        
      </div>
    </div>
  </div>`;
};
// Funzione Search
const search_icon = document.querySelector(".search-icon");
const search = async function () {
  const search_results = document.querySelector(".results");
  let input = document.querySelector(".searchBar");
  let textToSearch = input.value.trim().toLowerCase();

  if (textToSearch) {
    search_results.innerHTML = ``;
    if (textToSearch === "capitano") {
      search_results.innerHTML = `
      <div class="captain m-4">
        <iframe class="mt-4" width="736" height="414" src="https://www.youtube.com/embed/xQKYKyLqF-c" title="La storia di Svyatoslav Gabuda, ovvero lo straordinario Uomo Cannone" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        
      </div>`;
    } else {
      let res = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          textToSearch
      );
      let data = await res.json();
      console.log(data);

      data.data.forEach((card) => {
        createCards(search_results, card);
      });
    }
  }
};

search_icon.onclick = search;
