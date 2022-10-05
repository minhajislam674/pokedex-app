//The Pokémon list is defined and housed within an IIFE.

let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur',
      types: ['grass', 'posion'],
      height: 0.7,
      abilities: ['Chlorophyll', 'Overgrow']
    },

    { name: 'Metapod',
      types: ['bug', 'posion'],
      height: 0.7,
      abilities: 'Shed-skin'
    },

    { name: 'Butterfree',
      types: ['bug', 'flying'],
      height: 1.1,
      abilities: ['Compoundeyes', 'Tinted-lens']
    },

    { name: 'Vulpix',
      types: 'fire',
      height: 0.6,
      abilities: ['Chlorophyll', 'Overgrow']
    }
  ];

//The following two functions are what will allow anything outside the IIFE to interact with the pokemonList variable within it.

  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

//The IIFE then returns an object with two keys: add and getAll.

  return {
    add: add,
    getAll: getAll
  };
})();



console.log(pokemonRepository.getAll()); // returns pokemonList Array which has 4 pokemons

// Adds a new pokemon in the pokemonRepository
pokemonRepository.add(
  { name: 'Charmander',
    types: 'fire',
    height: 2,
    abilities: 'Blaze'
});

console.log(pokemonRepository.getAll()); // returns pokemonList Array which has now 5 pokemons


//Using forEach() loops
function myPokemonFunction(pokemon){
  if (pokemon.height > 1.0) {
    document.write("<h2>"+ pokemon.name + " (height: " + pokemon.height + " m)"+ " - Wow, that’s big!" + "<h2>");
  } else if (pokemon.height >= 0.7 && pokemon.height <= 1.0) {
    document.write("<h2>"+ pokemon.name + " (height: " + pokemon.height + " m)"+ " - a medium-sized pokemon" + "<h2>");
  } else {
    document.write("<h2>"+ pokemon.name + " (height: " + pokemon.height + " m)"+ " - it's a small pokemon" + "<h2>");
  }
}

pokemonRepository.getAll().forEach(myPokemonFunction);
