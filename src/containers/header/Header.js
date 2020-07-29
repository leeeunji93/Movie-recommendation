import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyAccount from '../../tool/MyAccount';
import { NetTool, APIs } from '../../tool/NetTool';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import './header.scss';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../reducers/auth';
import * as actions from '../../reducers/headerSearch';

const Header = () => {
  const { auth } = useSelector((state) => state);
  const { isLogin } = auth;
  const { headerSearch } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { keyword, searchArr } = headerSearch.search;

  // const [keyword,setKeyword] = useState('');
  // const [searchArr,setSearchArr] = useState();

  const clickLogout = () => {
    console.log('로그아웃 했음. 토큰을 삭제하고 홈화면으로 페이지를 리로드.');
    MyAccount.logout();
  };

  const handleChange = (e) => {
    console.log('searh중..', e.target.value);
    dispatch(
      actions.setHeaderSearch({
        key: e.target.name,
        value: e.target.value,
      }),
    );
  };

  const clickSearch = () => {
    NetTool.request(APIs.filmDiarySearch)
      .appendFormData('keyword', keyword)
      .exec(true)
      .then((resultData) => {
        console.log('search결과', resultData);
        dispatch(
          actions.setHeaderSearch({
            key: 'searchArr',
            //이것만 배열로 보이게 나옴
            value: resultData,
          }),
        );
      });
  };

  return (
    <div className="header_full">
      <div className="header_wrapper">
        <div className="header_logo">
          <h1 className="header_logo_title">
            <Link to="/">Suddenly</Link>
          </h1>
        </div>
        <div className="header_menu">
          <form className="search">
            <input
              name="keyword"
              placeholder="영화 노트  "
              onChange={handleChange}
              value={keyword}
            />
            <Link onClick={clickSearch} className="menu" to="/headersearch">
              <SearchRoundedIcon className="icon" />
            </Link>
          </form>
          <div className="list">
            {isLogin ? (
              <Link className="menu" to="/search">
                <EditRoundedIcon className="icon" />
                <div className="text"> Write</div>
              </Link>
            ) : (
              <Link className="menu" to="/login">
                <EditRoundedIcon className="icon" />
                <div className="text">Write</div>
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
              <Link className="menu" to="/" onClick={clickLogout}>
                <ExitToAppIcon className="icon" />
                <div className="text">Logout</div>
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
