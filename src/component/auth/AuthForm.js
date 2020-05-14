import React from "react";
import './AuthForm.css'
import {Link} from "react-router-dom";
import AuthTemplate from "./AuthTemplate";






const AuthForm = () => {
    return (
        <div className='authform_wrapper'>
         <h3>로그인</h3>
            <form className='auth_form'>
                <input
                    className='auth_id'
                    name='username'
                    placeholder='아이디를 입력하세요'
                />
                <br/>
                <input
                    className='auth_password'
                    name='password'
                    placeholder='비밀번호를 입력하세요'
                />
                <br/>
                <br/>
                <button>로그인하기</button>
            </form>
            <footer>
                <Link to='/RegisterPage'>회원가입</Link>
            </footer>
        </div>
    );
};

export default AuthForm;