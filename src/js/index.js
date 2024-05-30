
document.addEventListener('DOMContentLoaded', () => {
    const moviesLink = document.getElementById('moviesLink');
    const tvShowsLink = document.getElementById('tvShowsLink');
    const moviesList = document.getElementById('moviesList');
    const tvShowsList = document.getElementById('tvShowsList');
    const movieForm = document.getElementById('movieForm');
    const movieItems = document.getElementById('movieItems');
    let movieCounter = 1;
    moviesLink.addEventListener('click', () => {
      moviesList.classList.remove('d-none');
      tvShowsList.classList.add('d-none');
      moviesLink.classList.add('active');
      tvShowsLink.classList.remove('active');
    });
  
    tvShowsLink.addEventListener('click', () => {
      tvShowsList.classList.remove('d-none');
      moviesList.classList.add('d-none');
      tvShowsLink.classList.add('active');
      moviesLink.classList.remove('active');
    });
  
    // Function to render a movie item
    const renderMovieItem = (title, review) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>#${movieCounter}</strong>: <strong>${title}</strong>: ${review}`;
        movieItems.appendChild(li);
        movieCounter++; // Increment the counter for the next movie
    };
  
    // Handle form submission
    movieForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const movieTitle = document.getElementById('movieTitle').value;
      const movieReview = document.getElementById('movieReview').value;
  
      if (movieTitle && movieReview) {
        renderMovieItem(movieTitle, movieReview);
  
        // Clear form fields
        movieForm.reset();
      }
    });
  });
  
  