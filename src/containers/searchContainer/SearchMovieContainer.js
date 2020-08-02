import React, { useEffect, useState } from 'react';
import NeverSearch from '../../component/diarySearch/NeverSearch';
import SearchDiary from '../../component/diarySearch/SearchDiary';
import { NetTool, APIs } from '../../tool/NetTool';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/search';

const SearchMovieContainer = ({ match }) => {
  // const { search } = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const { never } = search;
  // const { tagsAll, selectedMovie } = never;

  // const dId = match.params.dId;
  // const isModify = dId > 0;

  // const [input, setInput] = useState({
  //   title: '',
  //   cover: '',
  //   notes: '',
  //   watchDate: '',
  //   tags: [],
  //   rating: 0,
  //   createdAt: '0',
  //   modifiedAt: '0',
  // });

  // useEffect(() => {
  //   refreshTags();
  //   if (isModify) {
  //     console.log('@@dId', dId);
  //     refreshUpdateData(dId);
  //   }
  // }, []);

  // const refreshUpdateData = (dId) => {
  //   const url = APIs.filmDiaryDetail(dId);
  //   NetTool.request(url)
  //     .exec(true)
  //     .then((resultData) => {
  //       console.log('수정할 데이터 가져오기 완료', resultData);
  //       dispatch(
  //         actions.setNever({
  //           key: 'selectedMovie',
  //           value: resultData.movie,
  //         }),
  //       );
  //       setInput(resultData.diary);
  //     })
  //     .catch((error) => alert(error));
  // };

  // const refreshTags = () => {
  //   NetTool.request(APIs.filmTags)
  //     .exec()
  //     .then((resultData) => {
  //       console.log('가져온 태그들 데이터 ', resultData);
  //       dispatch(
  //         actions.setNever({
  //           key: 'tagsAll',
  //           value: resultData,
  //         }),
  //       );
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  // const handleChangeDiaryData = (e) => {
  //   console.log('name', e.target.value);
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div>
      <NeverSearch match={match} />
      <SearchDiary
        match={match}
        // input={input}
        // handleChangeDiaryData={handleChangeDiaryData}
      />
    </div>
  );
};

export default SearchMovieContainer;
