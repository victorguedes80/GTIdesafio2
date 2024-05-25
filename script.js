/*fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')*/
 
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
    fetch ('https://pokeapi.co/api/v2/pokemon/1/')
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
    })
    .catch (error => console.error(error))
  }


  
