/* exported data */
let data = {
  deck: {},
  cardData: []
};

// turn entries into JSON data
window.addEventListener('beforeunload', function (e) {
  const jsonString = JSON.stringify(data);
  this.localStorage.setItem('user-data', jsonString);
});

// parse data back in
const previousJson = localStorage.getItem('user-data');
if (previousJson !== null) {
  data = JSON.parse(previousJson);
}
