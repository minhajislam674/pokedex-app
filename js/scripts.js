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
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.log('please enter valid data');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let list = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    list.appendChild(button);
    pokemonList.appendChild(list);

    //Adding event listener 'click' and calling eventHander showDetails
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

//The IIFE then returns an object with two keys: add and getAll.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
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

pokemonRepository.getAll().forEach(function(pokemon) {
pokemonRepository.addListItem(pokemon)
});
