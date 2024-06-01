const url = window.location.href;
const urlObj = new URL(url);
const params = urlObj.searchParams;


let pokemons = [];
for (let i = 0; i < 6; ++i) {
    pokemons[i] = params.get(`pokemon${i+1}`);
}

const teamName = params.get('teamName');
const title = document.getElementById('titleTeam');
title.innerText = "Time "+teamName;


pokemons.forEach(pokemon => {
    if (pokemon != '') {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then(response => response.json())
        .then (data => {
            const container = document.createElement('container');
            container.className = 'pokemon-card';
            const pokemonSprite = document.createElement('img');
            pokemonSprite.src = data.sprites.front_default;
            pokemonSprite.id = 'pokemonSprite';
            

            const id = document.createElement('p');
            id.innerText = '#' + data.id;

            const pokemonName = document.createElement('h2');
            pokemonName.innerText = data.forms[0].name;

            const pokemonType1 = data.types[0].type.name.toUpperCase();
            const type1 = document.createElement('p');
            type1.className = 'type1';
            type1.innerText = pokemonType1;
            type1.style.backgroundColor = colorType (pokemonType1);
            const type2 = document.createElement('p');
            type2.className = 'type2';

            if (data.types.length > 1) {
            const pokemonType2 = data.types[1].type.name.toUpperCase();
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
            div.className = 'types';
            div.appendChild(type1);
            div.appendChild(type2);

            container.appendChild(pokemonSprite);
            container.appendChild(id);
            container.appendChild(pokemonName);
            container.appendChild(div);
            document.getElementById('team').appendChild(container);
        
        })
        .catch (error => console.error(error))
    }
});


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