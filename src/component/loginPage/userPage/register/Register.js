import React, { useState } from "react";
import MyAccount from "../../../tool/MyAccount";
import { NetTool, APIs } from "../../../tool/NetTool";
import "./UserPage.css";

const Register = ({ onChangeLoginState }) => {
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

  // 이메일주소로 회원가입하기.
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
        onChangeLoginState();
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
        {/*        { === "clickJoin" && (
          <input
            className="auth_passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 확인하세요"
            onChange={onChange}
            value={passwordConfirm}
          />}
        )}*/}
        <br />
        <button onClick={clickJoin}>회원가입하기</button>
        {}
      </form>
    </div>
  );
};

export default Register;
