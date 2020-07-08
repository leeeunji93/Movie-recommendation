import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/diaryData';
import { useHistory } from 'react-router-dom';
import './DiaryData.scss';

const DiaryData = ({ match }) => {
  const { diaryData } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = diaryData;
  const { movie, diary, user } = data;
  const dId = match.params.dId;

  useEffect(() => {
    NetTool.request(APIs.filmDiaryDetail(dId))
      .exec()
      .then((resultData) => {
        console.log('다이어리상세데이터', resultData);
        dispatch(
          actions.setDetail({
            key: 'diary',
            value: resultData.diary,
          }),
        );
        dispatch(
          actions.setDetail({
            key: 'movie',
            value: resultData.movie,
          }),
        );
        dispatch(
          actions.setDetail({
            key: 'user',
            value: resultData.user,
          }),
        );
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // const clickUpdate = () => {
  //   history.push('/SearchMovieContainer/' + dId);
  // };


  if (!movie || !diary || !user) {
    return null;
  }
  let tags = diary.tags.split(',');
  return (
    <div>
      <div className="dairyData_wrapper">
        <div className="dairyData_diary">
          <div className="dairyData_diary_user_img">
            <img src={diary.cover} alt="" />
          </div>
          <div className="dairyData_diary_data">
            <div className="dairyData_diary_user">{user.nickname}님의 Note</div>
            <div className="dairyData_diary_title">"{diary.title}"</div>
            <div className="dairyData_diary_tags">
              <p>
                {tags.map((tag) => {
                  return `# ${tag}`;
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="dairyData_diary_notes">
          <div className="dairyData_movieData">
            <h4>Movie Info</h4>
            <span className="movieInfo_text  movieInfo_text_title">
              {movie.title}
            </span>
            <span className="movieInfo_text">{movie.pubDate} 개봉</span>
            <div className="movieInfo_text">
              감독 : {movie.director.split('|')}
            </div>
            <div className="movieInfo_text">
              배우 : {movie.actor.slice(0, -1)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ whiteSpace: 'pre-wrap' }} className="movieInfo_note">
        <p> {diary.notes}</p>
      </div>

      {/* <button onClick={clickUpdate}>일기 수정</button> */}

    </div>
  );
};

export default DiaryData;
