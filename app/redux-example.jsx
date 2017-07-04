var redux = require('redux');

console.log('Starting redux example');

var stateDefault ={
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;
var oldReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            name: action.movie.name,
            genre: action.movie.genre
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
      };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
      };
    default:
      return state;
  }

};

var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default:
      return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          name: action.movie.name,
          genre: action.movie.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe( () => {
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;
  console.log('New state', state.hobbies);
});

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Mark'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
});
store.dispatch({
  type: 'ADD_MOVIE',
  movie: {
    name: 'Three Idiots',
    genre: 'comedy'
  }
});
store.dispatch({
  type: 'ADD_MOVIE',
  movie: {
    name: 'Avengers',
    genre: 'action'
  }
});
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'ball'
});
store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});
store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});
