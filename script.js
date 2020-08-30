const main = document.querySelector('main');
let movies = [];

async function fetchMovies() {
	const response = await fetch('https://ghibliapi.herokuapp.com/films', {
		headers: {
			Accept: 'application/json',
		},
	});
    const data = await response.json();
    return data;
}

async function fetchAndDisplay() {
    movies = await fetchMovies();
    displayMovies(movies);
}

function displayMovies(myMovies) {
    const html = myMovies.sort((a, b) => b.rt_score - a.rt_score)
                         .map(movie => {
                            return `
                            <article>
                            <h3>${movie.title}</h3>
                            <p class="release_date">Release in: ${movie.release_date}</p>
                            <p class="rt_rate">rt_score: ${movie.rt_score}</p>
                            <p class="description">${movie.description}</p>
                            <p class="director">${movie.director}</p>
                            <p class="producer">${movie.producer}</p>
                        </article>
                            `
                        }).join('');
    main.innerHTML = html;
}

fetchAndDisplay();
