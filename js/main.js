// global variable selectors
const $pokeSearch = document.querySelector('.poke-search');
const $pokeSearchDiv = document.querySelector('.poke-search-div');
const $rightArrow = document.querySelector('.fa-arrow-right');
const $searchBtn = document.querySelector('.search-btn');
const $deckBtn = document.querySelector('.deck-btn');
const $viewBtn = document.querySelector('.view-btn');
const $addBtn = document.querySelector('.add-btn');
const $leftArrow = document.querySelector('.fa-arrow-left');
const $form = document.querySelector('form');
const $questionMark = document.querySelector('.fa-magnifying-glass');
const $searchBar = document.querySelector('.search-bar');
const $searchBarRow = document.querySelector('.search-row');
const $pokeView = document.querySelector('.poke-view');
const $ham = document.querySelector('.fa-bars');
const $hamMenu = document.querySelector('.ham-menu');
const $hamSet = document.querySelector('.ham-set');
const $setList = document.querySelector('.set-list');
const $back = document.querySelector('.ham-back');
const $ul = document.querySelector('ul');
const $main = document.querySelectorAll('.main2');
const $setImg = document.querySelectorAll('.set-img');
let cardData;
let pokeCount = 8;
let pokeIndex = 8;

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
// ui swapping
function uiControlSwap(view) {
  if (view === 'search') {
    $rightArrow.classList.remove('hidden');
    $leftArrow.classList.remove('hidden');
    $viewBtn.classList.remove('hidden');
    $deckBtn.classList.remove('hidden');
    $searchBtn.classList.add('hidden');
    $addBtn.classList.add('hidden');
  } else if (view === 'details') {
    $viewBtn.classList.add('hidden');
    $rightArrow.classList.add('hidden');
    $leftArrow.classList.add('hidden');
    $deckBtn.classList.remove('hidden');
    $searchBtn.classList.remove('hidden');
    $addBtn.classList.remove('hidden');
  } else {
    $viewBtn.classList.remove('hidden');
    $searchBtn.classList.remove('hidden');
    $rightArrow.classList.add('hidden');
    $leftArrow.classList.add('hidden');
    $deckBtn.classList.add('hidden');
    $addBtn.classList.add('hidden');
  }
}
// ui functionality
$viewBtn.addEventListener('click', function (e) {
  viewSwap('poke-details');
});
$searchBtn.addEventListener('click', function (e) {
  viewSwap('poke-search-div');
});
$deckBtn.addEventListener('click', function (e) {
  viewSwap('poke-deck');
});

// arrows can move forward or backwards for searched cards;
$rightArrow.addEventListener('click', function (e) {
  if (cardData.length !== 0) {
    const foundPoke = document.querySelectorAll('.found-poke');
    let cardCount = 0;
    pokeCount += 8;
    for (pokeIndex; pokeIndex < pokeCount; pokeIndex++) {
      foundPoke[cardCount].src = cardData.data[pokeIndex].images.large;
      foundPoke[cardCount].dataset.cardid = cardData.data[pokeIndex].id;
      if (cardCount < 7) {
        cardCount++;
      }
    }
  }
});
$leftArrow.addEventListener('click', function (e) {
  if (pokeIndex >= 16) {
    const foundPoke = document.querySelectorAll('.found-poke');
    let cardCount = 0;
    pokeIndex -= 16;
    pokeCount -= 8;
    for (pokeIndex; pokeIndex < pokeCount; pokeIndex++) {
      foundPoke[cardCount].src = cardData.data[pokeIndex].images.large;
      foundPoke[cardCount].dataset.cardid = cardData.data[pokeIndex].id;
      if (cardCount < 7) {
        cardCount++;
      }
    }
  }
});

// render pokemon onto search screen
function renderPokeSearch(pokemon) {
  // create content and give them names
  const $img = document.createElement('img');
  $img.setAttribute('src', pokemon);
  $img.setAttribute('alt', 'image of pokemon card');
  $img.className = 'column-25 found-poke';

  // appending
  return $img;
}

// make the http request
function searchPoke(name) {
  const xhr = new XMLHttpRequest();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=name:' + name + '*&pageSize=32');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardData = xhr.response;
    const $found = document.querySelectorAll('.found-poke');
    if ($found.length === 0) {
      for (let i = 0; i < 8; i++) {
        const image = renderPokeSearch(cardData.data[i].images.large);
        image.setAttribute('data-cardId', cardData.data[i].id);
        $pokeSearch.appendChild(image);
      }
    } else {
      for (let i = 0; i < 8; i++) {
        $found[i].src = cardData.data[i].images.large;
        $found[i].setAttribute('data-cardId', cardData.data[i].id);
      }
    }
  });
  xhr.send();
}

// get info from form and populate page
$form.addEventListener('submit', function (e) {
  event.preventDefault();
  const $value = $form.elements[0].value;
  searchPoke($value);
  viewSwap('poke-search-div');
  uiControlSwap('search');
  $searchBar.blur();
});

// side bar menu functionality
$ham.addEventListener('click', function (e) {
  $hamMenu.classList.remove('hidden');
});
$hamSet.addEventListener('click', function (e) {
  $setList.classList.remove('hidden');
  for (let i = 0; i < $setImg.length; i++) {
    $setImg[i].classList.remove('hidden');
  }
});
$back.addEventListener('click', function (e) {
  $hamMenu.classList.add('hidden');
  for (let i = 0; i < $setImg.length; i++) {
    $setImg[i].classList.add('hidden');
  }
});

// hide side menu
function hideSideMenu() {
  $hamMenu.classList.add('hidden');
}

// search by set id
function searchPokeSet(setId) {
  const xhr = new XMLHttpRequest();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=set.id:' + setId + '&pageSize=32');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardData = xhr.response;
    const $found = document.querySelectorAll('.found-poke');
    if ($found.length === 0) {
      for (let i = 0; i < 8; i++) {
        const image = renderPokeSearch(cardData.data[i].images.large);
        image.setAttribute('data-cardId', cardData.data[i].id);
        $pokeSearch.appendChild(image);
      }
    } else {
      for (let i = 0; i < 8; i++) {
        $found[i].src = cardData.data[i].images.large;
        $found[i].setAttribute('data-cardId', cardData.data[i].id);
      }
    }
  });
  xhr.send();
}
$ul.addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG') {
    const setID = e.target.dataset.set;
    searchPokeSet(setID);
    viewSwap('poke-search-div');
    uiControlSwap('search');
    hideSideMenu();
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
