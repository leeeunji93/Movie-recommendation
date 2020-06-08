import React, { useEffect } from "react";
import { NetTool, APIs } from "../../../tool/NetTool";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../reducers/diaryList";
import { useHistory } from "react-router";

const PAGE_SIZE = 10;
const history = useHistory();

const DiaryList = () => {
  const { diaryList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { diary } = diaryList;
  const { diaryArr, page, totalPage, totalCount } = diary;

  useEffect(() => {
    refreshDiaryArr(1);
  }, []);

  const refreshDiaryArr = (page) => {
    NetTool.request(APIs.filmDiaryList(page, PAGE_SIZE))
      .exec()
      .then((resultData) => {
        console.log("refreshDiaryArr", refreshDiaryArr);
        dispatch(
          actions.setDiary({
            page: page,
            totalPage: resultData.totalPage,
            totalCount: resultData.totalCount,
            diaryArr: resultData.diaryArr,
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  const DiaryItem = ({ data }) => {
    const clickedItem = () => {
      history.push("/DiaryDataContainer/" + data.dId);
    };
    return (
      <div className="diary" onClick={clickedItem}>
        <img src={data.cover} alt="" />
        <div className="diary_content">
          <span>일기 제목 : {data.title}</span>
          <span>닉네임 : {data.nickname}</span>
          <div>영화 제목 : {data.movieTitle}</div>
          <div>태그들 : {data.tags}</div>
          <div>레이팅 : {data.rating}</div>
          <div>본 날짜 : {data.watchDate}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>다이어리 리스트</h1>
      <div>
        {diaryArr.map((data, index) => (
          <DiaryItem data={data} key={index} />
        ))}
      </div>
      <footer>
        <div className="totalPage">
          {page} / {totalPage}
        </div>
        <div className="savePage">{totalCount}</div>
      </footer>
    </div>
  );
};

export default DiaryList;
