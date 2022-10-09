//The Pokémon list is defined and housed within an IIFE.

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


// The following two functions displays and hides loading message

  let showLoadingMessage = function () {
    console.log('Pokemon data is being loaded...')
  }

  let hideLoadingMessage = function () {
    console.log('Pokemon data loaded successfuly!')
  }



//validatas if the added item is an object and follows specified conditions

  function add(pokemon) {
    if (typeof pokemon === 'object' &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
  ) {
      pokemonList.push(pokemon);
    } else {
      console.log('please enter valid data');
    }
  }

  function getAll() {
    return pokemonList;
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

// This function fetches pokemon data from API, then add each pokemon to the pokemonList with the add() function

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    })
  }


// This function loads selected data for the respective pokemon

  function loadDetails (item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
    });
  }

// This function executes the loadDetails() function

  function showDetails (item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

//The IIFE then returns an object with two keys: add and getAll.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
  });
});
