import React, { useEffect } from 'react';
import MyAccount from '../../tool/MyAccount';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector, useDispatch } from 'react-redux';
// import * as authActions from '../../reducers/auth';
import * as actions from '../../reducers/diaryData';
import './mypage.scss';

const MyPage = ({ match }) => {
  const { auth } = useSelector((state) => state);
  const { isLogin } = auth;
  const { diaryData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data } = diaryData;
  const { movie, diary, user } = data;
  const dId = match.params.dId;

  useEffect(() => {
    NetTool.request(APIs.filmDiaryDetail(dId))
      .exec()
      .then((resultData) => {
        console.log('상세데이터', resultData);
        console.log('dId', dId);
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

  return (
    <div className="user">
      <p>{isLogin ? `${MyAccount.nickname} 님이 본 영화 ` : 'Login'}</p>
      <div id="DiaryData">
        <h1>다이어리 상세페이지.</h1>

        <h3>영화 데이터.</h3>
        <div>{JSON.stringify(movie)}</div>

        <h3>일기 데이터</h3>
        <div>{JSON.stringify(diary)}</div>

        <h3>글쓴이 정보</h3>
        <div>{JSON.stringify(user)}</div>
      </div>
    </div>
  );
};

export default MyPage;
