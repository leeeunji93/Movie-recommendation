import React, { useState } from "react";
import MyAccount from "../../tool/MyAccount";
import { NetTool, APIs } from "../../tool/NetTool";
import { Link } from "react-router-dom";

const textMap = {
  login: "로그인",
  register: "회원가입",
};
const Auth = ({ type, onChangeLoginState, isLogin }) => {
  const text = textMap[type];

  const [form, setForm] = useState({
    email: "",
    pwd: "",
    nickname: "",
    passwordConfirm: "",
  });

  const { email, pwd, nickname, passwordConfirm } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onSafe = (email, pwd) => {
    const regExpPwEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExpPw = /^[A-Za-z0-9]{6,12}$/;

    if (email.match(regExpPwEmail)) {
      if (pwd.match(regExpPw)) {
        this.props.history.push("/");
      } else {
        alert("비밀번호를 다시 입력하세요");
        /*해당 인풋 포커스 주자*/
      }
    } else {
      alert("이메일 주소를 다시 입력하세요");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = onSafe(email, pwd);
    if (error) {
      alert(error);
    }
  };

  // 이메일 주소로 로그인 하기.
  const clickLogin = () => {
    // 필수 email, pwd

    /*const email = "hyunwoo-21@hanmail.net";
    const pwd = "123123";*/

    NetTool.request(APIs.userLogin)
      .appendFormData("email", email) // 필수
      .appendFormData("pwd", pwd) // 필수
      .exec(true)
      .then((resultData) => {
        alert("로그인 성공");
        MyAccount.updateMyAccount(resultData);
        onChangeLoginState();
        console.log(isLogin);
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
    /* const email = "aa@aa.aa";
    const pwd = "123123";*/
    /*    const nickname = "이름" + new Date().getTime();*/

    NetTool.request(APIs.userJoin)
      .appendFormData("email", email)
      .appendFormData("nickname", nickname)
      .appendFormData("pwd", pwd)
      .exec(true)
      .then((resultData) => {
        alert("회원 가입 성공");
        console.log("가입 성공, 리절트 : ", resultData);
        MyAccount.updateMyAccount(resultData);
        onChangeLoginState();
        console.log(isLogin);
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
          className="auth_input"
          name="email"
          placeholder="이메일 주소 입력하세요"
          onChange={onChange}
          value={email}
        />
        <br />
        <input
          className="auth_input"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          onChange={onChange}
          value={nickname}
        />

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
            name="passwordConfirm"
            placeholder="비밀번호를 확인하세요"
            onChange={onChange}
            value={passwordConfirm}
          />
        )}

        <br />
        <footer>
          <button>
            <Link onClick={clickJoin} to="/">
              회원가입
            </Link>
          </button>
          <button>
            <Link onClick={clickLogin} to="/">
              로그인
            </Link>
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Auth;
