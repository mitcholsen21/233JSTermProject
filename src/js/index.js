document.addEventListener('DOMContentLoaded', () => {
  class MediaApp {
    constructor() {
      // Common elements
      this.moviesLink = document.getElementById('moviesLink');
      this.tvShowsLink = document.getElementById('tvShowsLink');
      this.moviesList = document.getElementById('moviesList');
      this.tvShowsList = document.getElementById('tvShowsList');
      
      // Movie elements
      this.movieForm = document.getElementById('movieForm');
      this.movieItems = document.getElementById('movieItems');
      this.searchMovieButton = document.getElementById('searchMovieButton');
      this.movieSearchTitle = document.getElementById('movieSearchTitle');
      this.movieReview = document.getElementById('movieReview');
      this.movieImage = document.getElementById('movieImage');

      // TV show elements
      this.tvShowForm = document.getElementById('tvShowForm');
      this.tvShowItems = document.getElementById('tvShowItems');
      this.searchTVShowButton = document.getElementById('searchTVShowButton');
      this.tvShowSearchTitle = document.getElementById('tvShowSearchTitle');
      this.tvShowReview = document.getElementById('tvShowReview');
      this.tvShowImage = document.getElementById('tvShowImage');
      
      this.OMDB_API_KEY = 'a08e8955';

      // Counters
      this.movieCounter = 1;
      this.tvShowCounter = 1;

      this.bindEvents();
      this.loadMovies();
      this.loadTVShows();
    }

    bindEvents() {
      this.moviesLink.addEventListener('click', this.showMoviesList.bind(this));
      this.tvShowsLink.addEventListener('click', this.showTvShowsList.bind(this));
      this.searchMovieButton.addEventListener('click', this.handleMovieSearch.bind(this));
      this.movieForm.addEventListener('submit', this.handleMovieFormSubmission.bind(this));
      this.searchTVShowButton.addEventListener('click', this.handleTVShowSearch.bind(this));
      this.tvShowForm.addEventListener('submit', this.handleTVShowFormSubmission.bind(this));
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
      li.className = 'list-group-item bg-secondary text-light d-flex justify-content-between align-items-center';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `${title} Cover`;
      img.className = 'img-thumbnail mr-3';
      img.style.width = '300px';

      const div = document.createElement('div');
      div.innerHTML = `<strong>#${this.movieCounter}</strong>: <strong>${title}</strong><br>${review}`;
      div.style.fontSize = '1.5em';
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-lg ml-3';
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        this.movieItems.removeChild(li);
        this.saveMovies();
      });

      const editButton = document.createElement('button');
      editButton.className = 'btn btn-warning btn-lg ml-3';
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', () => {
        if (editButton.innerText === 'Edit') {
          const reviewTextArea = document.createElement('textarea');
          reviewTextArea.className = 'form-control bg-dark text-light';
          reviewTextArea.value = review;
          div.innerHTML = `<strong>#${this.movieCounter}</strong>: <strong>${title}</strong><br>`;
          div.appendChild(reviewTextArea);
          editButton.innerText = 'Submit';
        } else {
          review = div.querySelector('textarea').value;
          div.innerHTML = `<strong>#${this.movieCounter}</strong>: <strong>${title}</strong><br>${review}`;
          editButton.innerText = 'Edit';
          this.saveMovies();
        }
      });

      li.appendChild(img);
      li.appendChild(div);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      this.movieItems.appendChild(li);

      this.movieCounter++;
    }

    renderTVShowItem(title, review, image) {
      const li = document.createElement('li');
      li.className = 'list-group-item bg-secondary text-light d-flex justify-content-between align-items-center';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `${title} Cover`;
      img.className = 'img-thumbnail mr-3';

      const div = document.createElement('div');
      div.innerHTML = `<strong>#${this.tvShowCounter}</strong>: <strong>${title}</strong><br>${review}`;
      div.style.fontSize = '1.5em';
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-lg ml-3';
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        this.tvShowItems.removeChild(li);
        this.saveTVShows();
      });

      const editButton = document.createElement('button');
      editButton.className = 'btn btn-warning btn-lg ml-3';
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', () => {
        if (editButton.innerText === 'Edit') {
          const reviewTextArea = document.createElement('textarea');
          reviewTextArea.className = 'form-control bg-dark text-light';
          reviewTextArea.value = review;
          div.innerHTML = `<strong>#${this.tvShowCounter}</strong>: <strong>${title}</strong><br>`;
          div.appendChild(reviewTextArea);
          editButton.innerText = 'Submit';
        } else {
          review = div.querySelector('textarea').value;
          div.innerHTML = `<strong>#${this.tvShowCounter}</strong>: <strong>${title}</strong><br>${review}`;
          editButton.innerText = 'Edit';
          this.saveTVShows();
        }
      });

      li.appendChild(img);
      li.appendChild(div);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      this.tvShowItems.appendChild(li);

      this.tvShowCounter++;
    }

    saveMovies() {
      const movies = [];
      this.movieItems.querySelectorAll('li').forEach((li) => {
        const title = li.querySelector('div strong').textContent.split(': ')[1];
        const review = li.querySelector('div').innerHTML.split('<br>')[1];
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

    saveTVShows() {
      const tvShows = [];
      this.tvShowItems.querySelectorAll('li').forEach((li) => {
        const title = li.querySelector('div strong').textContent.split(': ')[1];
        const review = li.querySelector('div').innerHTML.split('<br>')[1];
        const image = li.querySelector('img').src;
        tvShows.push({ title, review, image });
      });
      localStorage.setItem('tvShows', JSON.stringify(tvShows));
    }

    loadTVShows() {
      const tvShows = JSON.parse(localStorage.getItem('tvShows')) || [];
      if (tvShows.length > 0) {
        tvShows.forEach((tvShow, index) => {
          this.tvShowCounter = index + 1;
          this.renderTVShowItem(tvShow.title, tvShow.review, tvShow.image);
        });
      }
    }

    fetchDetails(title, type) {
      const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&type=${type}&apikey=${this.OMDB_API_KEY}`;
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
        this.fetchDetails(title, 'movie')
          .then(data => {
            this.movieSearchTitle.value = data.Title;
            this.movieImage.value = data.Poster;
          })
          .catch(error => {
            alert(`Error: ${error.message}`);
          });
      }
    }

    handleTVShowSearch() {
      const title = this.tvShowSearchTitle.value;
      if (title) {
        this.fetchDetails(title, 'series')
          .then(data => {
            this.tvShowSearchTitle.value = data.Title;
            this.tvShowImage.value = data.Poster;
          })
          .catch(error => {
            alert(`Error: ${error.message}`);
          });
      }
    }

    handleMovieFormSubmission(event) {
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

    handleTVShowFormSubmission(event) {
      event.preventDefault();

      const tvShowTitle = this.tvShowSearchTitle.value;
      const tvShowReviewText = this.tvShowReview.value;
      const tvShowImageUrl = this.tvShowImage.value;

      if (tvShowTitle && tvShowReviewText && tvShowImageUrl) {
        this.renderTVShowItem(tvShowTitle, tvShowReviewText, tvShowImageUrl);
        this.saveTVShows();
        this.tvShowForm.reset();
      }
    }
  }

  new MediaApp();
});
