const pokemonListOl = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal = document.getElementById("myModal");
const heartEL = document.getElementById("heart");
const limit = 15;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  PokeAPI.getPokemons(offset, limit).then((pokemonsList = []) => {
    const newHtml = pokemonsList
      .map(
        (pokemon) => `<li onclick=openModal(${JSON.stringify(
          pokemon
        )}); class="pokemon ${pokemon.type}" type="button">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail" id="updateDetails">
            <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
            </ol>
            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
        </li>`
      )
      .join("");

    pokemonListOl.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

function openModal(pokemon) {
  console.log(`pokemon: ${JSON.stringify(pokemon, null, 2)}`);
  // modal.style.display = "block";
  // modal.innerHTML = `<div class="modal-content">
  // <div class="contentHeader">
  //   <span class="back" onclick="closeModal();">&larr;</span>
  //   <span class="heart" id="heart" onclick="heart();">&hearts;</span>
  // </div>
  //       <h2>Modal Title ${pokemon.id}</h2>
  //       <p>Modal content goes here...</p>
  //     </div>`;
}
function closeModal() {
  modal.style.display = "none";
}
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

function heart() {
  heartEL.classList.toggle("filled");
}

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  let qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
