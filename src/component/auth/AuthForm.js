import React from "react";
import './AuthForm.css'
import {Link} from "react-router-dom";


const textMap = {
    login: '로그인',
    register: '회원가입',
};


const AuthForm = ({type}) => {
    const text = textMap[type];
    return (
        <div className='authform_wrapper'>
            <h3>{text}</h3>

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
                {type === 'register' && (
                    <input
                        className='auth_passwordConfirm'
                        name='passwordConfirm'
                        placeholder='비밀번호를 확인하세요'
                    />
                )}
                <br/>
                <br/>
                <button>로그인하기</button>
            </form>
            <footer>
                {type === 'login' ? (
                    <Link to='/RegisterPage'>회원가입</Link>
                ) : (
                    <Link to='/Login'>로그인</Link>
                )}
            </footer>
        </div>
    );
};

export default AuthForm;