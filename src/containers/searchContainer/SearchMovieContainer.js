import React, { Component } from "react";
import SearchWrapper from "../../component/diarySearch/SearchWrapper";
import NeverSearch from "../../component/diarySearch/NeverSearch";
import SearchDiary from "../../component/diarySearch/SearchDiary";

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
