// global variable selectors
const $pokeSearch = document.querySelector('.poke-search');
const $pokeDeck = document.querySelector('.poke-deck');
const $pokeSearchDiv = document.querySelector('.poke-search-div');
const $pokeInfo = document.querySelector('.poke-info');
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
      if (view === 'poke-search-div') {
        uiControlSwap('search');
      } else if (view === 'poke-details') {
        uiControlSwap('details');
      } else {
        uiControlSwap();
      }
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
  viewSwap('poke-deck-div');
});

// arrows can move forward or backwards for searched cards;
$rightArrow.addEventListener('click', function (e) {
  if (data.cardData.length !== 0) {
    const foundPoke = document.querySelectorAll('.found-poke');
    let cardCount = 0;
    pokeCount += 8;
    for (pokeIndex; pokeIndex < pokeCount; pokeIndex++) {
      foundPoke[cardCount].src = data.cardData.data[pokeIndex].images.large;
      foundPoke[cardCount].dataset.cardid = data.cardData.data[pokeIndex].id;
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
      foundPoke[cardCount].src = data.cardData.data[pokeIndex].images.large;
      foundPoke[cardCount].dataset.cardid = data.cardData.data[pokeIndex].id;
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
  displayLoading();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=name:' + name + '*');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.cardData = xhr.response;
    const $found = document.querySelectorAll('.found-poke');
    if ($found.length === 0) {
      for (let i = 0; i < 8; i++) {
        const image = renderPokeSearch(data.cardData.data[i].images.large);
        image.setAttribute('data-cardId', data.cardData.data[i].id);
        $pokeSearch.appendChild(image);
        hideLoading();
      }
    } else {
      for (let i = 0; i < 8; i++) {
        $found[i].src = data.cardData.data[i].images.large;
        $found[i].setAttribute('data-cardId', data.cardData.data[i].id);
        hideLoading();
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
  $searchBar.value = '';
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
  displayLoading();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=set.id:' + setId);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.cardData = xhr.response;
    const $found = document.querySelectorAll('.found-poke');
    if ($found.length === 0) {
      for (let i = 0; i < 8; i++) {
        const image = renderPokeSearch(data.cardData.data[i].images.large);
        image.setAttribute('data-cardId', data.cardData.data[i].id);
        $pokeSearch.appendChild(image);
        hideLoading();
      }
    } else {
      for (let i = 0; i < 8; i++) {
        $found[i].src = data.cardData.data[i].images.large;
        $found[i].setAttribute('data-cardId', data.cardData.data[i].id);
        hideLoading();
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
    for (let i = 0; i < data.cardData.data.length; i++) {
      if (e.target.dataset.cardid === data.cardData.data[i].id) {
        const $viewPoke = document.querySelectorAll('.view-poke');
        if ($viewPoke.length === 0) {
          const image = renderPokeSearch(data.cardData.data[i].images.large);
          image.setAttribute('data-cardId', data.cardData.data[i].id);
          image.className = 'column-100 view-poke';
          $pokeView.appendChild(image);
          viewSwap('poke-details');
          const pokeInfo = renderPokeInfo(data.cardData.data[i]);
          $pokeInfo.appendChild(pokeInfo);
        } else {
          $viewPoke[0].src = data.cardData.data[i].images.large;
          $viewPoke[0].dataset.cardid = data.cardData.data[i].id;
          viewSwap('poke-details');
          const pokeInfo = renderPokeInfo(data.cardData.data[i]);
          $pokeInfo.appendChild(pokeInfo);
        }
      }
    }
  }
});

// pokemon info rendering
function renderPokeInfo(pokemon) {
  const $infoRow = document.getElementsByClassName('info-row');
  if ($infoRow.length !== 0) {
    while ($infoRow[0]) {
      $infoRow[0].parentNode.removeChild($infoRow[0]);
    }
  }

  const $infoCol = document.createElement('div');
  $infoCol.className = 'column-100 info-col';

  // name
  const $row1 = document.createElement('div');
  $row1.className = 'row info-row';
  const $column1 = document.createElement('div');
  $column1.className = 'column-100 poke-info-sheet';
  const $name = document.createElement('p');
  $name.textContent = pokemon.name;
  $name.className = 'info-header';
  $row1.appendChild($column1);
  $column1.append($name);
  $infoCol.appendChild($row1);

  // card id/ set id
  const $row2 = document.createElement('div');
  $row2.className = ('row info-row');
  const $row3 = document.createElement('div');
  $row3.className = ('row info-row');
  const $column2 = document.createElement('div');
  $column2.className = ('column-100 poke-info-sheet');
  const $column3 = document.createElement('div');
  $column3.className = ('column-100 poke-info-sheet');
  const $set = document.createElement('p');
  $set.className = 'info-text';
  $set.textContent = `Set / Set ID: ${pokemon.set.name} / ${pokemon.set.id}`;
  const $idRelease = document.createElement('p');
  $idRelease.textContent = `Card ID / Release: ${pokemon.id} / ${pokemon.set.releaseDate}`;
  $idRelease.className = 'info-text';
  $row2.appendChild($column2);
  $row3.appendChild($column3);
  $column2.appendChild($idRelease);
  $column3.appendChild($set);
  $infoCol.appendChild($row2);
  $infoCol.appendChild($row3);

  // legality
  const $row4 = document.createElement('div');
  $row4.className = ('row info-row');
  const $column4 = document.createElement('div');
  $column4.className = 'column-100 poke-info-sheet';
  const $legality = document.createElement('p');
  $legality.textContent = 'Legality';
  $legality.className = 'info-header';
  $row4.appendChild($column4);
  $column4.appendChild($legality);
  $infoCol.appendChild($row4);

  const objLength = Object.keys(pokemon.legalities).length;
  const objKeys = Object.keys(pokemon.legalities);
  for (let i = 0; i < objLength; i++) {
    const $row = document.createElement('div');
    $row.className = ('row info-row');
    const $column = document.createElement('div');
    $column.className = 'column-100 poke-info-sheet';
    const $legality = document.createElement('p');
    $legality.textContent = `${objKeys[i]}: ${pokemon.legalities[objKeys[i]]}`;
    $row.appendChild($column);
    $column.appendChild($legality);
    $infoCol.appendChild($row);
  }

  // price
  const $row5 = document.createElement('div');
  $row5.className = ('row info-row');
  const $column5 = document.createElement('div');
  $column5.className = 'column-100 poke-info-sheet';
  const $price = document.createElement('p');
  $price.textContent = `Average Price: $${pokemon.cardmarket.prices.averageSellPrice}`;
  $price.className = 'info-text';
  $row5.appendChild($column5);
  $column5.appendChild($price);
  $infoCol.appendChild($row5);

  // return
  return $infoCol;
}

// loading display
const $loaderContainer = document.querySelector('.loading-container');
const $loader = document.querySelector('.loading');
// show loading
function displayLoading() {
  $loaderContainer.classList.remove('hidden');
  $loader.classList.remove('hidden');
  setTimeout(() => {
    $loader.classList.add('hidden');
    $loaderContainer.classList.add('hidden');
  }, 10000);
}
// hide loading
function hideLoading() {
  $loaderContainer.classList.add('hidden');
  $loader.classList.add('hidden');
}

// render pokemon by ID
function deckPoke(id) {
  const xhr = new XMLHttpRequest();
  displayLoading();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/' + id);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // create col
    const $col = document.createElement('div');
    $col.className = 'column-sixth';

    // create poke img
    const pokeData = xhr.response;
    const $image = renderPokeSearch(pokeData.data.images.large);
    $image.setAttribute('data-cardId', pokeData.data.id);
    $image.className = 'column-100 deck-poke-img';
    const $row = document.createElement('div');
    $row.className = 'row poke-deck-row';
    $row.appendChild($image);
    $col.appendChild($row);

    // create ui
    const $row2 = document.createElement('div');
    $row2.className = 'row poke-deck-row';
    const $minus = document.createElement('i');
    $minus.className = 'fa-solid fa-minus';
    const $count = document.createElement('p');
    $count.className = 'deck-count';
    $count.textContent = data.deck[id];
    const $plus = document.createElement('i');
    $plus.className = 'fa-solid fa-plus';
    $row2.appendChild($minus);
    $row2.appendChild($count);
    $row2.appendChild($plus);
    $col.appendChild($row2);

    $pokeDeck.appendChild($col);
    hideLoading();
  });
  xhr.send();
}

// add button functionality
$addBtn.addEventListener('click', function (e) {
  const $viewPoke = document.querySelector('.view-poke');
  const $cardId = $viewPoke.dataset.cardid;
  data.deck[$cardId] = 1;
  deckPoke($cardId);
  viewSwap('poke-deck-div');
});
