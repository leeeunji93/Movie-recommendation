import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router';
import './DiaryList.scss';
import { useState } from 'react';
import './DiaryList.scss';

const PAGE_SIZE = 10;

const DiaryList = ({ match }) => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [diaryArr, setDiaryArr] = useState([]);

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
        setPage(page);
        setTotalCount(resultData.totalPage);
        setTotalPage(resultData.totalPage);
        setDiaryArr(resultData.diaryArr);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const DiaryItem = ({ data }) => {
    console.log('@@data', data);
    const handleOnMouseOver = () => {
      setHangingOver(!hangOver);
    };

    const handleOnMouseLeave = () => {
      setHangingOver(hangOver);
    };

    const clickedItem = () => {
      history.push('/diarydata/' + data.dId);
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
      {/* <header>
        {page} / {totalPage}
        - 페이지당 일기 갯수 :{' '}
        {PAGE_SIZE} - 
        저장된 전체 일기 갯수 : {totalCount}
      </header> */}
    </div>
  );
};

export default DiaryList;
