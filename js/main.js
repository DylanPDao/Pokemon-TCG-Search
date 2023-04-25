// global variable selectors
const $pokeSearch = document.querySelector('.poke-search');
const $pokeSearchDiv = document.querySelector('.poke-search-div');
const $rightArrow = document.querySelector('.fa-arrow-right');
const $leftArrow = document.querySelector('.fa-arrow-left');
const $form = document.querySelector('form');
const $questionMark = document.querySelector('.fa-magnifying-glass');
const $searchBar = document.querySelector('.search-bar');
const $searchBarRow = document.querySelector('.search-row');
const $pokeView = document.querySelector('.poke-view');
// const $pokeInfo = document.querySelector('.poke-info');
const $main = document.querySelectorAll('.main2');
let cardData;
let pokeCount = 8;
let pokeIndex = 8;

// const $pokeDeck = document.querySelector('.poke-deck');

// search bar focus in and out
$questionMark.addEventListener('click', function (e) {
  $searchBarRow.classList.remove('hidden');
  $searchBar.style.opacity = 1;
  $searchBar.focus();
});
$searchBar.addEventListener('focusout', function (e) {
  $searchBarRow.classList.add('hidden');
  $searchBar.style.opacity = 0;
});

// view swap
function viewSwap(view) {
  for (let i = 0; i < $main.length; i++) {
    if ($main[i].classList.contains(view) !== true) {
      $main[i].classList.add('hidden');
    } else {
      $main[i].classList.remove('hidden');
    }
  }
}

// render pokemon onto search screen
function renderPokeSearch(pokemon) {
  // create content and give them names
  const $img = document.createElement('img');
  $img.setAttribute('src', pokemon);
  $img.className = 'column-25 found-poke';

  // appending
  return $img;
}

// render pokemon info onto screen
// function renderPokeInfo(pokemon) {

// }

// make the http request
function searchPoke(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards/?q=name:' + name + '*');
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardData = xhr.response;
    for (let i = 0; i < 8; i++) {
      const image = renderPokeSearch(cardData.data[i].images.large);
      image.setAttribute('data-cardId', cardData.data[i].id);
      $pokeSearch.appendChild(image);
    }
  });
  xhr.send();
}

// get info from form and populate page
$form.addEventListener('submit', function (e) {
  event.preventDefault();
  $searchBar.focus();
  const $value = $form.elements[0].value;
  searchPoke($value);
  viewSwap('poke-search-div');
});

// arrows can move forward or backwards for searched cards;
$rightArrow.addEventListener('click', function (e) {
  if (cardData.length !== 0) {
    const foundPoke = document.querySelectorAll('.found-poke');
    let j = 0;
    pokeCount += 8;
    for (pokeIndex; pokeIndex < pokeCount; pokeIndex++) {
      foundPoke[j].src = cardData.data[pokeIndex].images.large;
      foundPoke[j].dataset.cardid = cardData.data[pokeIndex].id;
      if (j < 7) {
        j++;
      }
    }
  }
});

$leftArrow.addEventListener('click', function (e) {
  if (pokeIndex >= 16) {
    const foundPoke = document.querySelectorAll('.found-poke');
    let j = 0;
    pokeIndex -= 16;
    pokeCount -= 8;
    for (pokeIndex; pokeIndex < pokeCount; pokeIndex++) {
      foundPoke[j].src = cardData.data[pokeIndex].images.large;
      foundPoke[j].dataset.cardid = cardData.data[pokeIndex].id;
      if (j < 7) {
        j++;
      }
    }
  }
});

// view card details
$pokeSearchDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('found-poke')) {
    for (let i = 0; i < cardData.data.length; i++) {
      if (e.target.dataset.cardid === cardData.data[i].id) {
        const image = renderPokeSearch(cardData.data[i].images.large);
        image.setAttribute('data-cardId', cardData.data[i].id);
        image.className = 'column-100 view-poke';
        $pokeView.appendChild(image);
        viewSwap('poke-details');
      }
    }
  }
});
