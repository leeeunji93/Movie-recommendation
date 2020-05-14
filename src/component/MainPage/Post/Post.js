import React from "react";
import poster1 from "./왕남.jpeg"
import {Link} from "react-router-dom";

const Post = () => (
    <div>
        <Link to='/PosterResultContainer'>
        <img src={poster1} alt='왕의남자'/>
        </Link>
    </div>
)

export default Post;










