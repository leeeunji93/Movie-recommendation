import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faPlus);


const InformationIcon = () => (
        <div>
            <Link to='/'>
                <FontAwesomeIcon icon={faHeart}/>
            </Link>
            <Link to='/'>
                <FontAwesomeIcon icon={faPlus}/>
            </Link>
        </div>
);

export default InformationIcon;
