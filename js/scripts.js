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


// Using for loop to go through the name and height of the array

/* for (let i = 0; i < pokemonList.length; i++) {

// Writes the Pokémon name on your website’s DOM (Also HTML tags h2 and div were used to style)
  document.write("<div>"+
  "<h2>"+ pokemonList[i].name + " (height: " + pokemonList[i].height + " m)"+ "<h2>"+
  "</div>");
}
*/

// Using both loop and conditional to highlight special pokemon
for (let i = 0; i < pokemonList.length; i++) {

  // Setting the condition for big pokemon: any pokemon with a height for than 1.0 m is considered big
  // HTML tag h2 is used to make them each pokemon appear in seperate lines
  if (pokemonList[i].height > 1.0) {
    document.write("<h2>"+ pokemonList[i].name + " (height: " + pokemonList[i].height + " m)"+ " - Wow, that’s big!" + "<h2>");

  // Setting the condition for medium pokemon: any pokemon with a height for between 0.7 and 1.0 m is considered medium
  } else if (pokemonList[i].height >= 0.7 && pokemonList[i].height <= 1.0) {
    document.write("<h2>"+ pokemonList[i].name + " (height: " + pokemonList[i].height + " m)"+ " - a medium-sized pokemon" + "<h2>");

  // All others are considered small
  } else {
    document.write("<h2>"+ pokemonList[i].name + " (height: " + pokemonList[i].height + " m)"+ " - it's a small pokemon" + "<h2>");
  }
}
