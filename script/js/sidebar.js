'use strict'

import { api_key, language, fetchDataFromServer } from "./api.js"

export function sidebar(){

  

  const genreList = {}

  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}${language}`, function ({genres}) {
    for (const {id, name} of genres) {
      genreList[id] = name;
    }

    genreLink();
  });

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML =
    `
      <div class="sidebar-list">
        <p class="title">Género</p>        
      </div>

      <div class="sidebar-list">  
        <p class="title">Idioma</p>

        <a href="../../movie-list.html" menu-close class="sidebar-link" onClick='getMovieList("with_original_language=es", "Español")'>Español</a>
        <a href="../../movie-list.html" menu-close class="sidebar-link" onClick='getMovieList("with_original_language=en", "Inglés")'>Inglés</a>
        <a href="../../movie-list.html" menu-close class="sidebar-link" onClick='getMovieList("with_original_language=fr", "Francés")'>Francés</a>   
      </div>

      <div class="sidebar-footer">
        <p class="copyright">
            Copyright 2024 <a href="#">David Pinzón</a>
        </p>
        <img src="./assets/images/tmdb-logo.svg" width="130" height="17" alt="">
      </div>    
    `  

    const genreLink = function (){
      for (const [genreId, genreName] of Object.entries(genreList)) {
        const link = document.createElement("a");
        link.classList.add("sidebar-link");
        link.setAttribute("href", "../../movie-list.html");
        link.setAttribute("menu-close", "");
        link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
        link.textContent = genreName;

        sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
      }

      const sidebar = document.querySelector("[sidebar]");
      sidebar.appendChild(sidebarInner);
      toggleSidebar(sidebar);
    }

    const toggleSidebar = function(sidebar) {
      const sidebarBtn = document.querySelector("[menu-btn]");
      const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
      const sidebarClose = document.querySelectorAll("[menu-close]");
      const overlay = document.querySelector("[overlay]");

      addEventOnElements(sidebarTogglers, "click", function(){
        sidebar.classList.toggle("active");
        sidebarBtn.classList.toggle("active");
        overlay.classList.toggle("active");
      })

      addEventOnElements(sidebarClose, "click", function(){
        sidebar.classList.remove("active");
        sidebarBtn.classList.remove("active");
        overlay.classList.remove("active");
      })
    }
}
