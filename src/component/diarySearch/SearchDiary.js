import React, { useEffect, useState } from 'react';
import { APIs, NetTool } from '../../tool/NetTool';
import { MdDateRange } from 'react-icons/md';
import { FaStar, FaBlackTie } from 'react-icons/fa';
import './Search.scss';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/search';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardActions, TextField } from '@material-ui/core';

const SearchDiary = () => {
  const { search } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { form, never, dId, isModify } = search;
  const {
    tagsAll,
    title,
    cover,
    notes,
    rating,
    tags,
    watchDate,
    createdAt,
    modifiedAt,
  } = form;
  const { selectedMovie } = never;
  const history = useHistory();

  useEffect(() => {
    refreshTags();
    if (isModify) {
      console.log('dId', dId);
      refreshUpdateData(dId);
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, []);

  const refreshUpdateData = (dId) => {
    const url = APIs.filmDiaryDetail(dId);
    NetTool.request(url)
      .exec(true)
      .then((resultData) => {
        console.log('수정할 데이터 가져오기 완료', resultData);
        console.log('resultData.diary', resultData.diary);
        dispatch(
          actions.setForm({
            key: 'form',
            value: resultData.diary,
          }),
          actions.setNever({
            key: 'selectedMovie',
            value: resultData.movie,
          }),
        );
      })
      .catch((error) => alert(error));
  };

  //모든 태그들 가져온다.
  const refreshTags = () => {
    NetTool.request(APIs.filmTags)
      .exec()
      .then((resultData) => {
        console.log('가져온 태그들 데이터 ', resultData);
        dispatch(
          actions.setForm({
            key: 'tagsAll',
            value: resultData,
          }),
        );
        /*this.setState({ tagsAll: resultData });*/
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleChangeDiaryData = (e) => {
    // setKeyword(e.target.value);
    console.log('@@제목', e.target.name);
    console.log(e.target.value);
    dispatch(
      actions.setForm({
        key: e.target.name,
        value: e.target.value,
      }),
    );
  };

  const handlePlusRating = () => {
    const maxCore = 4;
    if (form.rating > maxCore) {
      return;
    }
    dispatch(
      actions.setForm({
        key: 'rating',
        value: ++form.rating,
      }),
    );
  };

  const handleMinusRating = () => {
    console.log('별점 마이너스', rating);
    dispatch(
      actions.setForm({
        key: 'rating',
        value: rating - 1,
      }),
    );
  };

  const handleSave = () => {
    console.log(selectedMovie);

    if (!selectedMovie) {
      console.log(selectedMovie);
      alert('영화를 선택하세요');
      return;
    }

    if (title.trim().length === 0) {
      alert('일기 제목을 쓰세요');
      return;
    }

    //TODO: 기타 등등, Validation 유효성 검사 할것.

    //영화데이터와, 일기 데이터를 JSON 형식의 문자열로 변경한다.
    const movieJson = JSON.stringify(selectedMovie);
    const diaryJson = JSON.stringify(form);

    //저장한다.
    NetTool.request(APIs.filmDiarySave)
      .appendFormData('movieJson', movieJson) //필수 데이터
      .appendFormData('diaryJson', diaryJson) //필수 데이터
      .exec(true)
      .then((jsonData) => {
        alert('데이터 저장 성공');
        history.push('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const TagTypeItem = ({ tagTypeData }) => {
    const TagItem = ({ tag }) => {
      return <div className="TagItem">{tag}</div>;
    };

    return (
      <div>
        <h3>
          태그타입: {tagTypeData.tagType} - 태그 설명:
          {tagTypeData.tagTypeDesc}
        </h3>

        <div className="tags">
          {tagTypeData.tags.map((tag, index) => (
            <TagItem tag={tag} key={index} />
          ))}
        </div>
      </div>
    );
  };

  //mui
  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#2c3e50',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#16a085',
      },
    },
  })(TextField);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <div className="write_full">
        <Card className={classes.root} elevation={5}>
          <CardContent>
            <Typography className={classes.title}>
              <h2>{isModify ? '일기수정' : '일기쓰기'}</h2>
            </Typography>
            <CssTextField
              className={classes.inputTitle}
              name="title"
              label="제목"
              onChange={handleChangeDiaryData}
              value={title}
              InputProps={{
                className: classes.input,
              }}
            />

            <span className="write_date">
              <MdDateRange />
              <input
                type="date"
                name="watchDate"
                placeholder="날짜"
                onChange={handleChangeDiaryData}
                value={watchDate}
              />
            </span>
            <span className="write_rating">
              <span onClick={handlePlusRating}>[+]</span>
              <span onClick={handleMinusRating}>[-]</span>
              {[...Array(rating)].map((x, i) => (
                <span key={i}>
                  <FaStar />️
                </span>
              ))}
            </span>
            <div className="write_tags">
              <h2>전체 태그 목록</h2>
              <input
                name="tags"
                value={tags}
                onChange={handleChangeDiaryData}
              />
              {tagsAll.map((tagTypeData, index) => (
                <TagTypeItem tagTypeData={tagTypeData} key={index} />
              ))}
            </div>
            <div className="write_content">
              <input
                name="notes"
                placeholder="일기 내용"
                onChange={handleChangeDiaryData}
                value={notes}
              />
            </div>
            <div className="write_cover">
              <span>포스터 이미지 주소:</span>
              <input
                name="cover"
                placeholder="https://"
                onChange={handleChangeDiaryData}
                value={cover}
              />
            </div>
          </CardContent>
        </Card>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default SearchDiary;
