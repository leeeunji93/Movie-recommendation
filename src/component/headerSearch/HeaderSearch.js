import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/headerSearch';
import { useEffect } from 'react';
import '../headerSearch/HeaderSearch.scss';

const HeaderSearch = () => {
  const { headerSearch } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { searchArr } = headerSearch.search;
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, [dispatch]);

  const DiaryItem = (data) => {
    console.log('data란', data);
    const clickedItem = () => {
      if (!!history) {
        history.push('/diarydata/' + data.data.dId);
      }
    };
    let tags = data.data.tags.split(',');

    return (
      <div className="hSearch_wrapper">
        <section className="hSearch" onClick={clickedItem}>
          <img className="hSearch_image" src={data.data.cover} alt="" />
          <span className="hSearch_notes">{data.data.notes}</span>
        </section>
      </div>
    );
  };

  return (
    <div>
      <section className="diary_data">
        {searchArr.map((data) => (
          <DiaryItem data={data} key={data.id} />
        ))}
      </section>
    </div>
  );
};

export default HeaderSearch;
