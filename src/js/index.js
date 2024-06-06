document.addEventListener('DOMContentLoaded', () => {
  class MovieApp {
    constructor() {
      this.moviesLink = document.getElementById('moviesLink');
      this.tvShowsLink = document.getElementById('tvShowsLink');
      this.moviesList = document.getElementById('moviesList');
      this.tvShowsList = document.getElementById('tvShowsList');
      this.movieForm = document.getElementById('movieForm');
      this.movieItems = document.getElementById('movieItems');
      this.searchMovieButton = document.getElementById('searchMovieButton');
      this.movieSearchTitle = document.getElementById('movieSearchTitle');
      this.movieReview = document.getElementById('movieReview');
      this.movieImage = document.getElementById('movieImage');
      this.OMDB_API_KEY = 'a08e8955';

      this.movieCounter = 1;

      this.bindEvents();
      this.loadMovies();
    }

    bindEvents() {
      this.moviesLink.addEventListener('click', this.showMoviesList.bind(this));
      this.tvShowsLink.addEventListener('click', this.showTvShowsList.bind(this));
      this.searchMovieButton.addEventListener('click', this.handleMovieSearch.bind(this));
      this.movieForm.addEventListener('submit', this.handleFormSubmission.bind(this));
    }

    showMoviesList() {
      this.moviesList.classList.remove('d-none');
      this.tvShowsList.classList.add('d-none');
      this.moviesLink.classList.add('active');
      this.tvShowsLink.classList.remove('active');
    }

    showTvShowsList() {
      this.tvShowsList.classList.remove('d-none');
      this.moviesList.classList.add('d-none');
      this.tvShowsLink.classList.add('active');
      this.moviesLink.classList.remove('active');
    }

    renderMovieItem(title, review, image) {
      const li = document.createElement('li');
      li.className = 'list-group-item bg-secondary text-light';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `${title} Cover`;
      img.className = 'img-thumbnail mr-3';

      const div = document.createElement('div');
      div.innerHTML = `<strong>#${this.movieCounter}</strong>: <strong>${title}</strong>`;

      const descButton = document.createElement('button');
      descButton.className = 'btn btn-info description-btn ml-3';
      descButton.innerText = 'Description';
      descButton.addEventListener('click', () => {
        const description = li.querySelector('.description');
        description.classList.toggle('hidden-description');
      });

      const description = document.createElement('div');
      description.className = 'description hidden-description mt-2';
      description.innerText = review;

      li.appendChild(img);
      li.appendChild(div);
      li.appendChild(descButton);
      li.appendChild(description);
      this.movieItems.appendChild(li);

      this.movieCounter++;
    }

    saveMovies() {
      const movies = [];
      this.movieItems.querySelectorAll('li').forEach((li) => {
        const title = li.querySelector('div strong').textContent.split(': ')[1];
        const review = li.querySelector('.description').textContent;
        const image = li.querySelector('img').src;
        movies.push({ title, review, image });
      });
      localStorage.setItem('movies', JSON.stringify(movies));
    }

    loadMovies() {
      const movies = JSON.parse(localStorage.getItem('movies')) || [];
      if (movies.length > 0) {
        movies.forEach((movie, index) => {
          this.movieCounter = index + 1;
          this.renderMovieItem(movie.title, movie.review, movie.image);
        });
      }
    }

    fetchMovieDetails(title) {
      const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${this.OMDB_API_KEY}`;
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.Response === 'True') {
            return data;
          } else {
            throw new Error(data.Error);
          }
        });
    }

    handleMovieSearch() {
      const title = this.movieSearchTitle.value;
      if (title) {
        this.fetchMovieDetails(title)
          .then(data => {
            this.movieSearchTitle.value = data.Title;
            this.movieReview.value = data.Plot;
            this.movieImage.value = data.Poster;
          })
          .catch(error => {
            alert(`Error: ${error.message}`);
          });
      }
    }

    handleFormSubmission(event) {
      event.preventDefault();

      const movieTitle = this.movieSearchTitle.value;
      const movieReviewText = this.movieReview.value;
      const movieImageUrl = this.movieImage.value;

      if (movieTitle && movieReviewText && movieImageUrl) {
        this.renderMovieItem(movieTitle, movieReviewText, movieImageUrl);
        this.saveMovies();
        this.movieForm.reset();
      }
    }
  }

  new MovieApp();
});
