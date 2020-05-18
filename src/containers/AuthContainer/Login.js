import React from "react";
import { AuthWrapper } from "../../component";
import Auth from "../../component/auth/Auth";

const Login = () => {
  return (
    <AuthWrapper>
      <Auth type="login" />
    </AuthWrapper>
  );
};

export default Login;
