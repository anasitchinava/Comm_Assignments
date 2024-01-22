const myTeam = document.getElementById('my-team');
const enemies = document.getElementById('enemies');
const selectedPokemonsStr = localStorage.getItem('selectedPokemons');
const selectedPokemons = JSON.parse(selectedPokemonsStr);

const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(selectedPokemons[i]);
    }
}

const getPokemon = async (id, isEnemy) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const data = await res.json();

    if (isEnemy) {
        createPokemonCard(data, true);
    } else {
        createPokemonCard(data);
    }
}

const createPokemonCard = (pokemon, isEnemy) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const id = pokemon.id.toString().padStart(3, '0');
    const name = pokemon.name;
    const poke_type = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_type.indexOf(type) > -1);
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHtml = 
    `<span class="number">#${id}</span>
    <div class="img_container">
        <img src="${pokemon?.sprites?.other?.dream_world?.front_default}">
    </div>
    <div class="info">
        <h3 class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <small class="type">type : ${type}</small>
    </div>`

    pokemonEl.innerHTML = pokemonInnerHtml;
    if (isEnemy) {
        enemies?.appendChild(pokemonEl);
    } else {
        myTeam?.appendChild(pokemonEl);
    }
}

function drawSelectedPokemons(selectedPokemons) {
    for (let i = 0; i <= selectedPokemons?.length; i++) {
        getPokemon(i);
    }
}

function drawEnemies() {
    const numberOfEnemies = 5;
    const maxPokemonId = 500;
    const getRandomPokemonId = () => Math.floor(Math.random() * maxPokemonId) + 1;
    const enemyIds = Array.from({ length: numberOfEnemies }, getRandomPokemonId);
    enemyIds.forEach((id) => getPokemon(id, true));
}

drawSelectedPokemons(selectedPokemons);
drawEnemies();