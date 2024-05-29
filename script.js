/*fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')*/
let pokeid = 1;
buildTeamSlots ();
buildPage ();

function buildTeamSlots () {
  const slots = document.querySelector('#team-slots');
  for (let i = 0; i<6; ++i) {
    const li = document.createElement('li');
    li.id = 'pokemon' + (i+1);
    li.dataset.empty = 'true';

    const img = document.createElement('img');
    img.src = 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokeball-128.png';

    li.appendChild(img)
    slots.appendChild(li);
  }
}


function buildPage () {
    
  fetch (`https://pokeapi.co/api/v2/pokemon/${pokeid}/`)
  .then (response => response.json())
  .then (pokemon => {
    const img = document.getElementById('pokemonSprite');
    const pokemonSprite = pokemon.sprites.front_default;
    img.src = pokemonSprite;
    img.style.display = 'block';

    const id = document.getElementById('id');
    id.innerText = '#' + pokemon.id;

    const pokemonName = pokemon.forms[0].name;
    const name = document.getElementById('pokemonName');
    name.innerText = pokemonName;

    const pokemonType1 = pokemon.types[0].type.name.toUpperCase();
    const type1 = document.getElementById('type1');
    type1.innerText = pokemonType1;
    type1.style.backgroundColor = colorType (pokemonType1);
    const type2 = document.getElementById('type2');

    if (pokemon.types.length > 1) {
      const pokemonType2 = pokemon.types[1].type.name.toUpperCase();
      type2.innerText = pokemonType2;
      type2.style.backgroundColor = colorType (pokemonType2);
      type2.style.boxShadow = '3px 3px 5px rgba(0, 0, 0, 0.1)';

    }
        
    else {
      type2.innerText = '';
      type2.style.backgroundColor = 'transparent';
      type2.style.boxShadow = 'none';
    }

  })
  .catch (error => console.error(error))
}

  

function prevPokemon () {
  if (pokeid == 1) {
    pokeid = 151;
  }
  else {
    --pokeid;
  }

  buildPage ();
}


function nextPokemon () {
  if (pokeid == 151) {
    pokeid = 1;
  }
  else {
    ++pokeid;
  }
  buildPage ();
}
  



function colorType (type) {
  switch (type) {
    case 'GRASS':
      return '#78C850';
    case 'FIRE':
      return '#F08030';
    case 'NORMAL':
      return '#A8A878';
    case 'FIGHTING':
      return '#C03028';
    case 'FLYING':
      return '#A890F0';
    case 'POISON':
      return '#A040A0';
    case 'GROUND':
      return '#E0C068';
    case 'ROCK':
        return '#B8A038';
    case 'BUG':
      return '#A8B820';
    case 'GHOST':
      return '#705898';
    case 'STEEL':
      return '#B8B8D0';
    case 'WATER':
      return '#6890F0';
    case 'ELECTRIC':
      return '#F8D030';
    case 'PSYCHIC':
      return '#F85888';
    case 'ICE':
      return '#98D8D8';
    case 'DRAGON':
      return '#7038F8';
    case 'DARK':
      return '#705848';
    case 'FAIRY':
      return '#EE99AC';
      
    default:
      return '#FFFFFF';
  }
}

function idPoke (button) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => {
    btn.disabled = false;
  });

  button.disabled = true;

  document.getElementById('showAll').style.display = "none";
  document.getElementById('searchPoke').style.display = "none";
  const section = document.getElementById('by-id');
  section.style.display = "flex";

  pokeid = 1;
  buildPage();

}


function showAll (button) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => {
    btn.disabled = false;
  });

  button.disabled = true;
  document.getElementById('by-id').style.display = "none";
  document.getElementById('searchPoke').style.display = "none";
  const section = document.getElementById('showAll')
  section.style.display = "block";

  fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
  .then (response => response.json ())
  .then (data => {
    const pokemons = data.results;
    pokemons.forEach(pokemon => {
      fetch (pokemon.url)
      .then (response => response.json ())
      .then (pokemonData => {
        const pokemonSprite = document.createElement('img');
        pokemonSprite.src = pokemonData.sprites.front_default;
        section.appendChild(pokemonSprite);
      })
      .catch(err => console.error(err))
    });
  })
  .catch(err => console.error(err))
}


function searchBtn (button) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => {
    btn.disabled = false;
  });

  button.disabled = true;

  document.getElementById('by-id').style.display = "none";
  document.getElementById('showAll').style.display = "none";
  const section = document.getElementById('searchPoke')
  section.style.display = "block";

}


async function searchByName () {
  

  try {
    const pokemonName = document.getElementById("inputName").value.toLowerCase();
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
    
    if (!response.ok) {
      throw new Error ('Não foi possível carregar a API');
    }

    const data = await response.json();
    const pokemons = data.results;

    const searchedPokemons = pokemons.filter(pokemon => pokemon.name.includes(pokemonName));
    const section = document.getElementById('searchPoke');
    const inputField = document.getElementById('inputName');
    const searchButton = section.querySelector('button');
    section.innerHTML = '';
    section.appendChild(inputField);
    section.appendChild(searchButton);

    for (const pokemon of searchedPokemons) {
      const pokemonResponse = await fetch(pokemon.url)

      if (!pokemonResponse.ok) {
        throw new Error ('Não foi possível carregar os dados do pokemon');
      }

      const pokemonData = await pokemonResponse.json();

      const pokemonSprite = document.createElement('img');
      pokemonSprite.src = pokemonData.sprites.front_default;
      section.appendChild(pokemonSprite);

    }
   
  } 
  catch (error) {
    console.error(error);
  }


}


function addPokemon (button) {
  const slots = document.querySelectorAll('#team-slots li');
  let slot = null;

  for (let i = 0; i < slots.length; ++i) {
    if (slots[i].dataset.empty === 'true') {
      slot = slots[i];
      break;
    }
  }

  if (slot) {
    slot.dataset.empty = 'false';
    const img = slot.querySelector('img');
    const pokemonSprite = button.querySelector('#pokemonSprite');
    console.log(pokemonSprite);
    img.src = pokemonSprite.src;
  }


}





