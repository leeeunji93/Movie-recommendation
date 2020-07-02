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
import Chip from '@material-ui/core/Chip';

const SearchDiary = ({ match }) => {
  const { search } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { form, never, isModify, watchDate } = search;
  const {
    tagsAll,
    title,
    cover,
    notes,
    rating,
    tags,
    // watchDate,
    createdAt,
    modifiedAt,
  } = form;
  const dId = match.params.dId;
  const { selectedMovie } = never;
  const history = useHistory();

  useEffect(() => {
    refreshTags();
    if (isModify) {
      console.log('@@dId', dId);
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
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleChangeDiaryData = (e) => {
    // setKeyword(e.target.value);
    console.log('@@onChane값', e.target.name);
    console.log(e.target.value);
    dispatch(
      actions.setForm({
        key: e.target.name,
        value: e.target.value,
      }),
    );
  };

  // const handleDateChange = (date) => {
  //   dispatch(actions.setDate(date));
  // };

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
      <div className="tagName">
        <p>{tagTypeData.tagType}</p>
        <div className="tags">
          {tagTypeData.tags.map((tag, index) => (
            <TagItem tag={tag} key={index} />
          ))}
        </div>
      </div>
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },

    inputTitle: {
      width: 150,
      marginLeft: '0.4rem',

      '& .MuiInput-underline:after': {
        borderBottomColor: '#0d0d0d',
      },
      '&:hover fieldset': {
        borderColor: '#16a085',
      },
      '& label.Mui-focused': {
        color: '#0d0d0d',
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <section className="write_full">
        <Card className={classes.root} elevation={0}>
          <CardContent>
            <Typography className={classes.title}>
              <h2>{isModify ? '일기수정' : 'Write'}</h2>
            </Typography>
            <div className="write_header">
              <TextField
                className={classes.inputTitle}
                name="title"
                label="Title"
                onChange={handleChangeDiaryData}
                value={title}
              />

              <div className="dateDate">
                <input
                  name="watchDate"
                  value={watchDate}
                  onChange={handleChangeDiaryData}
                  type="date"
                />
              </div>

              <div className="write_rating">
                <span className="icon" onClick={handlePlusRating}>
                  <ThumbUpAltIcon />
                </span>
                <span className="icon" onClick={handleMinusRating}>
                  <ThumbDownIcon />
                </span>

                {[...Array(rating)].map((x, i) => (
                  <span className="star" key={i}>
                    <StarIcon />️
                  </span>
                ))}
              </div>
            </div>
            <div className="write_tags">
              <input
                name="tags"
                value={tags}
                onChange={handleChangeDiaryData}
              />

              {/* 보여는거 우린 보여줄 이유가 없다 */}
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
              <input
                name="cover"
                placeholder="https://"
                onChange={handleChangeDiaryData}
                value={cover}
              />
            </div>
          </CardContent>
        </Card>
        <div className="write_button">
          <button onClick={handleSave}>저장</button>
        </div>
      </section>
    </div>
  );
};

export default SearchDiary;
