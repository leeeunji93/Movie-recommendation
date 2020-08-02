import React, { useState } from 'react';
import { APIs, NetTool } from '../../tool/NetTool';
import './Search.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/search';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

const NeverSearch = ({ match }) => {
  const { search } = useSelector((state) => state); //store연결
  const dispatch = useDispatch(); //액션 발생시키자
  const { never } = search;
  const { selectedMovie, searchResultArr } = never;
  const [clickState, setClickState] = useState(false);

  const [keyword, setKeyword] = useState('');

  const handleClickSearch = () => {
    /* const keyword = keyword.trim();*/
    console.log('change');
    const pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    if (keyword.match(pattern)) {
      alert('특수 문자가 포함 됐습니다');
      return;
    }

    NetTool.request(APIs.filmSearch)
      .appendFormData('keyword', keyword)
      .exec(true)
      .then((resultData) => {
        console.log('영화 검색 결과', resultData);
        dispatch(
          actions.setNever({
            key: 'searchResultArr',
            value: resultData,
          }),
        );
        /* setSearchResultArr(resultData);*/
      })
      .catch((error) => {
        alert(error);
      });
  };

  const MovieItem = ({ searchResult }) => {
    let className = 'MovieItem';
    if (selectedMovie === searchResult) {
      className += ' selected';
    }
    const clickItem = () => {
      /*setKeyword("");
      setSelectedMovie(searchResult);
      setSearchResultArr([]);*/
      dispatch(
        actions.setNever({
          key: 'searchResultArr',
          value: [],
        }),
      );
      dispatch(
        actions.setNever({
          key: 'selectedMovie',
          value: searchResult,
        }),
      );
      setClickState(!clickState);
      console.log('선택영화', searchResult);
    };

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          <div className={className} onClick={clickItem}>
            <di className="Item">
              <img src={searchResult.image} alt="" />
            </di>
            <div>
              <b
                className="Item_info"
                dangerouslySetInnerHTML={{ __html: searchResult.title }}
              />
            </div>

            <span className="Item_director">{searchResult.director}</span>
            <span className="Item_date">{searchResult.pubDate}</span>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <section className="movie_search">
        {clickState ? (
          ''
        ) : (
          <div className="search">
            <input
              name="keyword"
              placeholder="작성하실 영화를 검색하세요"
              value={keyword}
              // onChange={handleChangeSearch}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button onClick={handleClickSearch}>
              <SearchIcon style={{ fontSize: 30 }} />
            </button>
          </div>
        )}
      </section>

      <div className="movie_search_result">
        {searchResultArr.map((searchResult, index) => (
          <MovieItem searchResult={searchResult} key={index} />
        ))}
      </div>

      <d className="movie_selected">
        {!!selectedMovie && <MovieItem searchResult={selectedMovie} />}
      </d>
    </div>
  );
};

export default NeverSearch;
