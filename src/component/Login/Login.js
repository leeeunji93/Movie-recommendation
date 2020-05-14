import React from "react"
import AuthTemplate from "../auth/AuthTemplate";
import AuthForm from "../auth/AuthForm";


const Login = () => {
    return (
        <AuthTemplate>
            <AuthForm type='login'/>
        </AuthTemplate>
    )
}

export default Login;

