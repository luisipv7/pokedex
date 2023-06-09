const PokeAPI = {};

function convertPokeAPIDEtailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;

}

PokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((responsePokemons) => responsePokemons.json())
    .then(convertPokeAPIDEtailToPokemon);
};

PokeAPI.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(PokeAPI.getPokemonDetail))
    .then((detailsRequests) => Promise.all(detailsRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((err) => {
      console.error(err);
    });
};
