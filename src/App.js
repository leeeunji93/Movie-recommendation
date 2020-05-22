import React, { Component } from "react";
import { Route } from "react-router-dom";
import { NetTool, APIs } from "./tool/NetTool";
import MyAccount from "./tool/MyAccount";
import { Auth, Header } from "./component";
import "./App.css";
import "./reset.css";
import {
  Login,
  MainContainer,
  MyPageContainer,
  PosterResultContainer,
  Register,
  SearchMovieContainer,
} from "./containers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
  }

  componentDidMount() {
    this.authAccessToken();
  }

  authAccessToken = () => {
    if (MyAccount.atkn) {
      NetTool.request(APIs.userAuth)
        .exec()
        .then((resultData) => {
          console.log("자동 로그인 성공.");
          MyAccount.updateMyAccount(resultData);
          this.onChangeLoginState();
        })
        .catch((error) => alert(error));
    }
  };

  onChangeLoginState = () => {
    const isLogin = MyAccount.uId > 0;
    this.setState({ isLogin });
  };

  render() {
    return (
      <div>
        <Header />
        <Route component={MainContainer} path="/" exact />
        <Route
          component={PosterResultContainer}
          path="/PosterResultContainer"
        />
        <Route component={SearchMovieContainer} path="/SearchMovieContainer" />
        <Route component={MyPageContainer} path="/MyPageContainer" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
      </div>
    );
  }
}

export default App;
