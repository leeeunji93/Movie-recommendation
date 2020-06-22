import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyAccount from '../../tool/MyAccount';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './header.scss';
import { useSelector } from 'react-redux';
import * as actions from '../../reducers/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = () => {
  const [search, setSearch] = useState('');
  const { auth } = useSelector((state) => state);
  const { isLogin } = auth;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const clickLogout = () => {
    console.log('로그아웃 했음. 토큰을 삭제하고 홈화면으로 페이지를 리로드.');
    MyAccount.logout();
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <Link to="/">Fogos</Link>
      </div>
      <div className="menu_wrapper">
        <form className="search">
          <input
            placeholder="영화 검색"
            onChange={handleChange}
            value={search}
          />
          <SearchRoundedIcon />
        </form>

        <div className="list">
          {isLogin ? (
            <Link className="menu" to="/SearchMovieContainer">
              <EditRoundedIcon className="icon" />
              <div>Write</div>
            </Link>
          ) : (
            <Link className="menu" to="/login">
              <EditRoundedIcon className="icon" />
              <div className="">Write</div>
            </Link>
          )}

          {isLogin ? (
            <Link className="menu" to="/mypage">
              {' '}
              <AccountCircleRoundedIcon className="icon" />
              <div className="text">
                {isLogin ? MyAccount.nickname : 'Login'}
              </div>
            </Link>
          ) : (
            <Link className="menu" to="/login">
              <AccountCircleRoundedIcon className="icon" />
              <div className="text">
                {isLogin ? MyAccount.nickname : 'Login'}
              </div>
            </Link>
          )}

          {isLogin ? (
            <div className="menu logout">
              <button onClick={clickLogout}>
                <ExitToAppIcon />
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
