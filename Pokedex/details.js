const pokemon_container = document.getElementById("detailed-pokemon");
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const data = await res.json();

    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    const id = pokemon.id.toString().padStart(3, '0');
    const name = pokemon.name;
    const abilitiesList = pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('');

    const pokemonInnerHtml = 
    `<div class="center">
        <span class="number">#${id}</span>
        <h1>${name}</h1>
        <div class="img_container">
            <img src="${pokemon?.sprites?.other?.dream_world?.front_default}">
        </div>
        <div>
            <h3>Abilities:</h3>
            <ul>${abilitiesList}</ul>
        </div>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHtml;
    pokemon_container?.appendChild(pokemonEl);
}


getPokemon(pokemonId);