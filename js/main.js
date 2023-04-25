// search bar focus in and out
const $questionMark = document.querySelector('.fa-magnifying-glass');
const $searchBar = document.querySelector('.search-bar');
const $searchBarRow = document.querySelector('.search-row');

$questionMark.addEventListener('click', function (e) {
  $searchBarRow.classList.remove('hidden');
  $searchBar.style.opacity = 1;
  $searchBar.focus();
});
$searchBar.addEventListener('focusout', function (e) {
  $searchBarRow.classList.add('hidden');
  $searchBar.style.opacity = 0;
});

// render pokemon onto screen

// make the http request
function searchPoke(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards/?q=name:' + name);
  xhr.setRequestHeader('X-Api-Key', 'f81270c6-9d17-41a7-90ff-04e77b2b4273');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
  });
  xhr.send();
}

// get info from form
const $form = document.querySelector('form');

$form.addEventListener('submit', function (e) {
  event.preventDefault();
  const $value = $form.elements[0].value;
  searchPoke($value);
});
