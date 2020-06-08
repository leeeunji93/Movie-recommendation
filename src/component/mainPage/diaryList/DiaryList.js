import React, { useEffect } from "react";
import { NetTool, APIs } from "../../../tool/NetTool";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../reducers/diaryList";
import { useHistory } from "react-router";

const PAGE_SIZE = 10;

const DiaryList = () => {
  const { diaryList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { list } = diaryList;
  const { diaryArr, page, totalPage, totalCount } = list;
  const history = useHistory();

  useEffect(() => {
    refreshDiaryArr(1);
  }, []);

  const refreshDiaryArr = (page) => {
    NetTool.request(APIs.filmDiaryList(page, PAGE_SIZE))
      .exec()
      .then((resultData) => {
        console.log("가져온다이어리리스트", resultData);
        dispatch(
          actions.setDiary({
            key: "diaryArr",
            value: resultData.diaryArr,
          }),
          actions.setDiary({
            key: "page",
            value: page,
          }),
          actions.setDiary({
            key: "totalPage",
            value: resultData.totalPage,
          }),
          actions.setDiary({
            key: "totalCount",
            value: resultData.totalCount,
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
        {diaryArr.map((data) => (
          <DiaryItem data={data} key={data.id} />
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

/*
import React, { Component } from "react";
import { NetTool, APIs } from "../../../tool/NetTool";
import { withRouter } from "react-router-dom";
import "./DiaryList.scss";

class DiaryList extends Component {
  state = {
    diaryArr: [],
    page: 0,
    totalPage: 0,
    totalCount: 0,
  };

  componentDidMount() {
    this.refreshDiaryArr(1);
  }

  refreshDiaryArr(page) {
    NetTool.request(APIs.filmDiaryList(page, PAGE_SIZE))
      .exec()
      .then((resultData) => {
        this.setState({
          page: page,
          totalPage: resultData.totalPage,
          totalCount: resultData.totalCount,
          diaryArr: resultData.diaryArr,
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  DiaryItem = ({ data }) => {
    const clickedItem = () => {
      this.props.history.push("/DiaryDataContainer/" + data.dId);
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

  render() {
    const { totalPage, totalCount, page, diaryArr } = this.state;
    return (
      <div>
        <h1>다이어리 리스트</h1>
        <div>
          {diaryArr.map((data, index) => (
            <this.DiaryItem data={data} key={index} />
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
  }
}

export default withRouter(DiaryList);
*/
