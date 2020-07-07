import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/diaryList';
import { useHistory } from 'react-router';
import './DiaryList.scss';
import { useState } from 'react';

const PAGE_SIZE = 10;

const DiaryList = () => {
  const { diaryList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { list } = diaryList;
  const { diaryArr, page, totalPage, totalCount } = list;
  const history = useHistory();
  const [hangOver, setHangingOver] = useState(false);
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

  const DiaryItem = ({ data }) => {
    const handleOnMouseOver = () => {
      setHangingOver(!hangOver);
    };

    const handleOnMouseLeave = () => {
      setHangingOver(hangOver);
    };

    const clickedItem = () => {
      history.push('/DiaryDataContainer/' + data.dId);
    };
    let tags = data.tags.split(',');
    return (
      <div className="main_wrapper">
        <div
          className="diary"
          onMouseEnter={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          onClick={clickedItem}
        >
          <img className="diary_image" src={data.cover} alt="" />

          {hangOver ? (
            <div className="diary_content">
              <b>{data.movieTitle}</b>
              <div>
                <b>{data.rating}</b>/5
              </div>
            </div>
          ) : (
            <div className="diary_content">
              <div>
                <b className="userTitle">{data.title}</b>
              </div>
              <div className="tag">
                {tags.map((tag) => {
                  return `# ${tag} `;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="diary_data">
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
