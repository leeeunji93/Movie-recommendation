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

  const clickDelete = () => {
    if (window.confirm('삭제하세요?🥺')) {
      NetTool.request(APIs.filmDiaryDelete)
        .appendFormData('dId', dId)
        .exec(true)
        .then(() => {
          alert('삭제 완료');
          history.replace('/mypage');
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  if (!isLogin) {
    //아직 로그인 안된 상태이므로 아무것도 렌더링하지 않는다.
    return null;
  }

  const DiaryItem = ({ data }) => {
    const clickedItem = () => {
      history.push('/DiaryDataContainer/' + data.dId);
    };

    return (
      <section>
        <div className="data_list" onClick={clickedItem}>
          <img src={data.cover} alt="" />
          <div className="data_list_text">
            <div className="data_list_title">
              {`${data.movieTitle}`.slice(0, 9)}
            </div>
            <div className="data_list_date">{data.watchDate}</div>

            <div className="data_list_rate"> {`⭐${data.rating}.0`}</div>

            <button className="data_list_btn" onClick={clickDelete}>
              Delete
            </button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="mypage_wrapper">
      <h1>{`${MyAccount.nickname} 님의 Note`}</h1>
      <div className="mypage_totalcount">
        현재까지{' '}
        <span>
          <span className="total">{totalCount}</span> 편 작성하셨군요? 🥺{' '}
        </span>
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
