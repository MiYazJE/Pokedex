
async function loadPokemons() {
    console.log(API_POKEMON)
    const response = await fetch(API_POKEMON);
    const json     = await response.json();
    API_POKEMON    = json.next;
    pokemons       = json.results;
}

function rellenarInformacion() {
    pokemons.forEach(async (pokemon) => {

        // Recoger imágen
        const response    = await fetch(pokemon.url);
        const jsonPokemon = await response.json();
        let src           = jsonPokemon.sprites['front_default'];

        // Recoger descripcion del pokemon a partir de su id
        const responseDescription = await fetch(DESCRIPTION + ((jsonPokemon.id % 30) + 1));
        const jsonDescription     = await responseDescription.json();
        let description           = jsonDescription.descriptions[1].description;

        // Recoger los movimientos
        let movesContent = '';
        for (let i = 0; i < 4; i++) {
            movesContent += `
                <div class="move">${jsonPokemon.moves[i].move.name}</div>
            `;
        }

        // Crear la estructura html con la información del pokemon y agregarla al body
        let pokemonBox = createPokemonBox(pokemon.name, src, description, jsonPokemon.id, movesContent);
        body.innerHTML += pokemonBox;
    })
}

function createPokemonBox(nombre, src, description, id, moves) {
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
                    <div class="wrapDescription">
                        <p class="descripcion">${description}</p>
                    </div>
                </div>
                <div class="info">
                    <div class="movesWrap">
                        <h3 class="move">ATACKS</h3>
                        ${moves}
                    </div>
                </div>
            </div>

        </div>
    `;
}

let API_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
const DESCRIPTION = 'https://pokeapi.co/api/v2/characteristic/';

const body = document.querySelector('body');
let pokemons;

document.querySelector('.btnVerMas').onclick = () => {
    loadPokemons()
        .then(rellenarInformacion)
        .catch(err => err)
}

// Cargar objetos "pokemon"
setInterval( () => {
    loadPokemons()
        .then(rellenarInformacion)
        .catch(err => err)
}, 5000);