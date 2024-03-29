import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  GET_ALL_REPOS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case GET_ALL_REPOS:
      const allRepos = action.payload; //already an array
      var counts = {};
      //array of objects and we want to count the number of times each value occurs

      for (let i = 0; i < allRepos.length; i++) {
        let objectInsideArray = allRepos[i];
        let languageOfThisRepo = objectInsideArray.language;
        counts[languageOfThisRepo] = (counts[languageOfThisRepo] || 0) + 1;
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
