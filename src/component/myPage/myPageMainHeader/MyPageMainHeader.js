import React from "react";
import MyAccount from "../../../tool/MyAccount";

const MyPageMainHeader = ({ isLogin }) => (
  <div>
    {isLogin && (
      <>
        <div>로그인 되있음</div>
        <div>이름 : {MyAccount.nickname}</div>
        <div>이메일 : {MyAccount.email}</div>
      </>
    )}
    {!isLogin && <div>로그인 안 되어있음</div>}
  </div>
);

export default MyPageMainHeader;
