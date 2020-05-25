import React, { Component } from "react";
import SearchWrapper from "../../component/searchMovie/SearchWrapper";
import NeverSearch from "../../component/searchMovie/NeverSearch";
import SearchDiary from "../../component/searchMovie/SearchDiary";

class SearchMovieContainer extends Component {
  render() {
    return (
      <div>
        <SearchWrapper>
          <NeverSearch />
          <SearchDiary />
        </SearchWrapper>
      </div>
    );
  }
}

export default SearchMovieContainer;
