import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome,faEdit,faHeart,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {MainContainer} from "../../containers";

library.add(fab, faHome,faEdit);




class Header extends Component {
    render() {
        return (
            <div className= 'Header'>
                <Link
                    className='header_home'
                    to='/MainContainer'>
                    <FontAwesomeIcon icon={faHome}/>
                    Home
                </Link>
                <Link
                    className='header_write'
                    to='/Post'>
                    <FontAwesomeIcon icon={faEdit}/>
                    Write
                </Link>
                <Link
                    className='header_myPage'
                     to='/Post'>
                    <FontAwesomeIcon icon={faHeart}/>
                    MyPage
                </Link>
                <Link
                    className='header_login'
                    to='/Post'>
                    <FontAwesomeIcon icon={faUserCircle}/>
                    Login
                </Link>


            </div>
        );
    }
}

export default Header;