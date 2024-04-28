const documentBody = document.querySelector("body");

///////////////////////////////

const observerLeftToRight = new IntersectionObserver((entries) => {
  entries.forEach((entry) =>{
    if (entry.isIntersecting){
      entry.target.classList.add("show_transition_LeftToRight")
    } 
  });
})
const hiddenLeftRigth = document.querySelectorAll(".hidden_transition_LeftToRight")
hiddenLeftRigth.forEach((hidden) => observerLeftToRight.observe(hidden));

const observerFadeIn = new IntersectionObserver((entries) => {
  entries.forEach((entry) =>{
    if (entry.isIntersecting){
      entry.target.classList.add("show_transition_FadeIn")
    } 
  });
})
const hiddenFadeIn = document.querySelectorAll(".hidden_transition_FadeIn")
hiddenFadeIn.forEach((hidden) => observerFadeIn.observe(hidden));






/////////////////////////////////////////////////////
const buttons = document.querySelectorAll(".cell-findabtmore");
function abtmore(event) {
  const container = event.currentTarget.parentNode;
  const txt = container.querySelector(".abt-more-text");
  const close = container.querySelector(".close-txt");
  const button = event.currentTarget;
  button.classList.add("hidden");
  txt.classList.remove("hidden");
  close.addEventListener("click", () => {
    button.classList.remove("hidden");
    txt.classList.add("hidden");
  });
}
for (const button of buttons) {
  button.addEventListener("click", abtmore);
}
/////////////////////////////////////////////////////
const problems = document.querySelectorAll(".row-problem h3");
function probTendina(event) {
  const container = event.currentTarget.parentNode;
  const solution = container.querySelector(".solution-text");
  solution.classList.toggle("solution-open");
  const probh3 = container.querySelector("h3");
  probh3.classList.toggle("bg-blue");
}

for (const problem of problems) {
  problem.addEventListener("click", probTendina);
}
/////////////////////////////////////////////////////
const carrello = document.querySelector("#shopping-cart");
function shopping() {
  const containerShop = document.querySelector(".flex-shopping");
  containerShop.classList.remove("hidden");
}
carrello.addEventListener("click", shopping);
/////////////////////////////////////////////////////
const imagesAbout = document.querySelectorAll(".cert-img");

function learnabout(event) {
  const container = event.currentTarget.parentNode;
  const image = container.querySelector(".cert-img");
  const new_img = document.createElement("img");
  const img_index = parseInt(image.dataset.index);
  if (img_index === 0) {
    new_img.src = "images/ventilazione.jpg";
  } else if (img_index === 1) {
    new_img.src = "images/umidita2.jpg";
  } else if (img_index === 2) {
    new_img.src = "images/VMC_ILM.jpeg";
  }
  image.classList.toggle("hidden");
  container.appendChild(new_img);

  new_img.addEventListener("mouseout", function () {
    container.removeChild(new_img);
    image.classList.toggle("hidden");
  });
}

for (const image of imagesAbout) {
  image.addEventListener("mouseover", learnabout);
}
/////////////////////////////////////////////////////
const tendine = document.querySelectorAll(".row-header h1");

function menuTendina(event) {
  const container = event.currentTarget.parentNode;
  const text = container.querySelector(".nav-text");

  text.classList.add("nav-text-open");
  text.classList.remove("hidden");
  container.addEventListener("mouseleave", function () {
    text.classList.remove("nav-text-open");
    text.classList.add("hidden");
  });
}

for (const tendina of tendine) {
  tendina.addEventListener("mouseenter", menuTendina);
}




/////////////////////////////////////////////////////
const barraRicerca = document.querySelector(".container-lente-nav");
function ricercaLente(event) {
  event.stopPropagation();
  const container = event.currentTarget;
  const barra = container.querySelector(".barra-ricerca-container");
  barra.classList.toggle("hidden");
  const textContainer = document.querySelector(".barra-ricerca");
  textContainer.addEventListener("click", function (event) {
    event.stopPropagation();
  });
  barra.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

barraRicerca.addEventListener("click", ricercaLente);
const b = document.querySelector("body");
function chiudi(event) {
  const barra = document.querySelector(".barra-ricerca-container");
  barra.classList.add("hidden");
}
b.addEventListener("click", chiudi);
/////////////////////////////////////////////////////
const api_key = "AIzaSyAW0H0hFwvFnT6hdq1GVpqRVW-ReHsyOY4";
fetch(
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCv--CI9ZNufqFTUAFc4bO0Q&maxResults=10&order=date&key=" +
    api_key
)
  .then(onResponse, onError)
  .then(onJson);

function onResponse(response) {
  return response.json();
}

function onError(error) {
  console.log("Error: " + error);
}

function onJson(json) {
  console.log(json);
  const cellVideo = document.querySelector(".cell-video");
  const results = json.items;
  let num_results = results.length;
  if (num_results > 3) num_results = 3;

  for (let i = 0; i < num_results; i++) {
    const video_data = results[i];
    // Ottengo i dati dei video
    const title = video_data.snippet.title;
    const thumbnail = video_data.snippet.thumbnails.high.url;
    const url = video_data.id.videoId;
    // Creo il contenitore della thumbnail, titolo e url
    const video_container = document.createElement("div");
    video_container.classList.add("video-container");
    // Creo il contenitore per il titolo del video
    const title_container = document.createElement("div");
    title_container.textContent = title;
    title_container.classList.add("video-title");
    //Creo il contenitore per il link al video
    const video_url = document.createElement("a");
    video_url.href = "www.youtube.com/watch?v=" + url;
    console.log(video_url);
    // Creo l'immagine che rappresenta la thumbnail e poi l'aggiungo al contenitore
    const thumbnail_img = document.createElement("img");
    thumbnail_img.classList.add("thumbnail-img");
    thumbnail_img.src = thumbnail;
    thumbnail_img.style.cursor = "pointer";
    //Listener per aprire il link:
    thumbnail_img.addEventListener("click", function () {
      window.open(video_url.href, "_blank");
    });
    //Aggiungo nell'html i contenitori e il loro contenuto
    video_container.appendChild(title_container);
    video_container.appendChild(thumbnail_img);
    cellVideo.appendChild(video_container);
  }
}


/////////////////////////////////////////////////////

let token;
const id_client = "313884b8c8754c2db5c6035e4349167f";
const client_secret = "d7f11c0ce3c046e196aa1834b569fc6d";
const containerGridModal = document.querySelector(".container_grid_modal")

function searchSpotify(event)
{
  event.preventDefault();
  const search_bar = document.querySelector(".barra-ricerca");
  const albumName = encodeURIComponent(search_bar.value);
  containerGridModal.classList.remove("hidden");
  documentBody.classList.add("overflowToggle")
  containerGridModal.scrollIntoView();
  console.log("prova: " +albumName )
  fetch("https://api.spotify.com/v1/search?type=album&q=" + albumName,
  {
    headers:
    {
      'Authorization' : 'Bearer ' + token
    }
  }
).then(onResponseSpotify).then(onJsonSpotify);
}
const formSpotify = document.querySelector("form");
formSpotify.addEventListener("submit", searchSpotify)

const closeButton = document.querySelector("#modal-cross")
function closeModal(){
  containerGridModal.classList.add("hidden");
  documentBody.classList.remove("overflowToggle")
}
closeButton.addEventListener("click", closeModal);

function onResponseSpotify(response) {
  return response.json();
}

function onJsonSpotify(json){
  console.log(json)
  const ResultsItemContainer = document.querySelector("#grid_modal_search");
  const resultsAlbum = json.albums.items;
  ResultsItemContainer.innerHTML = '';

  for(let i = 0; i <resultsAlbum.length; i++)
  {
    const album_data = resultsAlbum[i];
    const album_image_src = album_data.images[1].url;
    const album_titolo = album_data.name;

    const resultItem = document.createElement("div")
    resultItem.classList.add("resultItem")
    
    const album_image = document.createElement("img");
    album_image.src = album_image_src;

    const container_title = document.createElement("h1");
    container_title.textContent = album_titolo;
    container_title.classList.add("albumTitle");

    resultItem.appendChild(container_title);
    resultItem.appendChild(album_image);

    ResultsItemContainer.appendChild(resultItem);
  }
}
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(id_client + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenJson(json) {
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}
