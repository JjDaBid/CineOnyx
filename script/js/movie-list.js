'use strict'

import { api_key, imageBaseURL, fetchDataFromServer, language } from "./api.js";
import { sidebar } from "./sidebar.js"
import { createMovieCard } from "./movie-card.js"
import { search } from "./search.js";

const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0;



fetchDataFromServer( 
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}${language}`, 
    function({ results: movieList, total_pages }) {
    totalPages = total_pages;
    document.title = `${genreName} Películas - CineOnyx`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Peliculas`

    movieListElem.innerHTML = `
      <div class="title-wrapper"> 
        <!-- class="heading" -->
        <h1 class="title-large">Todas las películas de ${genreName}</h1>
      </div>

      <div class="grid-list"></div>
      <button class="btn load-more" load-more>Cargar Más</button>
    `

    for(const movie of movieList) {
      const movieCard = createMovieCard(movie);

      movieListElem.querySelector(".grid-list").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);


    document.querySelector("[load-more]").addEventListener(
      "click", function() {
        if(currentPage >= totalPages) {
          this.style.display = "none";
          return;
        }

        currentPage ++;
        this.classList.add("loading");

        fetchDataFromServer(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}${language}`,
          ({ results: movieList }) => {
          this.classList.remove("loading");

          for(const movie of movieList){
            const movieCard = createMovieCard(movie);
            movieListElem.querySelector(".grid-list").appendChild(movieCard);
          }
        })
      }
    )
    
  }
);

search();
