import React from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/headerSearch';
import { useEffect } from 'react';

const HeaderSearch = () => {
  const { headerSearch } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { keyword, searchArr } = headerSearch.search;
  const history = useHistory();

  const DiaryItem = (data) => {
    const clickItem = () => {
      if (!!history) {
        history.push('/diaryDetail/' + data.dId);
      }
    };

    if (!searchArr) {
      return null;
    }

    return (
      <div className="DiaryItem" onClick={clickItem}>
        <img src={data.data.cover} alt="" />
        <div>
          <div>일기 제목 : {data.data.title}</div>
          <div>쓴사람 닉네임 : {data.data.nickname}</div>
          <div>태그들 : {data.data.tags}</div>
          <div>레이팅 : {data.data.rating}</div>
          <div>본 날짜 : {data.data.watchDate}</div>
          <div>영화 제목 : {data.data.movieTitle}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {searchArr.map((data, index) => (
        <DiaryItem data={data} key={index} />
      ))}
    </div>
  );
};

export default HeaderSearch;
