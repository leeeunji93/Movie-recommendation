import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/diaryList';
import { useHistory } from 'react-router';
import './diaryList.scss';
import { makeStyles } from '@material-ui/core/styles';

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
        console.log('가져온다이어리리스트', resultData);
        dispatch(
          actions.setDiary({
            key: 'diaryArr',
            value: resultData.diaryArr,
          }),
        );
        dispatch(
          actions.setDiary({
            key: 'page',
            value: page,
          }),
        );
        dispatch(
          actions.setDiary({
            key: 'totalPage',
            value: resultData.totalPage,
          }),
        );
        dispatch(
          actions.setDiary({
            key: 'totalCount',
            value: resultData.totalCount,
          }),
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }));
  const classes = useStyles();

  const DiaryItem = ({ data }) => {
    console.log('@@data.id', data.id);
    const clickedItem = () => {
      history.push('/DiaryDataContainer/' + data.dId);
    };
    let tags = data.tags.split(',');
    return (
      <div className="main_wrapper">
        <div className="diary" onClick={clickedItem}>
          <img src={data.cover} alt="" />
          <div className="diary_content">
            {/* <p>Title : {data.title}</p>
  <p>User : {data.nickname}</p> */}
            <div>
              <b>{data.movieTitle}</b>
            </div>
            <div className="tag">
              {tags.map((tag) => {
                return `# ${tag} `;
              })}
            </div>
            {/* <div>Rating : {data.rating}</div>
  <div>Date : {data.watchDate}</div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <section>
        {diaryArr.map((data) => (
          <DiaryItem data={data} key={data.id} />
        ))}
      </section>
      <header>
        {page} / {totalPage}
        {/* - 페이지당 일기 갯수 :{' '}
        {PAGE_SIZE} -  */}
        저장된 전체 일기 갯수 : {totalCount}
      </header>
    </div>
  );
};

export default DiaryList;
