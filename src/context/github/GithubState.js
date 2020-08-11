import React, { useReducer } from "react";
import Axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  GET_ALL_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  //Benji: these are actually coming up as undefined for me but the app still works properly
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    allRepos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search Users
  const searchUsers = async (text) => {
    setLoading();
    console.log("githubClientId", githubClientId);
    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //get user
  const getUser = async (username) => {
    setLoading();

    const res = await Axios.get(
      `https://api.github.com/users/${username}?&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //get last 5 repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //get all user repos
  const getAllUserRepos = async (username) => {
    setLoading();
    const allRepos = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_ALL_REPOS,
      payload: allRepos.data, //this is already the array inside allRepos object
    });
    console.log("all repos", allRepos);
  };

  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        allRepos: state.allRepos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        getAllUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
