
let pokemonRepository= (function(){
    let pokemonList= [];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon){
    if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
      pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
}
function getAll(){
    return pokemonList;
}

function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', () => {
      showDetails(pokemon);
  });
}

function loadingMessage(){
  let pokemonList = document.querySelector(".pokemon-list");
  let showLoadingMessage= document.createElement('div');
  let h1 = document.createElement('h1');      
        showLoadingMessage.classList.add('.content-loading');
        h1.innerText= 'Loading Content';
        showLoadingMessage.appendChild(h1);
        console.log(h1.innerText);
}

function loadList(){
  // loading function called here.
  loadingMessage();
  return fetch(apiUrl).then(function(response){
    return response.json();
  }).then(function(json){
    return json.results.forEach(function(item){
      let pokemon={
        name: item.name,
        detailsUrl: item.url
      };
      add (pokemon);
      console.log(pokemon);
    });
  }).catch(function(e){
      console.error(e);
    })
}


function loadDetails(item){
  // loading function called here.
  loadingMessage();

  let url= item.detailsUrl;
  return fetch(url).then(function(response){
    return response.json();
  }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
  }).catch(function(e){
    console.error(e);
  });
}

(function showDetails(item){
  pokemonRepository.loadDetails(item).then(function(){
    console.log(item);


    //code for the modal starts here
      let modalContainer = document.querySelector('#modal-container');
      
      
      function showModal(item) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let nameElement = document.createElement(h1);
        nameElement.innerHTML= 'item.name';
        
        let heightElement = document.createElement(h2);
        heightElement.innerHTML= 'item.height';

        let imageElement = document.createElement('img');
        pokemonImg.src='item.imageUrl'; 
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
      }
      
      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }
      
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('item');
      });
      
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
      return{
        showDetails: showDetails,
        showModal: showModal
       } 

      
    })();
  


return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
  };    


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

