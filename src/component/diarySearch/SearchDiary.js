import React, { useEffect, useState } from 'react';
import { APIs, NetTool } from '../../tool/NetTool';
import Grid from '@material-ui/core/Grid';
import './Search.scss';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/search';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, TextField } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarIcon from '@material-ui/icons/Star';

const SearchDiary = ({ match }) => {
  const { search } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { never } = search;
  const { tagsAll, selectedMovie } = never;

  const dId = match.params.dId;
  const isModify = dId > 0;
  const history = useHistory();

  const [input, setInput] = useState({
    title: '',
    cover: '',
    notes: '',
    watchDate: '',
    tags: [],
    rating: 0,
    createdAt: '0',
    modifiedAt: '0',
  });

  useEffect(() => {
    refreshTags();
    if (isModify) {
      console.log('@@dId', dId);
      refreshUpdateData(dId);
    } else {
      console.log('뻐킹');
    }
  }, []);

  const refreshUpdateData = (dId) => {
    const url = APIs.filmDiaryDetail(dId);
    NetTool.request(url)
      .exec(true)
      .then((resultData) => {
        console.log('수정데이터', resultData);
        dispatch(
          actions.setNever({
            key: 'selectedMovie',
            value: resultData.movie,
          }),
        );
        setInput(resultData.diary);
      })
      .catch((error) => alert(error));
  };

  //태그
  const refreshTags = () => {
    NetTool.request(APIs.filmTags)
      .exec()
      .then((resultData) => {
        console.log('가져온 태그들 데이터 ', resultData);
        dispatch(
          actions.setNever({
            key: 'tagsAll',
            value: resultData,
          }),
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleChangeDiaryData = (e) => {
    console.log('name', e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTags = (e) => {
    input.tags = input.tags.concat(e.target.value);
    console.log('  input.tags', input.tags);
  };

  const handleSave = () => {
    console.log(selectedMovie);

    if (!selectedMovie) {
      console.log(selectedMovie);
      alert('영화를 선택하세요');
      return;
    }

    input.tags = input.tags.join(',');
    console.log('@@tag', input.tags);

    //영화데이터와, 일기 데이터를 JSON 형식의 문자열로 변경한다.
    const movieJson = JSON.stringify(selectedMovie);
    const diaryJson = JSON.stringify(input);
    console.log('movieJson', movieJson);
    console.log('diaryJson', diaryJson);

    //저장한다.
    NetTool.request(APIs.filmDiarySave)
      .appendFormData('movieJson', movieJson) //필수 데이터
      .appendFormData('diaryJson', diaryJson) //필수 데이터
      .exec(true)
      .then((jsonData) => {
        console.log('diaryJson', diaryJson);
        alert('데이터 저장 성공');
        history.push('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <section className="write_full">
        {/* <h2>{isModify ? '일기수정' : 'Write'}</h2> */}

        <div className="search_grid">
          <div className="write_header">
            <input
              name="title"
              placeholder="제목을 입력하세요(10자 이내)"
              onChange={handleChangeDiaryData}
              value={input.title}
              maxlength="10"
            />
          </div>

          <div className="write_date">
            <input
              name="watchDate"
              value={input.watchDate}
              onChange={handleChangeDiaryData}
              type="date"
            />
          </div>
          <div className="write_tags">
            <div className="write_tags_when">
              <select name="tags" onChange={handleChangeTags}>
                {tagsAll[0] !== undefined
                  ? tagsAll[0].tags.map((tagTypeData) => {
                      return <option value={tagTypeData}>{tagTypeData}</option>;
                    })
                  : ''}
              </select>
            </div>
            <div className="write_tags_location">
              <select name="tags" onChange={handleChangeTags}>
                {tagsAll[1] !== undefined
                  ? tagsAll[1].tags.map((tagTypeData) => {
                      return <option value={tagTypeData}>{tagTypeData}</option>;
                    })
                  : ''}
              </select>
            </div>
          </div>

          <div className="write_content">
            <textarea
              type="text"
              name="notes"
              placeholder="내용"
              onChange={handleChangeDiaryData}
              value={input.notes}
            />
          </div>
          <div className="write_cover">
            <input
              name="cover"
              placeholder="https://"
              onChange={handleChangeDiaryData}
              value={input.cover}
            />
          </div>
        </div>
      </section>
      <div className="write_button">
        <button onClick={handleSave}>저장</button>
      </div>
    </>
  );
};

export default SearchDiary;

// <div className="write_rating">
// <span className="icon" onClick={handlePlusRating}>
//   <ThumbUpAltIcon />
// </span>
// <span className="icon" onClick={handleMinusRating}>
//   <ThumbDownIcon />
// </span>

// {[...Array(input.rating)].map((x, i) => (
//   <span classNamej="star" key={i}>
//     <StarIcon />️
//   </span>
// ))}
// </div>
