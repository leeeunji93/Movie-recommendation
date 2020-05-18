import React, { useState } from "react";
import MyAccount from "../../../tool/MyAccount";
import { NetTool, APIs } from "../../../tool/NetTool";
import "./UserPage.css";

const Login = ({ onChangeLoginState }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, password, passwordConfirm } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // 이메일 주소로 로그인 하기.
  const clickLogin = () => {
    // 필수 email, pwd

    const email = "hyunwoo-21@hanmail.net";
    const pwd = "123123";

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

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit} className="auth_form">
        <input
          className="auth_id"
          name="username"
          placeholder="아이디를 입력하세요"
          onChange={onChange}
          value={username}
        />
        <br />
        <input
          className="auth_password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
          value={password}
        />

        <br />
        <button onClick={clickLogin}>로그인하기</button>
      </form>
    </div>
  );
};

export default Login;
