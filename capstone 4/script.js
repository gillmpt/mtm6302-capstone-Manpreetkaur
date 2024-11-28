const pokemonList = document.getElementById('pokemon-list');
const loadMoreBtn = document.getElementById('load-more');
const caughtList = document.getElementById('caught-list');
const releasedList = document.getElementById('released-list');
let offset = 0;
const limit = 20;
let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

// Fetch Pokémon
async function fetchPokemon(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}

// Render Pokémon
function renderPokemon(pokemonArray) {
    pokemonArray.forEach(pokemon => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');

        const pokemonId = pokemon.url.split('/')[6];
        const isCaught = caughtPokemon.includes(pokemonId);

        pokemonDiv.innerHTML = `
            <p>${pokemon.name}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}">
            <button class="catch-release" data-id="${pokemonId}">
                ${isCaught ? 'Release' : 'Catch'}
            </button>
        `;

        pokemonDiv.querySelector('.catch-release').addEventListener('click', (e) => toggleCatch(e, pokemonId, pokemon.name));
        pokemonList.appendChild(pokemonDiv);
    });
}

// Update Sidebar
function updateSidebar() {
    // Clear lists
    caughtList.innerHTML = '';
    releasedList.innerHTML = '';

    // Update Caught List
    caughtPokemon.forEach(id => {
        const listItem = document.createElement('li');
        listItem.textContent = `Pokémon ID: ${id}`;
        caughtList.appendChild(listItem);
    });

    // Fetch Pokémon and add to Released List
    const totalIds = Array.from({ length: offset + limit }, (_, i) => (i + 1).toString());
    const released = totalIds.filter(id => !caughtPokemon.includes(id));

    released.forEach(id => {
        const listItem = document.createElement('li');
        listItem.textContent = `Pokémon ID: ${id}`;
        releasedList.appendChild(listItem);
    });
}

// Toggle Catch and Release
function toggleCatch(event, pokemonId, pokemonName) {
    const button = event.target;

    if (caughtPokemon.includes(pokemonId)) {
        // Release Pokémon
        caughtPokemon = caughtPokemon.filter(id => id !== pokemonId);
        button.textContent = 'Catch';
    } else {
        // Catch Pokémon
        caughtPokemon.push(pokemonId);
        button.textContent = 'Release';
    }

    // Update localStorage
    localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));

    // Update Sidebar
    updateSidebar();
}

// Load More Button
loadMoreBtn.addEventListener('click', async () => {
    offset += limit;
    const newPokemon = await fetchPokemon(offset, limit);
    renderPokemon(newPokemon);
    updateSidebar();
});

// Initial Load
(async function initialize() {
    const initialPokemon = await fetchPokemon(offset, limit);
    renderPokemon(initialPokemon);
    updateSidebar();
})();