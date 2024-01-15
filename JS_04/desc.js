const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const places = document.getElementById("seat");
let total = 0;

const data = localStorage.getItem("movieData");
const related = localStorage.getItem("relatedMovies");

const movie = JSON.parse(data);
const relatedMovies = JSON.parse(related);

places.innerHTML = "";
main.innerHTML = "";

const seats = [
  {
    id: 1,
    seat: "seat1",
    price: 25,
  },
  {
    id: 2,
    seat: "seat2",
    price: 25,
  },
  {
    id: 3,
    seat: "seat3",
    price: 25,
  },
  {
    id: 4,
    seat: "seat4",
    price: 25,
  },
  {
    id: 5,
    seat: "seat5",
    price: 25,
  },
];

displayMovie(movie);
displaySeats();
displayRelatedMovies(relatedMovies);

function displayMovie(movie) {
  const movieEl = document.createElement("div");
  movieEl.classList.add("single_movie_info");

  movieEl.innerHTML = `
    <div class="banner_img">
        <img src="${IMG_PATH + movie.backdrop_path}" alt="${movie.title}">
    </div>
    <div class="row">
        <div class="col-6">
        <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="col-6">
                <div class="single_movie_info">
                    <h3>${movie.title}</h3>
                    <p>
                        ${movie.vote_average}
                    </p>
                    <p>
                        ${movie.overview}
                    </p>
                    <p>
                    ${movie.original_language}
                    </p>
                    <p>
                    ${movie.release_date}
                    </p>
                </div>
        </div>
    </div>
    `;
  main.appendChild(movieEl);
}

function displayRelatedMovies(relatedMovies) {
  const relatedMoviesRow = document.createElement("div");
  relatedMoviesRow.classList.add("related-movies-row");

  relatedMovies.forEach((relatedMovie) => {
    const relatedMovieEl = document.createElement("div");
    relatedMovieEl.classList.add("related-movie");
    relatedMovieEl.innerHTML = `
        <img src="${IMG_PATH + relatedMovie.poster_path}" alt="${relatedMovie.title}">
        <div>
            <h3>${relatedMovie.title}</h3>
            <button class="button-display">Choose</button>
        </div>
    `;

    relatedMoviesRow.appendChild(relatedMovieEl);

    relatedMovieEl.addEventListener("click", () => {
      localStorage.setItem("movieData", JSON.stringify(relatedMovie));
      window.location.href = "./movie.html";
    });
  });

  main.appendChild(relatedMoviesRow);
}

function displaySeats() {
  seats.forEach((seat) => {
    const seatEl = document.createElement("div");
    seatEl.classList.add("seat_places");
    seatEl.innerHTML = `
        <h1>${seat.seat}</h1>
        <h2>${seat.price}GEL</h2>
        <button class="choose-btn">Choose</button>
    `;
    places.appendChild(seatEl);

    seatEl.addEventListener("click", () => {
      if (!seatEl.classList.contains("selected")) {
        seatEl.classList.add("selected");
        total += seat.price;
        updateTotal();
      }
    });
  });

  function updateTotal() {
    const totalDisplay = document.getElementById("totalDisplay");
    totalDisplay.textContent = `Total: ${total}GEL`;
  }
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
