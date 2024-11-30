const searchBar = document.getElementById('search-bar');
const pokemonList = document.querySelector('#page2 .pokemon-list');
const trendingPokemonDiv = document.querySelector('.trending-pokemon');

// Pokémon data
const pokemonData = {
    pikachu: { 
        description: 'Electric mouse Pokémon. It can generate powerful electric shocks from its cheeks.', 
        image: 'pikachu.png',
        stats: { hp: 35, attack: 55, defense: 40 },
        type: 'Electric' 
    },
    charmander: { 
        description: 'Fire lizard Pokémon. It has a flame burning on the tip of its tail.', 
        image: 'charmander.png',
        stats: { hp: 39, attack: 52, defense: 43 },
        type: 'Fire' 
    },
    squirtle: { 
        description: 'Tiny Turtle Pokémon. It shelters itself in its shell when in danger.', 
        image: 'squirtle.png', 
        stats: { hp: 44, attack: 48, defense: 65 },
        type: 'Water' 
    },
    bulbasaur: {
        description: 'Seed Pokémon. A strange seed was planted on its back at birth. The seed slowly grows larger.',
        image: 'bulbasaur.png',
        stats: { hp: 45, attack: 49, defense: 49 },
        type: 'Grass'
    },
    eevee: {
        description: 'Evolution Pokémon. Its genetic code is irregular. It may evolve in a variety of ways.',
        image: 'eevee.png',
        stats: { hp: 55, attack: 55, defense: 50 },
        type: 'Normal'
    },
    jigglypuff: {
        description: 'Balloon Pokémon. When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.',
        image: 'jigglypuff.png',
        stats: { hp: 115, attack: 45, defense: 20 },
        type: 'Normal'
    },
    mewtwo: {
        description: 'Genetic Pokémon. It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.',
        image: 'mewtwo.png',
        stats: { hp: 106, attack: 110, defense: 90 },
        type: 'Psychic'
    },
    gengar: {
        description: 'Shadow Pokémon. Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.',
        image: 'gengar.png',
        stats: { hp: 60, attack: 65, defense: 60 },
        type: 'Ghost'
    },
    machamp: {
        description: 'Superpower Pokémon. Its four ruggedly developed arms can launch a flurry of 1,000 punches in just two seconds.',
        image: 'machamp.png',
        stats: { hp: 90, attack: 130, defense: 80 },
        type: 'Fighting'
    },
    gyarados: {
        description: 'Atrocitas Pokémon. Once it begins to rampage, its ferociously violent blood doesn’t calm until it has burned everything down.',
        image: 'gyarados.png',
        stats: { hp: 95, attack: 125, defense: 79 },
        type: 'Water'
    }
};

// Function to display Pokémon information
function displayPokemonInfo(pokemonName) {
    const pokemon = pokemonData[pokemonName];
    if (pokemon) {
        pokemonList.innerHTML = `
            <div>
                <img src="${pokemon.image}" alt="${pokemonName}">
                <h3>${pokemonName}</h3>
                <p>${pokemon.description}</p>
                <p>Type: ${pokemon.type}</p>
                <p>Stats: HP: ${pokemon.stats.hp}, Attack: ${pokemon.stats.attack}, Defense: ${pokemon.stats.defense}</p>
            </div>
        `;
    } else {
        pokemonList.innerHTML = "<p>Pokémon not found.</p>";
    }
}

// Search functionality with trending logic
const searchCounts = {}; // Object to store search counts for each Pokémon

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const matchingPokemon = Object.keys(pokemonData).filter(pokemonName => {
        return pokemonName.toLowerCase().includes(searchTerm);
    });

    if (matchingPokemon.length > 0) {
        const searchedPokemon = matchingPokemon[0];
        searchCounts[searchedPokemon] = (searchCounts[searchedPokemon] || 0) + 1;
        displayPokemonInfo(searchedPokemon); // Display the first match
        updateTrendingPokemon();
    } else {
        pokemonList.innerHTML = "<p>Pokémon not found.</p>";
    }
});

function updateTrendingPokemon() {
    // Find the Pokémon with the highest search count
    let trendingPokemon = null;
    let maxCount = 0;
    for (const pokemon in searchCounts) {
        if (searchCounts[pokemon] > maxCount) {
            maxCount = searchCounts[pokemon];
            trendingPokemon = pokemon;
        }
    }

    // Display the trending Pokémon
    if (trendingPokemon) {
        const trendingPokemonInfo = pokemonData[trendingPokemon];
        trendingPokemonDiv.innerHTML = `
            <img src="${trendingPokemonInfo.image}" alt="${trendingPokemon}">
            <h3>${trendingPokemon}</h3>
            <p>Searched ${maxCount} times</p>
        `;
    }
}

// Hover effect for Pokémon icons
const pokemonContainers = document.querySelectorAll('.pokemon-container');
pokemonContainers.forEach(container => {
    container.addEventListener('mouseover', () => {
        container.querySelector('.overlay').style.display = 'flex'; // Use flex to center content
    });
    container.addEventListener('mouseout', () => {
        container.querySelector('.overlay').style.display = 'none';
    });
});

// Navigation tabs functionality
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    });
});
