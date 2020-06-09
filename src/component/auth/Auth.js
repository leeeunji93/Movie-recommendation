import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyAccount from "../../tool/MyAccount";
import { NetTool, APIs } from "../../tool/NetTool";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as actions from "../../reducers/auth";
import "./Auth.scss";

const textMap = {
  login: "로그인",
  register: "회원가입",
};
const Auth = ({ type, onChangeLoginState }) => {
  const text = textMap[type];

  const { auth } = useSelector((state) => state); //store연결
  const dispatch = useDispatch(); //액션 발생시키자
  const { form } = auth;
  const { email, pwd, nickname, pwdConfirm } = form; //리듀서에서
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, [dispatch]);

  console.log("@@@@ auth : ", auth);

  const onChange = (e) => {
    dispatch(
      actions.setForm({
        key: e.target.name,
        value: e.target.value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // 이메일 주소로 로그인 하기.
  const clickLogin = () => {
    // 필수 email, pwd

    NetTool.request(APIs.userLogin)
      .appendFormData("email", email) // 필수
      .appendFormData("pwd", pwd) // 필수
      .exec(true)
      .then((resultData) => {
        alert("로그인 성공");
        MyAccount.updateMyAccount(resultData);
        onChangeLoginState();
      })
      .catch((error) => {
        if (error === "UserNotFound") {
          alert("이메일 주소를 찾을 수 없음");
        } else if (error === "InvalidPassword") {
          alert("비밀번호 틀림");
        } else {
          alert(error);
        }
      });
  };

  const clickLogout = () => {
    console.log("로그아웃 했음. 토큰을 삭제하고 홈화면으로 페이지를 리로드.");
    MyAccount.logout();
  };

  const clickJoin = () => {
    //필수 데이터 : email, name, pwd
    /*
        const patten = /^(?=\w{6,}$)(?=.*[a-z])(?=.*[A-Z])/;
      if (!patten.test(pwd)) {
      return "대소문자를 넣어주세요!";
    }

    if (!email.includes("@")) {
      return "유효한 이메일 값이 아닙니다!";
    }*/

    NetTool.request(APIs.userJoin)
      .appendFormData("email", email)
      .appendFormData("nickname", nickname)
      .appendFormData("pwd", pwd)
      .exec(true)
      .then((resultData) => {
        alert("회원 가입 성공, 로그인해주세요");
        console.log("가입 성공, 리절트 : ", resultData);
        MyAccount.updateMyAccount(resultData);
        history.push("/login");
        onChangeLoginState();
      })
      .catch((error) => {
        if (error === "EmailExists") {
          alert("이메일주소가 이미 가입되어 있음");
          history.push("/register");
        } else {
          alert(error);
        }
      });
  };

  return (
    <div className="authForm_wrapper">
      <h1>{text}</h1>
      <form onSubmit={onSubmit} className="auth_form">
        <input
          className="auth_input"
          name="email"
          placeholder="이메일 주소 입력하세요"
          onChange={onChange}
          value={email}
        />
        <br />
        {type === "register" && (
          <input
            className="auth_input"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
            value={nickname}
          />
        )}

        <input
          type="password"
          className="auth_input"
          name="pwd"
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
          value={pwd}
        />

        {type === "register" && (
          <input
            type="password"
            className="auth_input"
            name="pwdConfirm"
            placeholder="비밀번호를 확인하세요"
            onChange={onChange}
            value={pwdConfirm}
          />
        )}
        {type === "login" ? (
          <Link to="/">
            <button onClick={clickLogin}>로그인</button>
            <button onClick={clickLogout}>로그아웃</button>
          </Link>
        ) : null}

        <br />
        <footer>
          {type === "login" ? (
            <Link to="/register">회원가입</Link>
          ) : (
            <Link onClick={clickJoin} to="/">
              로그인
            </Link>
          )}
        </footer>
      </form>
    </div>
  );
};

export default Auth;
