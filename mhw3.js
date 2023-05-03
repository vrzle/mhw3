

function onJson1(json) {
  console.log('JSON ricevuto');
  const library = document.querySelector('#marvel');
  library.innerHTML = '';
  // Leggi il numero di risultati
 
  // Processa ciascun risultato

    // Leggi il documento
    const doc = json
    // Leggiamo info
    const giorni= json.days_until;
    const title1 = json.title;
    const data =json.release_date;

    const next=json.following_production.title;

    const box=document.createElement('div');
    box.classList.add("film");

    const img=document.createElement('img');
    img.src = json.poster_url;

    const titolo= document.createElement('h1');
    titolo.textContent=title1 + " uscirà tra: " + giorni + " giorni";

    const date = document.createElement('div')
    date.textContent = "Data di Rilascio: " + data;
   

    const pros = document.createElement('div');
    pros.textContent= "Prossimo film: " + next;
   

    const close = document.createElement('div');
    close.textContent = "chiudi";
    close.classList.add("clo");

    box.appendChild(titolo);
    box.appendChild(date);
    box.appendChild(img);
    box.appendChild(pros);
    box.appendChild(close);

    library.appendChild(box);
    const detailToggle = document.querySelector('.clo');
    detailToggle.addEventListener('click', toggle);

function toggle(event){
  console.log('event.target: ' + event.target.tagName);
  console.log('event.currentTarget: ' + event.currentTarget.tagName);
  const library = document.querySelector('.film');
  library.innerHTML = '';
  scrollelement2();
}

}
  
function scrollelement2()
{
  var elemento = document.getElementById("MCU");
  elemento.scrollIntoView ();
}



function onResponse(response) {
  console.log('Risposta ricevuta');
  
  
  return response.json();
}

function search2(event)
{
  event.preventDefault();
  
  rest_url = 'https://www.whenisthenextmcufilm.com/api';
  ;
  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponse).then(onJson1);
}


const form = document.querySelector('#MCU');
form.addEventListener('submit', search2)






function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  
  const results = json.tracks.items;
  let num_results = results.length;
  
  if(num_results > 6)
    num_results = 6;
  
  for(let i=0; i<num_results; i++)
  {
    
    const track_data = results[i]
    
    const title = track_data.name;
    const url = track_data.external_urls;
    const l = url.spotify;
    const testo = "riproduci il brano";
    const selected_image = track_data.album.images[0].url;
    
    const album = document.createElement('div');
    album.classList.add('album');
    
    const img = document.createElement('img');
    img.src = selected_image;
    
    const caption = document.createElement('span');
    caption.textContent = title;
    
    const link = document.createElement('a');
    link.href = l;
    link.textContent = testo;
    link.classList.add('link');

    album.appendChild(img);
    album.appendChild(caption);
    album.appendChild(link);
    
    library.appendChild(album);
  }
}


function search(event)
{
  event.preventDefault();
  const track_input = document.querySelector('#track');
  const track_value = encodeURIComponent(track_input.value);
  console.log('Eseguo ricerca: ' + track_value);
  fetch("https://api.spotify.com/v1/search?type=track&q=" + track_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const client_id = '16f42e0e598144a899ef8405f78e6ec8';
const client_secret = '8cd9a60000dd40cbaa45aa6191042938';

let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
const form2 = document.querySelector('#musica');
form2.addEventListener('submit', search)








function onJson3(json) {
  console.log(json);
  const ris_ricerca = document.querySelector("#ris_ricerca");
  ris_ricerca.innerHTML = "";

  const error = json.Response;
  console.log(error);
  if(error == 'True')
  {
        for (let i = 0; i < 6; i++) {
          
            const film = json.Search[i];
            const title = film.Title;

            const film_input = title;
            
            rest_url = "http://www.omdbapi.com/?apikey=a335def9&t=" + title+ "&plot=full";
  
            fetch(rest_url).then(onResponse).then(onJson4);

            

            function onJson4(json){
            console.log(json);
            const film2 = json;
            const year = film2.Released;            
            const poster = film2.Poster;
            const Runtime = film2.Runtime;
            const genere= film2.Genre;           
            const f = document.createElement("div");
            f.classList.add("film_r");
           
            const img = document.createElement("img");
            img.src = poster;
            const titolo = document.createElement("h1");
            titolo.textContent = "Titolo: " + title;
            const anno = document.createElement("h5");
            anno.textContent = "Data di rilascio: " + year;
            const gener = document.createElement("h5");
            gener.textContent = "Genre: "+ genere;
            const durata = document.createElement("h5");
            durata.textContent = "Durata: "+ Runtime;
            
   
            f.appendChild(img);
            f.appendChild(titolo);
            f.appendChild(anno);
            f.appendChild(gener);
            f.appendChild(durata);
    
             ris_ricerca.appendChild(f);
             
             
            }
            
                
  }

  

}
else
{
    const errore=json.Error;
    console.log(errore);
    const er = document.createElement("h1");
    er.textContent = "ERRORE: " + errore;
    ris_ricerca.appendChild(er);

}

}


function close()
{
  console.log("chiudi");
const close = document.createElement('div');
close.textContent = "chiudi";
close.classList.add("clo1");
ris_ricerca.appendChild(close);
const detailToggle = document.querySelector('.clo1');
detailToggle.addEventListener('click', toggle);



function toggle(event){
console.log('event.target: ' + event.target.tagName);
console.log('event.currentTarget: ' + event.currentTarget.tagName);
const library = document.querySelector('#ris_ricerca');
library.innerHTML = '';
scrollelement();
}
}

function scrollelement()
{
  var elemento = document.getElementById("films");
  elemento.scrollIntoView ();
}



function search_f(event) {
  event.preventDefault(); 
  const film_input = document.querySelector("#film");
  const film_value = encodeURIComponent(film_input.value);
  rest_url = "http://www.omdbapi.com/?apikey=a335def9&s=" + film_value;
  //esegui fetch
  fetch(rest_url).then(onResponse).then(onJson3);
}

const form_f = document.querySelector("#films");
form_f.addEventListener("submit", search_f);

