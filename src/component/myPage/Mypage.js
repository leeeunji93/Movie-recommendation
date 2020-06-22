import React from 'react';
import MyAccount from '../../tool/MyAccount';
import { useSelector } from 'react-redux';
import * as actions from '../../reducers/auth';
import './mypage.scss';

const MyPage = () => {
  const { auth } = useSelector((state) => state);
  const { isLogin } = auth;
  return (
    <div className="user">
      {' '}
      <p>{isLogin ? `${MyAccount.nickname} 님이 본 영화 ` : 'Login'}</p>
    </div>
  );
};

export default MyPage;
