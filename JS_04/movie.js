const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function bestSellers(movies) {
    const relatedMovies = movies
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 4);

    return relatedMovies;
};

function showMovies(movies) {
    main.innerHTML = ""
    const related = bestSellers(movies);
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie_info">
                    <h3>${title}</h3>
                    <span class="vote ${getClassByRate(vote_average)}">
                        ${vote_average}
                    </span>
                    <p>
                        ${overview}
                    </p>
                </div>
            `
       main.appendChild(movieEl)

       movieEl.addEventListener("click", (e) => {
            localStorage.setItem("movieData", JSON.stringify(movie));
            localStorage.setItem("relatedMovies", JSON.stringify(related));
            window.location.href = "./movie.html"
       })
    })
}

function getClassByRate(vote){
    if (vote >=7) {
        return "green"
    } else if ( vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value

    if (searchTerm && searchTerm[0] !== " " ) {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})