import React, { useState } from "react";
import MyAccount from "../../tool/MyAccount";
import { NetTool, APIs } from "../../tool/NetTool";
import { Link } from "react-router-dom";

const textMap = {
  login: "로그인",
  register: "회원가입",
};
const Auth = ({ type }) => {
  const text = textMap[type];

  const [form, setForm] = useState({
    email: "",
    pwd: "",
    passwordConfirm: "",
  });

  const { email, pwd, passwordConfirm } = form;

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
    const email = "aa@aa.aa";
    const pwd = "123123";
    const nickname = "이름" + new Date().getTime();

    NetTool.request(APIs.userJoin)
      .appendFormData("email", email)
      .appendFormData("nickname", nickname)
      .appendFormData("pwd", pwd)
      .exec(true)
      .then((resultData) => {
        alert("회원 가입 성공");
        console.log("가입 성공, 리절트 : ", resultData);
        MyAccount.updateMyAccount(resultData);
      })
      .catch((error) => {
        if (error === "EmailExists") {
          alert("이메일주소가 이미 가입되어 있음");
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
          className="auth_id"
          name="email"
          placeholder="아이디를 입력하세요"
          onChange={onChange}
          value={email}
        />
        <br />
        <input
          className="auth_password"
          name="pwd"
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
          value={pwd}
        />

        {type === "register" && (
          <input
            className="auth_passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 확인하세요"
            onChange={onChange}
            value={passwordConfirm}
          />
        )}

        <br />
        <footer>
          {type === "login" ? (
            <Link onClick={clickJoin} to="/register">
              회원가입
            </Link>
          ) : (
            <Link onClick={clickLogin} to="/login">
              로그인
            </Link>
          )}
          ;
        </footer>
      </form>
    </div>
  );
};

export default Auth;
