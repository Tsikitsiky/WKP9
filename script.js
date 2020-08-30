const main = document.querySelector('main');
let movies = [];

// Fetch the movies from the link
async function fetchMovies() {
	const response = await fetch('https://ghibliapi.herokuapp.com/films', {
		headers: {
			Accept: 'application/json',
		},
	});
    const data = await response.json();
    return data;
}

// After fetching display the movies list 
async function fetchAndDisplay() {
    movies = await fetchMovies();
    displayMovies(movies);
}

//Function which generate the html to display the list
function displayMovies(myMovies) {
    const html = myMovies.sort((a, b) => b.rt_score - a.rt_score) // Sort by the score rate
                         .map(movie => {
                            return `
                            <article>
                            <h3>${movie.title}</h3>
                            <p class="release_date">Release in: ${movie.release_date}</p>
                            <p class="rt_rate">rt_score: ${movie.rt_score}</p>
                            <p class="description">${movie.description}</p>
                            <p class="director">Director: ${movie.director}</p>
                            <p class="producer">Producer: ${movie.producer}</p>
                        </article>
                            `
                        }).join('');
    main.innerHTML = html;
}

fetchAndDisplay();
