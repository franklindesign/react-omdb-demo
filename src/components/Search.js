import React, { useState } from "react";
import { TextInput, Button, Box } from "grommet";
import { FormSearch } from "grommet-icons";

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <Box direction="row">
      <Box
        margin="small"
        border={{ color: "brand", size: "small", side: "bottom" }}
      >
        <TextInput
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          placeholder="Find Movies & TV shows"
        />
      </Box>
      <Box margin="small">
        <Button
          onClick={callSearchFunction}
          primary
          type="submit"
          label="Find"
        />
      </Box>
    </Box>
  );
};

export default Search;
