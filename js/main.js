
async function loadPokemons() {
    const response = await fetch(API_POKEMON);
    const json     = await response.json();
    pokemons       = json.results;
}

function rellenarInformacion() {
    pokemons.forEach(async (pokemon) => {

        // Recoger imágen
        const response    = await fetch(pokemon.url);
        const jsonPokemon = await response.json();
        let src           = jsonPokemon.sprites['front_default'];

        // Recoger descripcion del pokemon a partir de su id
        const responseDescription = await fetch(API_POKEMON_DESCRIPTION + jsonPokemon.id);
        const jsonDescription     = await responseDescription.json();
        let description           = jsonDescription.descriptions[1].description;

        // Crear la estructura html con la información del pokemon y agregarla al body
        let pokemonBox = createPokemonBox(pokemon.name, src, description, jsonPokemon.id);
        body.innerHTML += pokemonBox;
    })
}

function createPokemonBox(nombre, src, description, id) {
    return `
        <div class="wrapPokemon">

            <div class="cajaNombre">
                <p class="nombre">
                    <span class="id">#${id}</span> ${nombre}
                </p>
            </div>

            <div class="contenido">
                <div class="imagen">
                    <img src="${src}" class="foto">
                </div>
                <div class="info">
                    <div class="wrapDescription">
                        <h3>DESCRIPTION</h3>
                        <p class="descripcion">${description}</p>
                    </div>
                </div>
            </div>

        </div>
    `;
}

const API_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
const API_POKEMON_DESCRIPTION = 'https://pokeapi.co/api/v2/characteristic/';

const body = document.querySelector('body');
let pokemons;

// Cargar objetos "pokemon"
loadPokemons()
    .then(rellenarInformacion)
    .catch(err => err);