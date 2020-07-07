import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/diaryData';
import './mypage.scss';

const MyPage = () => {
  const { diaryData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data, userDiary } = diaryData;
  const { user } = data;
  const { userDiaryArr, userDiaryTotalCount } = userDiary;

  useEffect(() => {
    const uId = user.uId;
    NetTool.request(APIs.userDiaryList(1, uId))
      .exec(true)
      .then((resultData) => {
        console.log('user상세데이터', resultData);
        dispatch(
          actions.setUserDiary({
            key: ' userDiaryPage',
            value: 1,
          }),
        );
        dispatch(
          actions.setUserDiary({
            key: 'userDiaryArr',
            value: resultData.userDiaryArr,
          }),
        );
        dispatch(
          actions.setUserDiary({
            key: 'userDiaryTotalCount',
            value: resultData.userDiaryTotalCount,
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

  if (!userDiaryArr || !userDiaryTotalCount || !user.uId) {
    return alert('없어요');
  }

  return (
    <div>
      <div className="user"></div>
    </div>
  );
};

export default MyPage;

// import * as authActions from '../../reducers/auth';
// const { auth } = useSelector((state) => state);
// const { isLogin } = auth;

// <p>{isLogin ? `${MyAccount.nickname} 님이 본 영화 ` : 'Login'}</p>
