import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome,faEdit,faHeart,faUserCircle } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faHome,faEdit);




class Header extends Component {
    render() {
        return (
            <div className= 'Header'>
                <Link
                    className='header_home'
                    to='/Main'>
                    <FontAwesomeIcon icon={faHome}/>
                    Home
                </Link>
                <Link
                    className='header_write'
                    to='/Main'>
                    <FontAwesomeIcon icon={faEdit}/>
                    Write
                </Link>
                <Link
                    className='header_myPage'
                     to='/Main'>
                    <FontAwesomeIcon icon={faHeart}/>
                    MyPage
                </Link>
                <Link
                    className='header_login'
                    to='/Main'>
                    <FontAwesomeIcon icon={faUserCircle}/>
                    Login
                </Link>


            </div>
        );
    }
}

export default Header;