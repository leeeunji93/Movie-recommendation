import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NetTool, APIs } from './tool/NetTool';
import MyAccount from './tool/MyAccount';
import { Header } from './component';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './reducers/auth';
import {
  Login,
  MainContainer,
  MyPageContainer,
  DiaryDataContainer,
  Register,
  SearchMovieContainer,
} from './containers';

import './App.scss';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isLogin } = auth;

  useEffect(() => {
    authAccessToken();
  }, []);

  const authAccessToken = () => {
    if (MyAccount.atkn) {
      NetTool.request(APIs.userAuth)
        .exec()
        .then((resultData) => {
          console.log('자동 로그인 성공.');
          MyAccount.updateMyAccount(resultData);
          onChangeLoginState();
        })
        .catch((error) => alert(error));
    }
  };

  const onChangeLoginState = () => {
    const isLogin = MyAccount.uId > 0;
    dispatch(actions.setLogin({ isLogin: isLogin }));
    console.log('@@로그인확인', isLogin);
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route component={MainContainer} path="/" />
        <Route component={DiaryDataContainer} path="/DiaryDataContainer/:dId" />
        <Route component={SearchMovieContainer} path="/SearchMovieContainer" />
        <Route
          component={MyPageContainer}
          path="/mypage/:nickName"
          // render={(props) => <MyPageContainer {...props} isLogin={isLogin} />}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} onChangeLoginState={onChangeLoginState} />
          )}
        />
        <Route component={Register} path="/register" />
      </Switch>
    </div>
  );
};

export default App;
