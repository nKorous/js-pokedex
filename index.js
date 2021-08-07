const POKE_API = "https://pokeapi.co/api/v2/pokemon";
let pokemonList;
let selectedPokemon;

function setPokemonPicture() {
    let img = document.getElementById('pokemonImg')
    const imgSrc = selectedPokemon.sprites.other['official-artwork'].front_default !== null
        ? selectedPokemon.sprites.other['official-artwork'].front_default
        : selectedPokemon.sprites.front_default
    img.setAttribute('src', imgSrc)
}

function setPokemonInfo() {

    //Index
    let index = document.getElementById('pokemon-index')
    index.innerText = `Pokedex Entry: ${selectedPokemon.id}`
    
    //Name
    let name = document.getElementById('pokemon-name')
    name.innerText = `Name: ${selectedPokemon.name.toUpperCase()}`


    //Types
    let typeEL = document.getElementById('pokemon-type')
    const typeOne = `<button style="background-color: var(--${selectedPokemon.types[0].type.name}-color); color: white"> ${selectedPokemon.types[0].type.name} </button>`
    const typeTwo = selectedPokemon.types[1] 
        ? ` / <button style="background-color: var(--${selectedPokemon.types[1].type.name}-color); color: white"> ${selectedPokemon.types[1].type.name} </button>` 
        : ""

    typeEL.innerHTML = `Type: ${typeOne}${typeTwo}`

    //Height
    let height = document.getElementById('pokemon-height')
    height.innerText = `Height: ${selectedPokemon.height}`

    //Weight
    let weight = document.getElementById('pokemon-weight')
    weight.innerText = `Weight: ${selectedPokemon.weight}`

    //Games
    let games = document.getElementById('games')
    games.innerHTML = null

    selectedPokemon.game_indices.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = pokemon.version.name

        games.appendChild(li)
    })

}

async function getPokemon(url) {
    await fetch(url)
        .then(data => data.json())
        .then(pokemon => {
            selectedPokemon = pokemon
            setPokemonPicture()
            setPokemonInfo()
            console.log(selectedPokemon)
        })
}

function makePokemonDisplay(){
    const ul = document.getElementById('pokemon-list')

    pokemonList.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = pokemon.name
        li.classList.add('pokemon-list-item')
        li.onclick = () => getPokemon(pokemon.url)
        ul.appendChild(li)
    })

}

async function getPokemonList() {
  await fetch(POKE_API + '?limit=2000')
    .then((data) => data.json())
    .then((parsedPokemon) => {
      pokemonList = parsedPokemon.results;
      makePokemonDisplay()
    });
}




//init
getPokemonList();
