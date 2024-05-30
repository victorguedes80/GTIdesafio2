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

    const button = document.createElement('button');
    button.className = 'removeButton';
    button.innerHTML = `<?xml version="1.0" ?><svg id="Icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:#ff7391;}</style><linearGradient gradientUnits="userSpaceOnUse" id="linear-gradient" x1="12" x2="12" y1="0.787" y2="23.088"><stop offset="0" stop-color="#ff4867"/><stop offset="1" stop-color="#e50031"/></linearGradient></defs><circle class="cls-1" cx="12" cy="12" r="11"/><path class="cls-2" d="M13.414,12l3.293-3.293a1,1,0,1,0-1.414-1.414L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414Z"/></svg>`;
    button.style.display = 'none';
    button.onclick = removePokemon;
  
    const div = document.createElement('div');
    div.className = 'sprite-container';

    div.appendChild(img);
    li.appendChild(div);
    li.appendChild(button);
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
  const section = document.getElementById('showAll');
  section.innerHTML = '';
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
    const container = document.getElementById('searchedPokemons');
    container.innerHTML = '';

    for (const pokemon of searchedPokemons) {
      const pokemonResponse = await fetch(pokemon.url);
      let counter = 1;

      if (!pokemonResponse.ok) {
        throw new Error ('Não foi possível carregar os dados do pokemon');
      }

      const pokemonData = await pokemonResponse.json();

      const button = document.createElement('button');
      button.className = 'pokemon-card';
      button.id = "btn"+counter;
      ++counter;
      button.onclick = function () {
        return addPokemon(button);
      };

     

      const pokemonSprite = document.createElement('img');
      pokemonSprite.src = pokemonData.sprites.front_default;
      pokemonSprite.id = 'pokemonSprite';

      const id = document.createElement('p');
      id.innerText = '#' + pokemonData.id;

      const pokemonName = document.createElement('h2');
      pokemonName.innerText = pokemonData.forms[0].name;

      const pokemonType1 = pokemonData.types[0].type.name.toUpperCase();
      const type1 = document.createElement('p');
      type1.id = 'type1';
      type1.innerText = pokemonType1;
      type1.style.backgroundColor = colorType (pokemonType1);
      const type2 = document.createElement('p');

      if (pokemonData.types.length > 1) {
        const pokemonType2 = pokemonData.types[1].type.name.toUpperCase();
        type2.innerText = pokemonType2;
        type2.style.backgroundColor = colorType (pokemonType2);
        type2.style.boxShadow = '3px 3px 5px rgba(0, 0, 0, 0.1)';

      }
        
    else {
      type2.innerText = '';
      type2.style.backgroundColor = 'transparent';
      type2.style.boxShadow = 'none';
    }

    const div = document.createElement('div');
    div.appendChild(type1);
    div.appendChild(type2);

    button.appendChild(pokemonSprite);
    button.appendChild(id);
    button.appendChild(pokemonName);
    button.appendChild(div);
    container.appendChild(button);
    console.log(container);
    

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
    const div = slot.querySelector('div');
    const img = div.querySelector('img');
    const pokemonSprite = button.querySelector('#pokemonSprite');
    console.log(pokemonSprite);
    img.src = pokemonSprite.src;

    const removeBtn = slot.querySelector('button');
    console.log(removeBtn);
    removeBtn.style.display = 'block';
    

    div.style.borderRadius = '50%';
    div.style.overflow = 'hidden';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '2px';
    div.style.borderColor = 'black';
    div.style.width = '110px';
    div.style.height = '110px';

    const color = colorType(button.querySelector('#type1').innerText);
    div.style.backgroundColor = color;
    console.log(color);
  }


}

function removePokemon (event) {

  const li = event.currentTarget.parentNode;
  li.dataset.empty = 'true';
 
  const btn = li.querySelector('button');
  const div = li.querySelector('div');
  const img = li.querySelector('img');
  btn.style.display = 'none';
    

    div.style.borderRadius = '0';
    div.style.overflow = 'show';
    div.style.borderStyle = 'none';
    div.style.width = '120px';
    div.style.height = '120px';
    div.style.backgroundColor = 'transparent';

    img.src = 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokeball-128.png'

}




