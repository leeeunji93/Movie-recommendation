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
  const { form, never } = search;
  const { tagsAll, rating } = form;

  const dId = match.params.dId;
  const { selectedMovie } = never;
  const history = useHistory();
  const isModify = dId > 0;

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

  const [input, setInput] = useState({
    title: '',
    cover: '',
    notes: '',
    watchDate: '',
  });

  let selectedTags = [];
  const handleChangeTags = (e) => {
    selectedTags = selectedTags.concat(e.target.value);
    selectedTags.join(',');
  };

  const handleChangeDiaryData = (e) => {
    console.log('name', e.target.name);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
    console.log('별점 마이너스', form.rating);
    dispatch(
      actions.setForm({
        key: 'rating',
        value: form.rating - 1,
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

    if (input.title.trim().length === 0) {
      alert('일기 제목을 쓰세요');
      return;
    }

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
              {/* <h2>{isModify ? '일기수정' : 'Write'}</h2> */}
              <h2>Write</h2>
            </Typography>
            <div className="write_header">
              <TextField
                className={classes.inputTitle}
                name="title"
                label="Title"
                onChange={handleChangeDiaryData}
                value={input.title}
              />

              <div className="dateDate">
                <input
                  name="watchDate"
                  value={input.watchDate}
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
                  <span classNamej="star" key={i}>
                    <StarIcon />️
                  </span>
                ))}
              </div>
            </div>

            <div className="write_tags">
              <select name="tags_st" onChange={handleChangeTags}>
                {tagsAll[0] !== undefined
                  ? tagsAll[0].tags.map((tagTypeData) => {
                      return <option value={tagTypeData}>{tagTypeData}</option>;
                    })
                  : ''}
              </select>

              <select name="tags_si" onChange={handleChangeTags}>
                {tagsAll[1] !== undefined
                  ? tagsAll[1].tags.map((tagTypeData) => {
                      return <option value={tagTypeData}>{tagTypeData}</option>;
                    })
                  : ''}
              </select>
            </div>

            <div className="write_content">
              <input
                name="notes"
                placeholder="일기 내용"
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
