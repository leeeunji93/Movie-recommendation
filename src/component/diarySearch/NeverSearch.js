import React, { useState, useEffect } from 'react';
import { APIs, NetTool } from '../../tool/NetTool';
import './Search.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/search';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const NeverSearch = ({ match }) => {
  const { search } = useSelector((state) => state); //store연결
  const dispatch = useDispatch(); //액션 발생시키자
  const { never } = search;
  const { selectedMovie, searchResultArr } = never;
  const [clickState, setClickState] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, [dispatch]);

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
      <>
        <div className={className} onClick={clickItem}>
          <div className="Item">
            <img src={searchResult.image} alt="" />
          </div>
          <div>
            <b
              className="Item_info"
              dangerouslySetInnerHTML={{ __html: searchResult.title }}
            />
          </div>

          <span className="Item_director">{searchResult.director}</span>
          <span className="Item_date">{searchResult.pubDate}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="movie_search">
        {/* <h3>감상문 작성하기</h3> */}

        <div className="search_input">
          <input
            name="keyword"
            placeholder="작성하실 영화를 검색하세요  :)"
            value={keyword}
            // onChange={handleChangeSearch}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleClickSearch}>
            <SearchRoundedIcon color="action" style={{ fontSize: 20 }} />
          </button>
        </div>
      </section>

      <div className="movie_search_result">
        {searchResultArr.map((searchResult, index) => (
          <MovieItem searchResult={searchResult} key={index} />
        ))}
      </div>

      {/* <div className="movie_selected">
        {!!selectedMovie && <MovieItem searchResult={selectedMovie} />}
      </div> */}
    </>
  );
};

export default NeverSearch;
