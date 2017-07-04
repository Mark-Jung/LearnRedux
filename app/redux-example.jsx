var redux = require('redux');

console.log('Starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

var unsubscribe = store.subscribe( () => {
  var state = store.getState();
// document.getElementById('app').innerHTML = state.name
  console.log('New state', state);

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '">View your location</a>'
  }
});

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Mark'));

store.dispatch(actions.addHobby('running'));
store.dispatch(actions.changeName('Emily'));

store.dispatch(actions.addMovie('Three Idiots', 'comedy'));

store.dispatch(actions.addMovie('Avengers', 'action'));
store.dispatch(actions.addHobby('ball'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.removeMovie(2));
