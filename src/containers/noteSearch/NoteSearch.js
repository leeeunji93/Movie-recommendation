import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../reducers/headerSearch';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import './NoteSearch.scss';
import { HeaderSearch } from '../../component';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const PAGE_SIZE = 100;
const NoteSearch = ({ history }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, [dispatch]);

  // const goBack = () => {
  //   history.push('/notesearch');
  //   setClickState(!clickState);
  //   setKeyword('');
  // };

  const handleChange = (e) => {
    console.log('searh중..', e.target.value);
    setKeyword(e.target.value);
    NetTool.request(APIs.filmDiarySearch)
      .appendFormData('keyword', keyword)
      .exec(true)
      .then((resultData) => {
        console.log('search결과', resultData);
        dispatch(
          actions.setHeaderSearch({
            key: 'searchArr',
            //이것만 배열로 보이게 나옴
            value: resultData,
          }),
        );
      });
  };

  const clickSearch = () => {
    NetTool.request(APIs.filmDiarySearch)
      .appendFormData('keyword', keyword)
      .exec(true)
      .then((resultData) => {
        console.log('search결과', resultData);
        dispatch(
          actions.setHeaderSearch({
            key: 'searchArr',
            //이것만 배열로 보이게 나옴
            value: resultData,
          }),
        );
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      clickSearch();
    }
  };
  return (
    <div className="note_wrapper">
      <form className="note_search">
        {/* {clickState ? (
          <button className="note_search_goBack" onClick={goBack}>
            <PlayCircleFilledIcon fontSize="large" />
          </button>
        ) : (
          <>
            <input
              name="keyword"
              placeholder="영화 제목을 검색하세요"
              onChange={handleChange}
              value={keyword}
              onKeyPress={handleKeyPress}
            />
            <div onClick={clickSearch} className="menu">
              검색
            </div>
          </>
        )} */}
        <input
          name="keyword"
          placeholder="영화 제목을 검색하세요"
          onChange={handleChange}
          value={keyword}
          onKeyPress={handleKeyPress}
        />
        <div onClick={clickSearch} className="menu">
          검색
        </div>
      </form>
      <div className="note_result">
        <h3 div className="note_result_keyword">
          {keyword.length > 0 ? `" ${keyword} " 결과입니다 ` : null}
        </h3>
        <HeaderSearch />
      </div>
    </div>
  );
};

export default NoteSearch;
