document.addEventListener('DOMContentLoaded', () => {
  const moviesLink = document.getElementById('moviesLink');
  const tvShowsLink = document.getElementById('tvShowsLink');
  const moviesList = document.getElementById('moviesList');
  const tvShowsList = document.getElementById('tvShowsList');
  const movieForm = document.getElementById('movieForm');
  const movieItems = document.getElementById('movieItems');

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

  // Counter for movie items
  let movieCounter = 4;

  // Function to render a movie item
  const renderMovieItem = (title, review, image) => {
    const li = document.createElement('li');
    li.className = 'list-group-item bg-secondary text-light';

    const img = document.createElement('img');
    img.src = image;
    img.alt = `${title} Cover`;
    img.className = 'img-thumbnail mr-3';

    const div = document.createElement('div');
    div.innerHTML = `<strong>#${movieCounter}</strong>: <strong>${title}</strong>`;

    const descButton = document.createElement('button');
    descButton.className = 'btn btn-info description-btn ml-3';
    descButton.innerText = 'Description';
    descButton.addEventListener('click', () => {
      const description = li.querySelector('.description');
      if (description.classList.contains('hidden-description')) {
        description.classList.remove('hidden-description');
      } else {
        description.classList.add('hidden-description');
      }
    });

    const description = document.createElement('div');
    description.className = 'description hidden-description mt-2';
    description.innerText = review;

    li.appendChild(img);
    li.appendChild(div);
    li.appendChild(descButton);
    li.appendChild(description);
    movieItems.appendChild(li);

    movieCounter++; // Increment the counter for the next movie
  };

  // Handle form submission
  movieForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const movieTitle = document.getElementById('movieTitle').value;
    const movieReview = document.getElementById('movieReview').value;
    const movieImage = document.getElementById('movieImage').value;

    if (movieTitle && movieReview && movieImage) {
      renderMovieItem(movieTitle, movieReview, movieImage);

      // Clear form fields
      movieForm.reset();
    }
  });
});
