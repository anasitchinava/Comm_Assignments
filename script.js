const poke_container = document.getElementById('poke-container');
const nextButton = document.getElementById('nextBtn');
const pokemon_count = 16;
const maxPokemons = 5;
const selectedPokemonsArr = [];

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
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const data = await res.json();

    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
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
    poke_container?.appendChild(pokemonEl);


    let clickMenu;

    pokemonEl.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
        closeActiveMenu();

        clickMenu = document.createElement("div");
        clickMenu.classList.add('click-menu');
        clickMenu.innerHTML = `
            <div class="menu-item" onclick="choosePokemon('${pokemon.id}')">Choose Pokemon</div>
            <div class="menu-item" onclick="seeDetails('${pokemon.id}')">See Details</div>
        `;

        clickMenu.style.top = `${ev.clientY}px`;
        clickMenu.style.left = `${ev.clientX}px`;

        document.body.appendChild(clickMenu);
        document.addEventListener('click', (clickEvent) => {
            if (!clickMenu?.contains(clickEvent.target) && !pokemonEl?.contains(clickEvent.target)) {
                closeActiveMenu();
            }
        });
    });

    function closeActiveMenu() {
        if (clickMenu) {
            clickMenu.remove();
            clickMenu = null;
        }
    }
}

function seeDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

function choosePokemon(id) {
    if (selectedPokemonsArr.length === maxPokemons) {
        alert(`Pokemons' limit exceeded!`);
        return;
    }
    
    if (!selectedPokemonsArr.includes(id)) {
        selectedPokemonsArr.push(id);

        const selectedPokemonsDiv = document.getElementById('selected-pokemons');
        const selectedPokemonItem = document.createElement('div');
        selectedPokemonItem.textContent = `Selected Pokemon: ${id}`;
        selectedPokemonsDiv.appendChild(selectedPokemonItem);

        if (selectedPokemonsArr.length === maxPokemons) {
            nextBtn.disabled = false;
            localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemonsArr));
        }
    }
}

nextButton.addEventListener('click', function() {
    if (selectedPokemonsArr.length === maxPokemons) {
        window.location.href = 'battle.html';
    } else {
        alert('Please select at least 5 pokemons before proceeding!');
    }
});

fetchPokemon();