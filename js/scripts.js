//The Pokémon list is defined and housed within an IIFE.

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');



  // Modal section
  function showModal(item) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal contents
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = item.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + item.height;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", item.imageUrl);
    imageElement.setAttribute("max-width", "70%");
    imageElement.setAttribute("max-height", "auto");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // Hides the modal in the following 3 ways

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });



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
      item.types = details.types.type.name;
    }).catch(function(e) {
      console.error(e);
    });
  }

// This function executes the loadDetails() function

  function showDetails (item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
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
