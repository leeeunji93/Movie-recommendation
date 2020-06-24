import React, { useEffect } from 'react';
import { NetTool, APIs } from '../../tool/NetTool';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../reducers/diaryData';

const DiaryData = ({ match }) => {
  const { diaryData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data } = diaryData;
  const { movie, diary, user } = data;
  const dId = match.params.dId;

  // useEffect(() => {
  //   NetTool.request(APIs.filmDiaryDetail(dId))
  //     .exec()
  //     .then((resultData) => {
  //       console.log('상세데이터', resultData);
  //       console.log('dId', dId);
  //       dispatch(
  //         actions.setDetail({
  //           key: 'movie',
  //           value: resultData.movie,
  //         }),
  //       );
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    NetTool.request(APIs.filmDiaryDetail(dId))
      .exec()
      .then((resultData) => {
        console.log('상세데이터', resultData);
        console.log('dId', dId);
        console.log('@@error', resultData.movie);
        dispatch(
          actions.setDetail({
            key: 'diary',
            value: resultData.diary,
          }),
        );
        dispatch(
          actions.setDetail({
            key: 'movie',
            value: resultData.movie,
          }),
        );
        dispatch(
          actions.setDetail({
            key: 'user',
            value: resultData.user,
          }),
        );
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  /*  const clickUpdate = () => {
    props.history.push("/DiaryDataContainer/:dId" + props.match.params.dId);
  };
  const clickDelete = () => {
    if (window.confirm("삭제할까요?")) {
      NetTool.request(APIs.filmDiaryDelete)
        .appendFormData("dId", props.match.params.dId)
        .exec(true)
        .then(() => {
          alert("삭제 완료");
          props.history.replace("/");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };*/

  if (!diary) {
    return null;
  }

  return (
    <div id="DiaryData">
      <h1>다이어리 상세페이지.</h1>
      <p>{dId}</p>

      <h3>영화 데이터.</h3>

      <h3>일기 데이터</h3>
      <div>{JSON.stringify(diary)}</div>

      <h3>글쓴이 정보</h3>
      <div>{JSON.stringify(user)}</div>

      <hr />
      {/*      <h3>수정, 삭제. (글쓴 사람만 할 수 있도록 처리할것)</h3>
      <button onClick={clickUpdate}>일기 수정</button>
      <button onClick={clickDelete}>일기 삭제</button>*/}
    </div>
  );
};

export default DiaryData;
