import React, { Component } from 'react';
import NeverSearch from '../../component/diarySearch/NeverSearch';
import SearchDiary from '../../component/diarySearch/SearchDiary';

class SearchMovieContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <NeverSearch />
        <SearchDiary match={match} />
      </div>
    );
  }
}

export default SearchMovieContainer;
