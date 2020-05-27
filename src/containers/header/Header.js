import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyAccount from "../../tool/MyAccount";
import { FaSearch, FaEdit, FaHeart, FaUserCircle } from "react-icons/fa";
import "./header.scss";

class Header extends Component {
  state = {
    search: "",
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { search } = this.state;
    const { isLogin } = this.props;
    return (
      <div className="Header">
        <div className="header_top">
          <Link to="/" className="header_name">
            사이트 이름
          </Link>
          <div className="header_search">
            <input
              placeholder="영화 제목, 아이디"
              onChange={this.handleChange}
              value={search}
            />
            <Link className="header_search_icon" to="/PosterResultContainer">
              <FaSearch />
            </Link>
          </div>
          <div className="header_menu">
            <Link className="header_write" to="/SearchMovieContainer">
              <FaEdit />
              <span>Write</span>
            </Link>
            <Link className="header_myPage" to="/MyPageContainer">
              <FaHeart />
              <span>MyPage</span>
            </Link>
            <Link className="header_login" to="/Login">
              <FaUserCircle />
              {isLogin ? MyAccount.nickname : "Login"}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
