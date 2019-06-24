import React from "react";
import { Image, Box } from "grommet";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <Box margin="medium" background="dark-1" round="small">
      <Box height="medium" width="small">
        <Image
          fit="cover"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
        <Box margin="small">
          <h2>{movie.Title}</h2>
          {movie.Year}
        </Box>
      </Box>
    </Box>
  );
};

export default Movie;
