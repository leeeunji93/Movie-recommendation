import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router';
import './DiaryList.scss';
import { useState } from 'react';
import './DiaryList.scss';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import MyAccount from '../../tool/MyAccount';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';

const PAGE_SIZE = 10;

const DiaryList = ({ match }) => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [diaryArr, setDiaryArr] = useState([]);
  const history = useHistory();
  const dId = match.params.dId;

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

  // if (!movie || !diary) {
  //   return null;
  // }

  const DiaryItem = ({ data }) => {
    const clickedItem = () => {
      history.push('/diarydata/' + data.dId);
    };

    return (
      <div className="main_wrapper">
        <header className="main_top">
          <img
            className="main_top_img"
            src={data.cover}
            alt=""
            onClick={clickedItem}
          />
          <div className="main_user_title">{data.title}</div>
          <div className="main_top_tag">
            <span>#{data.movieTitle}</span>
            <span> #{data.director.split('|')}</span>
          </div>
        </header>
        <article className="main_content">
          <p>{data.notes}</p>
        </article>
      </div>
    );
  };

  return (
    <>
      <div className="main_data">
        {diaryArr.map((data) => (
          <DiaryItem data={data} key={data.id} />
        ))}
      </div>
      <header>
        <ScrollToTop
          smooth
          style={{
            right: '11px',
            width: '35px',
            height: '35px',
          }}
          component={
            <ArrowDropDownCircleRoundedIcon
              style={{ color: '#04bfad' }}
              fontSize="large"
              className="scroll_top_icon"
            />
          }
        />

        {/* {page} / {totalPage}- 페이지당 일기 갯수 : {PAGE_SIZE} - 저장된 전체
        일기 갯수 : {totalCount} */}
      </header>
    </>
  );
};

export default DiaryList;
