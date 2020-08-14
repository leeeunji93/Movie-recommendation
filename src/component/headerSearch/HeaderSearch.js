import React from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/headerSearch';
import { useEffect } from 'react';
import { useState } from 'react';
import '../headerSearch/HeaderSearch.scss';

const HeaderSearch = () => {
  const { headerSearch } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { searchArr } = headerSearch.search;
  const history = useHistory();
  const [hangOver, setHangingOver] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, [dispatch]);

  const DiaryItem = (data) => {
    console.log('data란', data);
    const handleOnMouseOver = () => {
      setHangingOver(!hangOver);
    };

    const handleOnMouseLeave = () => {
      setHangingOver(hangOver);
    };

    const clickedItem = () => {
      if (!!history) {
        history.push('/diarydata/' + data.data.dId);
      }
    };
    let tags = data.data.tags.split(',');

    return (
      <div className="hSearch_wrapper">
        <section
          className="hSearch"
          onMouseEnter={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          onClick={clickedItem}
        >
          <img className="hSearch_image" src={data.data.cover} alt="" />

          {hangOver ? (
            <div className="hSearch_content">
              <b>{data.data.title}</b>
              <div>
                <b>{data.data.rating}</b>/5
              </div>
            </div>
          ) : (
            <div className="hSearch_content">
              <div>
                <b className="hSearch_userTitle">{data.data.movieTitle}</b>
              </div>
              <div className="hSearch_tag">
                {tags.map((tag) => {
                  return `# ${tag} `;
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  };

  return (
    <div>
      <section className="diary_data">
        <h2 className="hSearch_title"> "" 검색 결과</h2>
        {console.log('배열', searchArr)}
        {searchArr.map((data, index) => (
          <DiaryItem data={data} key={index} />
        ))}
      </section>
    </div>
  );
};

export default HeaderSearch;
