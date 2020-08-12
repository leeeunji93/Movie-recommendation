import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../reducers/headerSearch';
import { useSelector, useDispatch } from 'react-redux';
import { NetTool, APIs } from '../../tool/NetTool';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import './NoteSearch.scss';
import { HeaderSearch } from '../../component';

const NoteSearch = () => {
  const { headerSearch } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { searchArr } = headerSearch.search;
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    console.log('searh중..', e.target.value);
    setKeyword(e.target.value);
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
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      <form className="note_search">
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
        <HeaderSearch />
      </div>
    </div>
  );
};

export default NoteSearch;
