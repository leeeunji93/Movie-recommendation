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
// import { useState } from 'react';

const App = () => {
  const { auth } = useSelector((state) => state);
  const { isLogin } = auth;
  const dispatch = useDispatch();

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
    dispatch(actions.setLogin({ isLogin }));

    console.log('@@로그인확인', isLogin);
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route component={MainContainer} exact path="/" />
        <Route component={DiaryDataContainer} path="/DiaryDataContainer/:dId" />
        <Route component={SearchMovieContainer} path="/SearchMovieContainer" />
        <Route
          component={MyPageContainer}
          path="/mypage/:dId"
          // render={(props) => <MyPageContainer {...props} isLogin={isLogin} />}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} onChangeLoginState={onChangeLoginState} />
          )}
        />
        <Route component={Register} path="/register" />
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  );
};

export default App;
