import React, { useEffect, useState } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './mypage.scss';

import MyAccount from '../../tool/MyAccount';

const PAGE_SIZE = 100;

const MyPage = ({ match }) => {
  const [userDiaryArr, setUserDiaryArr] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const dId = match.params.dId;

  const isLogin = useSelector((state) => {
    //isLogin 의 구조가 왜 이렇게 되는걸까
    return state.auth.isLogin.isLogin;
  });
  const history = useHistory();

  console.log('마이페이지에서 isLogin', isLogin);

  useEffect(() => {
    console.log('isLogin 값과 관련된 유즈 이펙트.');
    if (isLogin) {
      console.log(
        '로그인 된 상태이다. MyAccount 의 uId 를 이용해서 다이어리를 가져온다.',
      );
      NetTool.request(APIs.userDiaryList(page, PAGE_SIZE, MyAccount.uId))
        .exec()
        .then((resultData) => {
          console.log('내 일기 응답 ', resultData.diaryArr);
          setUserDiaryArr(resultData.diaryArr);
          setTotalPage(resultData.totalPage);
          setTotalCount(resultData.totalCount);
        });
    } else {
      console.log(
        '아직 로그인이 완료되지 않은 상태이므로, 아무것도 하지 않는다..',
      );
    }
  }, [isLogin, page]);

  if (!isLogin) {
    //아직 로그인 안된 상태이므로 아무것도 렌더링하지 않는다.
    return null;
  }

  const DiaryItem = ({ data }) => {
    const clickedItem = () => {
      console.log('dId', data.dId);
      history.push('/diarydata/' + data.dId);
    };

    return (
      <section>
        <div className="data_list" onClick={clickedItem}>
          <img src={data.cover} alt="" />
          <h1 className="data_list_info_title"> {data.title} </h1>
          <h3 className="data_list_info_date">{data.watchDate}의 기록</h3>
        </div>
      </section>
    );
  };

  return (
    <div className="mypage_wrapper">
      <div className="mypage_header">
        <span className="mypage_title">{`${MyAccount.nickname} 님의 감상문`}</span>

        <span className="mypage_totalcount"> [ {totalCount} ] 편 </span>
      </div>

      <div className="data_wrapper">
        {userDiaryArr.map((data, index) => (
          <DiaryItem data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MyPage;

{
  /* 
<div className="data_list_text">
            <div className="data_list_title">
              {`${data.movieTitle}`.slice(0, 9)}
            </div>
            <div className="data_list_date">{data.watchDate}</div>

            <div className="data_list_rate"> {`⭐${data.rating}.0`}</div>
          </div>
       */
}
