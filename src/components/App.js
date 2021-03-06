import React, { useReducer, useEffect } from "react";
// import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import spinner from "../ajax-loader.gif";
import Search from "./Search";
import { Box } from "grommet";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=game&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b
      }`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <Box margin="medium">
      <Box direction="row">
        <Box>
          <Header text="OMDB" />
        </Box>
        <Box>
          <Search search={search} />
        </Box>
      </Box>
      <Box
        direction="row"
        pad="medium"
        width="xxxlarge"
        wrap="true"
        responsive="true"
      >
        {loading && !errorMessage ? (
          <Box>
            <img className="spinner" src={spinner} alt="Loading spinner" />
          </Box>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Box>
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default App;
