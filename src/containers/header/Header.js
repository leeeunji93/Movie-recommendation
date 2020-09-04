import React from 'react';
import { Link } from 'react-router-dom';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import './header.scss';

import Navbar from '../header/Navbar';

const Header = () => {
  return (
    <div className="header_wrapper">
      <section className="header_zip">
        <Navbar />
        <h1 className="header_logo">
          <Link to="/">Suddenly</Link>
        </h1>

        <div className="header_search">
          <Link to="/notesearch">
            <SearchRoundedIcon className="icon" fontSize="large" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Header;
