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