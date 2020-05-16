import React from "react";
import poster1 from "./왕남.jpeg"
import {Link} from "react-router-dom";
import './Post.css'

const Post = () => (
    <div className='PosterWrapper'>
        <Link
            to='/PosterResultContainer'
            className='posterZIP'
        >
        <img
            className='poster_1'
            src={poster1}
            alt='왕의남자'/>
        <img
            className='poster_2'
            src={poster1}
            alt='왕의남자'/>
        <img
            className='poster_3'
            src={poster1}
            alt='왕의남자'/>
        <img
            className='poster_4'
            src={poster1}
            alt='왕의남자'/>
        <img
            className='poster_5'
            src={poster1}
            alt='왕의남자'/>
        <img
            className='poster_6'
            src={poster1}
            alt='왕의남자'/>
        </Link>
    </div>
)

export default Post;










