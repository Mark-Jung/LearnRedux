var axios = require('axios');

// Name reducer and action generators
// -----------------------------------------

export var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
};

// Hobbies reducer and action generators
// -----------------------------------------

export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

// Movies reducer and action generators
// -----------------------------------------

export var addMovie = (name, genre) => {
  return {
    type: 'ADD_MOVIE',
    name,
    genre
  }
};

export var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
};


// Map reducer and action generators
// -----------------------------------------

export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
};

export var fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function (res) {
      var loc = res.data.loc;
      var baseUrl = 'http://maps.google.com?q='

      dispatch(completeLocationFetch(baseUrl + loc));
    });
  }
};
