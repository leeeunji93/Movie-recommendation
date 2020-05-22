import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faEdit,
  faHeart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";

library.add(fab, faSearch, faEdit);

/*const Header = () => {
  const [search, setSerch] = useState("");
};*/
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
    const { search, isLogin } = this.state;
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
              <FontAwesomeIcon
                icon={faSearch}
                className="header_icon"
                type="submit"
              />
            </Link>
          </div>
          <div className="header_menu">
            <Link className="header_write" to="/SearchMovieContainer">
              <FontAwesomeIcon className="header_icon" icon={faEdit} />
              <span>Write</span>
            </Link>
            <Link className="header_myPage" to="/MyPageContainer">
              <FontAwesomeIcon className="header_icon" icon={faHeart} />
              <span>MyPage</span>
            </Link>
            <Link className="header_login" to="/Login">
              <FontAwesomeIcon className="header_icon" icon={faUserCircle} />
              {isLogin ? "닉네임" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
