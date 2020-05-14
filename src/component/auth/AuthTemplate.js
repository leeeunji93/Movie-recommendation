import React from "react";
import './AuthTemplate.css'


const AuthTemplate = ({children}) => {
    return(
        /*children으로 받아온 내용을 보여주기만 함 */
        <div className='auth_wrapper'>
            <div className='auth_wrapper_box'>
            {children}
            </div>
        </div>
    );
};

export default AuthTemplate;