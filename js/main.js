// global variable selectors
// main divs
const $pokeSearch = document.querySelector('.poke-search');
const $pokeSearchDiv = document.querySelector('.poke-search-div');
const $searchBarRow = document.querySelector('.search-row');
const $pokeDeckDiv = document.querySelector('.poke-deck-div');

// info blocks
const $pokeDeck = document.querySelector('.poke-deck');
const $pokeInfo = document.querySelector('.poke-info');
const $pokeView = document.querySelector('.poke-view');

// search button
const $searchBar = document.querySelector('.search-bar');
const $searchBtn = document.querySelector('.search-btn');
const $form = document.querySelector('form');

// ui controls
const $deckBtn = document.querySelector('.deck-btn');
const $addBtn = document.querySelector('.add-btn');
const $viewBtn = document.querySelector('.view-btn');
const $deckViewCount = document.querySelector('.cards-in-deck-div');
const $deckViewCountText = document.querySelector('.cards-in-deck');
const $deckPriceBtn = document.querySelector('.deck-price-btn');
const $deckPrice = document.querySelector('.cards-total-div');
const $deckPriceText = document.querySelector('.cards-total');
const $rightArrow = document.querySelector('.fa-arrow-right');
const $leftArrow = document.querySelector('.fa-arrow-left');
const $questionMark = document.querySelector('.fa-magnifying-glass');
const $toggleOn = document.querySelector('.fa-toggle-on');
const $toggleOff = document.querySelector('.fa-toggle-off');
const $legalRow = document.querySelector('.legal-row');

// side bar declarations
const $ham = document.querySelector('.fa-bars');
const $hamMenu = document.querySelector('.ham-menu');
const $ul = document.querySelector('ul');
const $main = document.querySelectorAll('.main2');
const $li = document.querySelectorAll('li');

// loading display
const $loaderContainer = document.querySelector('.loading-container');
const $loader = document.querySelector('.loading');

// variable initial value declaration
let legality = false;
let pokeCount = 1;
let searchName = '';

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
    $deckPrice.classList.add('hidden');
    $deckViewCount.classList.add('hidden');
    $deckPriceBtn.classList.add('hidden');
    if (legality === true) {
      $toggleOn.classList.remove('hidden');
    } else {
      $toggleOff.classList.remove('hidden');
    }
    $legalRow.classList.remove('hidden');
  } else if (view === 'details') {
    $viewBtn.classList.add('hidden');
    $rightArrow.classList.add('hidden');
    $leftArrow.classList.add('hidden');
    $deckBtn.classList.remove('hidden');
    $searchBtn.classList.remove('hidden');
    $addBtn.classList.remove('hidden');
    $deckPrice.classList.add('hidden');
    $deckViewCount.classList.add('hidden');
    $deckPriceBtn.classList.add('hidden');
    $toggleOn.classList.add('hidden');
    $toggleOff.classList.add('hidden');
    $legalRow.classList.add('hidden');
  } else {
    $viewBtn.classList.remove('hidden');
    $searchBtn.classList.remove('hidden');
    $rightArrow.classList.add('hidden');
    $leftArrow.classList.add('hidden');
    $deckBtn.classList.add('hidden');
    $addBtn.classList.add('hidden');
    $deckPrice.classList.add('hidden');
    $deckViewCount.classList.remove('hidden');
    $deckPriceBtn.classList.remove('hidden');
    $toggleOn.classList.add('hidden');
    $toggleOff.classList.add('hidden');
    $legalRow.classList.add('hidden');
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

// load search images
function imageLoading(pokemon) {
  const image = renderPokeSearch(pokemon.images.large);
  image.setAttribute('data-cardId', pokemon.id);
  image.setAttribute('alt', `Pokemon Card: ${pokemon.name}`);
  image.classList.remove('set-search');
  $pokeSearch.appendChild(image);
  hideLoading();
}
// load search images if existing image is there
// cardData.length
function existing1ImageLoading(pokemon) {
  const $found = document.querySelectorAll('.found-poke');
  for (let i = 0; i < pokemon.length; i++) {
    $found[i].src = pokemon[i].images.large;
    $found[i].setAttribute('data-cardId', pokemon[i].id);
    $found[i].classList.remove('set-search');
    $found[i].setAttribute('alt', `Pokemon Card: ${pokemon[i].name}`);
  }
  hideLoading();
}

// load search images if existing image is there
// found length
function existing2ImageLoading(pokemon) {
  const $found = document.querySelectorAll('.found-poke');
  for (let i = 0; i < $found.length; i++) {
    $found[i].src = pokemon[i].images.large;
    $found[i].setAttribute('data-cardId', pokemon[i].id);
    $found[i].classList.remove('set-search');
    $found[i].setAttribute('alt', `Pokemon Card: ${pokemon[i].name}`);
  }
  hideLoading();
}

// make the http request after hitting enter on search bar
function searchPoke(name) {
  const xhr = new XMLHttpRequest();
  let targetUrl;
  if (legality === true) {
    targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=name:' + name + '*' + ' legalities.standard:legal&pageSize=8&page=' + pokeCount);
  } else {
    targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=name:' + name + '*' + '&pageSize=8&page=' + pokeCount);
  }
  displayLoading();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const $found = document.querySelectorAll('.found-poke');
    data.cardData = xhr.response;
    const cardData1 = data.cardData.data;
    searchName = name;
    if ($found.length === 0) {
      for (let i = 0; i < cardData1.length; i++) {
        imageLoading(cardData1[i]);
      }
    } else if (cardData1.length < 8) {
      existing1ImageLoading(cardData1);
      for (let i = cardData1.length; i < $found.length; i++) {
        $found[i].remove();
      }
      hideLoading();
    } else if ($found.length < cardData1.length) {
      existing2ImageLoading(cardData1);
      for (let i = $found.length; i < cardData1.length; i++) {
        imageLoading(cardData1[i]);
      }
      hideLoading();
    } else {
      existing2ImageLoading(cardData1);
    }
  });
  xhr.send();
}

// render list for appending
function renderSeriesList(series) {
  const $li1 = document.createElement('li');
  $li1.textContent = series.name;
  $li1.dataset.set = series.id;
  $li1.className = 'sets series';
  return $li1;
}

// search for series names
function searchPokeSeries(setName) {
  const xhr = new XMLHttpRequest();
  displayLoading();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/sets/?q=series:' + setName);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const series = xhr.response;
    for (let i = 0; i < series.data.length; i++) {
      const seriesName = renderSeriesList(series.data[i]);
      for (let j = 0; j < $li.length; j++) {
        if ($li[j].dataset.setId === series.data[i].series) {
          $li[j].appendChild(seriesName);
        }
      }
    }
    hideLoading();
  });
  xhr.send();
}

// search by set id
function searchPokeSet(setId) {
  const xhr = new XMLHttpRequest();
  displayLoading();
  let targetUrl;
  if (legality === true) {
    targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=set.id:' + setId + ' legalities.standard:legal&pageSize=8&page=' + pokeCount);
  } else {
    targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/?q=set.id:' + setId + '&pageSize=8&page=' + pokeCount);
  }
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.cardData = xhr.response;
    searchName = setId;
    const $found = document.querySelectorAll('.found-poke');
    const cardData1 = data.cardData.data;
    if ($found.length === 0) {
      for (let i = 0; i < cardData1.length; i++) {
        imageLoading(cardData1[i]);
      }
    } else if (cardData1.length < 8) {
      existing1ImageLoading(cardData1);
      for (let i = cardData1.length; i < $found.length; i++) {
        $found[i].remove();
      }
      hideLoading();
    } else if ($found.length < cardData1.length) {
      existing2ImageLoading(cardData1);
      for (let i = $found.length; i < cardData1.length; i++) {
        imageLoading(cardData1[i]);
      }
      hideLoading();
    } else {
      existing2ImageLoading(cardData1);
    }
    for (let i = 0; i < $found.length; i++) {
      $found[i].classList.add('set-search');
    }
  });
  xhr.send();
}

// hide menu after searching
function hideSideMenu() {
  const seriesSet = document.getElementsByClassName('series sets');
  $ul.classList.add('hidden');
  $hamMenu.classList.add('hidden');
  while (seriesSet[0]) {
    seriesSet[0].parentNode.removeChild(seriesSet[0]);
  }
}

// pokemon info rendering
function renderPokeInfo(pokemon) {
  const $infoColGone = document.getElementsByClassName('info-col');
  if ($infoColGone.length !== 0) {
    while ($infoColGone[0]) {
      $infoColGone[0].parentNode.removeChild($infoColGone[0]);
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

// show loading
function displayLoading() {
  $loaderContainer.classList.remove('hidden');
  $loader.classList.remove('hidden');
}

// hide loading
function hideLoading() {
  $loaderContainer.classList.add('hidden');
  $loader.classList.add('hidden');
}

// render searched pokemon for deck view
function renderPokeDeckCard(pokemon) {
  // create col
  const $col = document.createElement('div');
  $col.className = 'column-sixth';

  // create poke img
  const $image = renderPokeSearch(pokemon.data.images.large);
  $image.setAttribute('data-cardId', pokemon.data.id);
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
  $minus.dataset.cardid = pokemon.data.id;
  const $count = document.createElement('p');
  $count.id = pokemon.data.id;
  const $plus = document.createElement('i');
  $plus.className = 'fa-solid fa-plus';
  $plus.dataset.cardid = pokemon.data.id;
  $row2.appendChild($minus);
  $row2.appendChild($count);
  $row2.appendChild($plus);
  $col.appendChild($row2);

  return $col;
}

// search pokemon by id
function deckPoke(id) {
  const xhr = new XMLHttpRequest();
  displayLoading();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/' + id);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const pokemon = xhr.response;
    const $col = renderPokeDeckCard(pokemon);
    $pokeDeck.appendChild($col);
    const $deckCount = document.getElementById(id);
    $deckCount.textContent = data.deck[id];
    hideLoading();
  });
  xhr.send();
}

function deckToViewPoke(id) {
  const xhr = new XMLHttpRequest();
  displayLoading();
  const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/' + id);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const pokemon = xhr.response;
    const $viewPoke = document.querySelectorAll('.view-poke');
    if ($viewPoke.length === 0) {
      const image = renderPokeSearch(pokemon.data.images.large);
      image.setAttribute('data-cardId', pokemon.data.id);
      image.setAttribute('alt', `Pokemon Card: ${pokemon.data.name}`);
      image.className = 'column-100 view-poke';
      $pokeView.appendChild(image);
      viewSwap('poke-details');
      const pokeInfo = renderPokeInfo(pokemon.data);
      $pokeInfo.appendChild(pokeInfo);
    } else {
      $viewPoke[0].src = pokemon.data.images.large;
      $viewPoke[0].dataset.cardid = pokemon.data.id;
      $viewPoke[0].setAttribute('alt', `Pokemon Card: ${pokemon.data.name}`);

      viewSwap('poke-details');
      const pokeInfo = renderPokeInfo(pokemon.data);
      $pokeInfo.appendChild(pokeInfo);
    }
    hideLoading();
  });
  xhr.send();
}

// get deck count and update deck count function
function getCardsInDeck() {
  let deckCardCount = 0;
  for (const key in data.deck) {
    deckCardCount += Number(data.deck[key]);
  }
  $deckViewCountText.textContent = `Cards in Deck: ${deckCardCount}`;
}

// get deck price
function getDeckTotal() {
  const deckKeys = Object.keys(data.deck);
  let deckPrice = 0;
  for (let i = 0; i < deckKeys.length; i++) {
    const xhr = new XMLHttpRequest();
    displayLoading();
    const targetUrl = encodeURIComponent('https://api.pokemontcg.io/v2/cards/' + deckKeys[i]);
    xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
    xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      const pokemon = xhr.response;
      const key = deckKeys[i];
      const price = pokemon.data.cardmarket.prices.avg30 * data.deck[key];
      deckPrice = deckPrice + price;
      hideLoading();
      $deckPriceText.textContent = `Deck Total: $${Math.round(deckPrice)}`;
    });
    xhr.send();
  }
  $deckPrice.classList.remove('hidden');
}

// side menu event listener
$ul.addEventListener('click', function (e) {
  if (e.target.className === 'sets series') {
    const setID = e.target.dataset.set;
    searchPokeSet(setID);
    viewSwap('poke-search-div');
    uiControlSwap('search');
    hideSideMenu();
  }
});

// add button functionality
$addBtn.addEventListener('click', function (e) {
  const $viewPoke = document.querySelector('.view-poke');
  const $cardId = $viewPoke.dataset.cardid;
  const keys = Object.keys(data.deck);
  if (keys.includes($cardId) === false) {
    data.deck[$cardId] = 1;
    deckPoke($cardId);
    viewSwap('poke-deck-div');
    getCardsInDeck();
    getDeckTotal();
  } else {
    const $deckCount = document.getElementById($cardId);
    if (Number($deckCount.textContent) <= 3) {
      $deckCount.textContent = Number($deckCount.textContent) + 1;
      data.deck[$cardId] = $deckCount.textContent;
      viewSwap('poke-deck-div');
      getCardsInDeck();
      getDeckTotal();
    }
  }
  viewSwap('poke-deck-div');
});

$deckPriceBtn.addEventListener('click', function (e) {
  getDeckTotal();
});

// get info from form and populate page
$form.addEventListener('submit', function (e) {
  event.preventDefault();
  const $value = $form.elements[0].value;
  pokeCount = 1;
  searchName = '';
  searchPoke($value);
  viewSwap('poke-search-div');
  uiControlSwap('search');
  $searchBar.blur();
  $searchBar.value = '';
});

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

// toggle switch function
$legalRow.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-solid') === true) {
    const $found = document.querySelectorAll('.found-poke');
    const hasSetSearch = $found[0].classList.contains('set-search');
    if (legality === true) {
      $toggleOn.classList.add('hidden');
      $toggleOff.classList.remove('hidden');
      legality = false;
      if (hasSetSearch === true) {
        searchPokeSet(searchName);
      } else {
        searchPoke(searchName);
      }
    } else {
      $toggleOn.classList.remove('hidden');
      $toggleOff.classList.add('hidden');
      legality = true;
      if (hasSetSearch === true) {
        searchPokeSet(searchName);
      } else {
        searchPoke(searchName);
      }
    }
  }
});

// arrows can move forward or backwards for searched cards;
$rightArrow.addEventListener('click', function (e) {
  const $foundArrow = document.querySelectorAll('.found-poke');
  if ($foundArrow[0].classList.contains('set-search') === true) {
    pokeCount++;
    searchPokeSet(searchName);
  } else {
    pokeCount++;
    searchPoke(searchName);
  }
});

$leftArrow.addEventListener('click', function (e) {
  const $foundArrow = document.querySelectorAll('.found-poke');
  if (pokeCount > 1) {
    if ($foundArrow[0].classList.contains('set-search') === true) {
      pokeCount--;
      searchPokeSet(searchName);
    } else {
      pokeCount--;
      searchPoke(searchName);
    }
  }
});

// side bar menu functionality
$ham.addEventListener('click', function (e) {
  $hamMenu.classList.remove('hidden');
});

$hamMenu.addEventListener('click', function (e) {
  if (e.target.className === 'ham-series') {
    $ul.classList.remove('hidden');
  }
  if (e.target.className === 'series') {
    searchPokeSeries(e.target.dataset.setId);
  }
  if (e.target.className === 'ham-back') {
    hideSideMenu();
  }
});

// on load, brings back previously used info
window.addEventListener('load', function (e) {
  const keys = Object.keys(data.deck);
  if (keys.length > 0) {
    const keys = Object.keys(data.deck);
    for (let i = 0; i < keys.length; i++) {
      deckPoke(keys[i]);
    }
    getCardsInDeck();
    viewSwap('poke-deck-div');
  }
  if (data.cardData.length > 0 && keys.length === 0) {
    searchPoke(data.cardData.data);
    getCardsInDeck();
    viewSwap('poke-search-div');
  }
});

// minus and plus icon on deck view functionality
$pokeDeck.addEventListener('click', e => {
  const cardId = e.target.dataset.cardid;
  const targetClassList = e.target.classList;

  if (targetClassList.contains('fa-plus') === true) {
    const $deckCount = document.getElementById(e.target.dataset.cardid);
    if (Number($deckCount.textContent) <= 3) {
      $deckCount.textContent = Number($deckCount.textContent) + 1;
      data.deck[cardId] = $deckCount.textContent;
    } else {
      return;
    }
    getCardsInDeck();
  }

  if (targetClassList.contains('fa-minus') === true) {
    const $deckCount = document.getElementById(e.target.dataset.cardid);
    if (Number($deckCount.textContent) > 1) {
      $deckCount.textContent = Number($deckCount.textContent) - 1;
      data.deck[cardId] = $deckCount.textContent;
    } else {
      delete data.deck[cardId];
      const $col = $deckCount.closest('.column-sixth');
      $col.remove();
    }
    getCardsInDeck();
  }
});

// view card details
$pokeSearchDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('found-poke')) {
    const pokemon = data.cardData.data;
    for (let i = 0; i < data.cardData.data.length; i++) {
      if (e.target.dataset.cardid === pokemon[i].id) {
        const $viewPoke = document.querySelectorAll('.view-poke');
        if ($viewPoke.length === 0) {
          const image = renderPokeSearch(pokemon[i].images.large);
          image.setAttribute('data-cardId', pokemon[i].id);
          image.setAttribute('alt', `Pokemon Card: ${pokemon[i].name}`);
          image.className = 'column-100 view-poke';
          $pokeView.appendChild(image);
          viewSwap('poke-details');
          const pokeInfo = renderPokeInfo(data.cardData.data[i]);
          $pokeInfo.appendChild(pokeInfo);
        } else {
          $viewPoke[0].src = pokemon[i].images.large;
          $viewPoke[0].dataset.cardid = pokemon[i].id;
          viewSwap('poke-details');
          const pokeInfo = renderPokeInfo(data.cardData.data[i]);
          $pokeInfo.appendChild(pokeInfo);
        }
      }
    }
  }
});

$pokeDeckDiv.addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG') {
    const $cardId = e.target.dataset.cardid;
    deckToViewPoke($cardId);
  }
});
