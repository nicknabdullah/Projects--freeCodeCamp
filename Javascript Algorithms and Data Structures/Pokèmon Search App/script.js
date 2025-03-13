const allPokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const types = document.getElementById("types");
const hp =  document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprite = document.getElementById("sprite");

let pokemonArray = [];

const typeColors = {
    normal: "#A8A77A",
    fighting: "#C22E28",
    flying: "#A98FF3",
    poison: "#A33EA1",
    ground: "#E2BF65",
    rock: "#B6A136",
    bug: "#A6B91A",
    ghost: "#735797",
    steel: "#B7B7CE",
    fire: "#EE8130",
    water: "#6390F0",
    grass: "#7AC74C",
    electric: "#F7D02C",
    psychic: "#F95587",
    ice: "#96D9D6",
    dragon: "#6F35FC",
    dark: "#705746",
    fairy: "#D685AD",
    stellar: "#FFD700", // Custom type
    unknown: "#A8A8A8"  // Custom type
};

const fetchPokemon = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        pokemonArray = data.results;

        console.log("Pokemon list fetched:", pokemonArray);
    } catch (err) {
        console.error("Failed to fetch Pokemon list:", err);
    }
};

const fetchDetails = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Details fetched:", data);

        if(data && typeof data === "object") {
            // display details of the data to the stats table
            displayDetails(data);
        }
 
    } catch (err) {
        console.error("Failed to fetch Details:", err);
    }
};

// Clear the details of the Pokémon
const clearPokemonDetails = () => {
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    height.textContent = "";
    weight.textContent = "";
    types.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    sprite.src = "";
};

const displayDetails = (data) => {
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = '#'+data.id;
    weight.textContent = 'Weight: '+data.weight;
    height.textContent = 'Height: '+data.height;
    for (let i = 0; i < data.types.length; i++) {
        const typeName = data.types[i].type.name.toLowerCase();
        const typeClass = `type-${typeName}`;
        types.innerHTML += `
            <span class="type ${typeClass}">${data.types[i].type.name.toUpperCase()}</span>
        `;
    }
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
    sprite.src = data.sprites.front_default;
}


const findPokemonFromList = (value) => {
    const searchValue = value.trim().toLowerCase();

    let searchResult;

    if (!isNaN(searchValue)) {
        // If input is a number, search by ID
        const searchId = parseInt(searchValue);
        searchResult = pokemonArray.find(pokemon => pokemon.id === searchId);
    } else {
        // If input is a string, search by name
        searchResult = pokemonArray.find(pokemon => pokemon.name.toLowerCase() === searchValue);
    }

    if (searchResult) {
        console.log("Found Pokemon:", searchResult);
        fetchDetails(searchResult.url);
    } else {
        alert("Pokémon not found");
    }
};

// Fetch the list of all Pokémon on page load
fetchPokemon(allPokemonUrl);

searchButton.addEventListener("click", () => {
    event.preventDefault();
    clearPokemonDetails();
    findPokemonFromList(searchInput.value);
});