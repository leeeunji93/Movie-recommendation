import React, { useState } from "react";
import { APIs, NetTool } from "../../tool/NetTool";
import "../../App.scss";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../reducers/search";

const NeverSearch = () => {
  const { search } = useSelector((state) => state); //store연결
  const dispatch = useDispatch(); //액션 발생시키자
  const { never } = search;
  const { keyword, selectedMovie, searchResultArr } = never;

  const handleClickSearch = () => {
    /* const keyword = keyword.trim();*/
    console.log("change");
    const pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    if (keyword.match(pattern)) {
      alert("특수 문자가 포함 됐어요");
      return;
    }
    NetTool.request(APIs.filmSearch)
      .appendFormData("keyword", keyword)
      .exec(true)
      .then((resultData) => {
        console.log("영화 검색 결과", resultData);
        dispatch(
          actions.setNever({
            key: "searchResultArr",
            value: resultData,
          })
        );
        /* setSearchResultArr(resultData);*/
      })
      .catch((error) => {
        alert(error);
      });
  };

  const MovieItem = ({ searchResult }) => {
    let className = "MovieItem";
    if (selectedMovie === searchResult) {
      className += " selected";
    }
    const clickItem = () => {
      /*setKeyword("");
      setSelectedMovie(searchResult);
      setSearchResultArr([]);*/
      dispatch(
        actions.setNever({
          key: "searchResultArr",
          value: [],
        })
      );
      dispatch(
        actions.setNever({
          key: "selectedMovie",
          value: searchResult,
        })
      );

      console.log("선택영화", searchResult);
    };

    return (
      <div className={className} onClick={clickItem}>
        <div>
          <img src={searchResult.image} alt="" />
        </div>
        <span dangerouslySetInnerHTML={{ __html: searchResult.title }} />(
        {searchResult.pubDate})<div>{searchResult.director}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="movie_search">
        <input
          name="keyword"
          placeholder="작성하실 영화를 검색하세요"
          value={keyword}
          // onChange={handleChangeSearch}
          onChange={(e) => {
            console.log(e.target.value);
            console.log(e.target.name);
            dispatch(
              actions.setNever({
                key: e.target.name,
                value: e.target.value,
              })
            );
          }}
        />
        <button onClick={handleClickSearch}>찾기</button>
      </div>
      <div className="movie_search_result" style={{ width: "200px" }}>
        {searchResultArr.map((searchResult, index) => (
          <MovieItem searchResult={searchResult} key={index} />
        ))}
      </div>
      <div className="movie_selected">
        <h3>선택된 영화</h3>
        {!!selectedMovie && <MovieItem searchResult={selectedMovie} />}
      </div>
      <hr />
    </div>
  );
};

export default NeverSearch;
