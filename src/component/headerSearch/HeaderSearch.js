import React from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/headerSearch';
import { useEffect } from 'react';
import { useState } from 'react';
import '../mainPage/DiaryList.scss';

const HeaderSearch = () => {
  const { headerSearch } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { keyword, searchArr } = headerSearch.search;
  const history = useHistory();
  const [hangOver, setHangingOver] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, [dispatch]);

  const DiaryItem = (data) => {
    const handleOnMouseOver = () => {
      setHangingOver(!hangOver);
    };

    const handleOnMouseLeave = () => {
      setHangingOver(hangOver);
    };

    const clickedItem = () => {
      if (!!history) {
        history.push('/DiaryDataContainer/' + data.data.dId);
      }
    };
    let tags = data.data.tags.split(',');

    return (
      <div className="main_wrapper">
        <div
          className="diary"
          onMouseEnter={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          onClick={clickedItem}
        >
          <img className="diary_image" src={data.data.cover} alt="" />

          {hangOver ? (
            <div className="diary_content">
              <b>{data.data.title}</b>
              <div>
                <b>{data.data.rating}</b>/5
              </div>
            </div>
          ) : (
            <div className="diary_content">
              <div>
                <b className="userTitle">{data.data.movieTitle}</b>
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
      {searchArr.map((data, index) => (
        <DiaryItem data={data} key={index} />
      ))}
    </div>
  );
};

export default HeaderSearch;
