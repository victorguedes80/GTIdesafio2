/*fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')*/
let pokeid = 1;
buildTeamSlots ();
buildPage ();

  function buildTeamSlots () {
    const slots = document.querySelector('#team-slots');
    for (let i = 0; i<6; ++i) {
      const li = document.createElement('li');
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
      
      const pokemonType1 = pokemon.types[0].type.name;
      const type1 = document.getElementById('type1');
      type1.innerText = pokemonType1;
      const type2 = document.getElementById('type2');

      if (pokemon.types.length > 1) {
        const pokemonType2 = pokemon.types[1].type.name;
        type2.innerText = pokemonType2;
      }
      else {
        type2.innerText = '';
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
  
