import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router';
import './DiaryData.scss';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import MyAccount from '../../tool/MyAccount';
import Header from '../../containers/header/Header';

const DiaryData = ({ match }) => {
  const dId = match.params.dId;
  const [diary, setDiary] = useState(null);
  const [movie, setMovie] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log('상세dId', dId);
    NetTool.request(APIs.filmDiaryDetail(dId))
      .exec()
      .then((resultData) => {
        console.log('다이어리상세데이터', resultData.diary);
        setDiary(resultData.diary);
        setMovie(resultData.movie);
        setUser(resultData.user);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const clickDelete = () => {
    if (window.confirm('정말 삭제하세요?')) {
      NetTool.request(APIs.filmDiaryDelete)
        .appendFormData('dId', dId)
        .exec(true)
        .then(() => {
          alert('삭제 완료');
          history.replace('/mypage/' + dId);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  // const clickUpdate = () => {
  //   history.push('/search/' + dId);
  // };

  if (!movie || !diary || !user) {
    return null;
  }

  let tags = diary.tags.split(',');
  return (
    <>
      {/* <Header /> */}
      <div className="dairyData_wrapper">
        <div className="dairyData_headline">
          <div className="headline_img">
            <img src={diary.cover} alt="" />
          </div>
          <div className="headline_title">{diary.title}</div>
        </div>
        <div className="dairyData_info_top">
          <div className="info_left">
            <span className="info_1">#{movie.director.split('|')}</span>
            <span className="info_2"> #{movie.title}</span>
          </div>

          <span className="info_right">by {user.nickname}</span>
        </div>
        <div className="dairyData_info_bottom">
          <span className="info_date">{diary.watchDate} ㅣ </span>
          <span className="info_tags">
            {tags.map((tag) => {
              return `${tag} ㅣ `;
            })}
          </span>
        </div>
        <div className="dairyData_note">
          <p>{diary.notes}</p>
        </div>
      </div>
      {console.log('uId', MyAccount.uId)};
      <div className="btn">
        {user.uId === MyAccount.uId ? (
          <button className="data_list_btn" onClick={clickDelete}>
            Delete
          </button>
        ) : null}
      </div>
      {/* 
        <div className="btn">
            {user.uId === MyAccount.uId ? (
              <button className="data_list_btn" onClick={clickUpdate}>
                Update
              </button>
            ) : null}
          </div> */}
    </>
  );
};

export default DiaryData;

{
  /* <div className="diary_user">{user.nickname}님의 Note</div>
</div>

<div className="dairyData_diary_notes">
  <div className="dairyData_movieData">
    <h4>Movie Info</h4>

    <span className="movieInfo_text">{movie.pubDate} 개봉</span>
    <div className="movieInfo_text">
      감독 : {movie.director.split('|')}
    </div>
    <div className="movieInfo_text">
      배우 : {movie.actor.slice(0, -1)}
    </div>
  </div> */
}
