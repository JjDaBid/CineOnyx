'use strict';

const api_key = '108cf7baef8537f423f3b1ca3a05bc08';
const imageBaseURL = "https://image.tmdb.org/t/p/";
const language = '&language=es-ES';


// fetch data

const fetchDataFromServer = function(url, callback, optionalParam){
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, language, fetchDataFromServer };

