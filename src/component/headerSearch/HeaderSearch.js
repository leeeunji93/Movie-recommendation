import React from 'react';
import { useHistory } from 'react-router-dom';

const HeaderSearch = (diaryArr) => {
  // const history = useHistory();
  // const DiaryItem = ({ data }) => {
  //   const clickItem = () => {
  //     if (!!history) {
  //       history.push('/diaryDetail/' + data.dId);
  //     }
  //   };

  //   return (
  //     <div className="DiaryItem" onClick={clickItem}>
  //       <img src={data.cover} alt="" />
  //       <div>
  //         <div>일기 제목 : {data.title}</div>
  //         <div>쓴사람 닉네임 : {data.nickname}</div>
  //         <div>태그들 : {data.tags}</div>
  //         <div>레이팅 : {data.rating}</div>
  //         <div>본 날짜 : {data.watchDate}</div>
  //         <div>영화 제목 : {data.movieTitle}</div>
  //       </div>
  //     </div>
  //   );
  // };

  if (!diaryArr) {
    return alert('준비중...');
  }

  return (
    <div>
      ㅗ
      {/* {diaryArr.map((data, index) => (
        <DiaryItem data={data} key={index} />
      ))} */}
    </div>
  );
};

export default HeaderSearch;
