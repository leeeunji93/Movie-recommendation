import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MyAccount from '../../tool/MyAccount';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../reducers/auth';

const Ul = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
  top: 20px;
  left: 20px;
  width: 20rem;
  li {
    color: black;
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    display: flex;
    flex-flow: column nowrap;
    background-color: #04bfad;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 0;
    height: 100vh;
    width: 10rem;
    padding-top: 3.5rem;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    li {
      color: white;
      line-height: 1.5;
      letter-spacing: 0.3rem;
      padding: 1.8rem 1rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;

const clickLogout = () => {
  console.log('로그아웃 했음. 토큰을 삭제하고 홈화면으로 페이지를 리로드.');
  MyAccount.logout();
};

const LeftNav = ({ open }) => {
  const { auth } = useSelector((state) => state);
  const { isLogin } = auth;
  return (
    <Ul open={open}>
      <li>
        {isLogin ? (
          <Link className="menu" to="/mypage">
            {isLogin ? MyAccount.nickname : 'Login'}
          </Link>
        ) : (
          <Link className="menu" to="/login">
            {isLogin ? MyAccount.nickname : 'Login'}
          </Link>
        )}
      </li>
      <li>
        {isLogin ? (
          <Link className="menu" to="/search">
            Write
          </Link>
        ) : (
          <Link className="menu" to="/login">
            Write
          </Link>
        )}
      </li>
      <li>
        {isLogin ? (
          <Link className="menu" to="/" onClick={clickLogout}>
            Logout
          </Link>
        ) : (
          ''
        )}
      </li>
    </Ul>
  );
};

export default LeftNav;
