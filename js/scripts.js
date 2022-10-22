//The Pokémon list is defined and housed within an IIFE.

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';

  //Modal feature with jQuery

  const $ = window.$;
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    //Creating elements inside of modal

    let titleElement = $('<h1>' + item.name + '</h1>');

    let heightElement = $('<p>' +  '<strong>' + 'Height: ' + '</strong>' + item.height + '</p>');

    let pokemonTypes = item.types.map(({ type }) => type.name);
    let typesElement = $('<p>' + '<strong>'+ 'Types: ' + '</strong>' + pokemonTypes.join(', ') + '</p>');

    let pokemonAbilities = item.abilities.map(({ ability }) => ability.name);
    let abilitiesElement = $('<p>' +  '<strong>' + 'Abilities: ' + '</strong>'  + pokemonAbilities.join(', ') + '</p>');

    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imageElement);
  }


  //validatas if the added item is an object and follows specified conditions

  function add(pokemon) {
    if (typeof pokemon === 'object' &&
    'name' in pokemon &&
    'detailsUrl' in pokemon
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
    let pokemonList = document.querySelector('.pokemon-list');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-modal')
    pokemonList.appendChild(button);

    //Adding event listener 'click' and calling eventHander showDetails
    button.addEventListener('click', function(){
    showDetails(pokemon);
    });
  }


  // create and append pokemon loading message
  function showLoadingMessage() {
    let pokemonList = document.querySelector('.pokemon-list');
    let loadingMessage = document.createElement('p');
    loadingMessage.classList.add('loading-message');
    loadingMessage.innerText = 'Loading pokemons, please wait';
    pokemonList.appendChild(loadingMessage);
  }

  // hide loading message
  function hideLoadingMessage() {
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = '';
  }

  // This function fetches pokemon data from API, then add each pokemon to the pokemonList with the add() function

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        hideLoadingMessage();
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }


  // This function loads selected data for the respective pokemon

  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function(e) {
      console.error(e);
    });
  }

// This function executes the loadDetails() function

  function showDetails (item) {
    pokemonRepository.loadDetails(item)
    .then(function () {
      showModal(item);
    });
  }

  // Search pokemon feature

    const searchInput = document.getElementById('searchBar');
    const pokemonListElement = document.getElementsByClassName('pokemon-list')[0];
      searchInput.addEventListener('keyup', (e) => {
        let searchString = e.target.value.trim().toLowerCase();
        if (searchString.length) {
          // items inside the pokemon list ("ul" element)
          const pokemonListItems = pokemonListElement.getElementsByTagName('button');
          for (let i = 0; i < pokemonListItems.length; i++) {
            // The button inside each item list
            const pokemonButtonInsideItem = pokemonListItems[i];
            // Pokemon name that appears on the button
            const pokemonName = pokemonButtonInsideItem.innerText;
            if (pokemonName.toLowerCase().includes(searchString)) {
              // Display an item that include the search string
              pokemonListItems[i].style.display = '';
            } else {
              // Hide item list that does not include the search string
              pokemonListItems[i].style.display = 'none';
            }
          }
        }
      })

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
