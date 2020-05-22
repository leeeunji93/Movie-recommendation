import React from "react";
import { AuthWrapper } from "../../component";
import Auth from "../../component/auth/Auth";

const Register = () => {
  return (
    <AuthWrapper>
      <Auth type="register" />
    </AuthWrapper>
  );
};

export default Register;

/*
import React from 'react'
import { Button } from '@material-ui/core'
import { NetTool, APIs } from '../tools/NetTool';
import AppManager from '../tools/AppManager'
import MyAccount from '../tools/MyAccount';
import MyRouter from '../tools/MyRouter';
import UnderlineTitle from '../comps/UnderlineTitle'
import '../styles/Sign.scss'
import MetaHelmet from '../comps/MetaHelmet';

const SIGN_TYPE_LOGIN = 0;
const SIGN_TYPE_FINDPASS = 1;
const SIGN_TYPE_JOIN = 2;


// const styles = theme => ({
//   formControl: {
//     margin: '8px 0',
//     minWidth: 90
//   }
// })

class Sign extends React.Component {
    constructor(props) {
        super(props)

        const sp = new URLSearchParams(window.location.search)
        const email = sp.get('email') ? sp.get('email') : ''
        this.state = {signType: SIGN_TYPE_LOGIN, email: email, pwd: ''}
        this.mTitle = null;
    }



    onChangeText = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    clickFindPassMode = () => {
        this.setState({signType: SIGN_TYPE_FINDPASS})
    }

    clickLoginMode = () => {
        this.setState({signType: SIGN_TYPE_LOGIN})
    }

    clickJoinMode = () => {
        this.setState({signType: SIGN_TYPE_JOIN})
    }




    clickButton = (event) => {
        event.preventDefault()
        const email = this.state.email.trim()
        const pwd = this.state.pwd.trim()

        // const alert

        //이메일 Validate
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,9})+$/
        if(!regex.test(email)) {
            AppManager.alertDialog.show(this.mTitle, '올바른 이메일 주소를 입력해 주세요')
            return;
        }

        if(this.state.signType === SIGN_TYPE_LOGIN) {
            this.reqLogin(email, pwd)
        }
        else if(this.state.signType === SIGN_TYPE_FINDPASS) {
            this.reqFindPass(email)
        }
        else if(this.state.signType === SIGN_TYPE_JOIN) {
            this.reqJoin(email)
        }
    }

    reqLogin(email, pwd) {
        NetTool.request(APIs.userLogin)
            .appendFormData('email', email)
            .appendFormData('pwd', pwd)
            .exec()
            .then((jsonData) => {
                MyAccount.updateMyAccount(jsonData)
                // AppManager.header.
                console.log(MyRouter.history)
                MyRouter.goBack()


                // MyRouter.startPage('/');
            })
            .catch(error => {
                if(error === 'UserNotFound') {
                    AppManager.alertDialog.show(this.mTitle, '사용자를 찾을 수 없습니다. 계정 이메일 주소를 확인해 주세요.')
                    return;
                }
                else if(error === 'InvalidPassword')  {
                    AppManager.alertDialog.show(this.mTitle, '비밀번호가 틀립니다')
                    return
                }
                else {
                    alert(error);
                }
            })
    }

    reqFindPass(email) {
        NetTool.request(APIs.userFindPass)
            .appendFormData('email', email)
            .exec(true)
            .then((jsonData) => {
                AppManager.alertDialog.show(this.mTitle, '입력하신 이메일로 비밀번호 변경 URL을 보내드렸습니다.\n받은 편지함을 확인해 주세요.')
                this.setState({signType: SIGN_TYPE_LOGIN, pwd: ''})
            })
            .catch((error) => {
                if(error === 'UserNotFound') {
                    AppManager.alertDialog.show(this.mTitle, '등록된 사용자가 아닙니다. 계정 이메일 주소를 확인해 주세요.')
                }else{
                    alert(error);
                }
            })
    }

    reqJoin(email) {
        NetTool.request(APIs.userInviteRequest)
            .appendFormData('email', email)
            .exec(true)
            .then((jsonData) => {
                AppManager.alertDialog.show('회원 가입', '회원 가입 안내 이메일을 발송했습니다.\n이메일을 확인하여 회원가입을 마무리 하세요\n'+email)
                this.setState({signType: SIGN_TYPE_LOGIN, pwd:''})
            })
            .catch((error) => {
                if(error === 'Member') {
                    AppManager.alertDialog.show('회원 가입', '이미 알지넷 회원입니다.');
                    return;
                }
                alert(error)
            })
    }




    onKeyPressed = (event) => {
        if(event.keyCode === 13){
            //엔터 키 눌렀다.
            this.clickButton(event)
        }
    }



    render() {
        // const {classes} = this.props;
        if(this.state.signType === SIGN_TYPE_FINDPASS) {
            this.mTitle = '비밀번호 찾기'
        }
        else if(this.state.signType === SIGN_TYPE_JOIN) {
            this.mTitle ='회원 가입'
        }
        else {
            this.mTitle = '로그인'
        }

        const isLoginMode = this.state.signType === SIGN_TYPE_LOGIN

        return (
            <div className="Sign header-margin">

                <MetaHelmet />

                <form className="shadow-box" >
                    <UnderlineTitle title={this.mTitle} />

                    <div className="wrap-input">
                        <input autoFocus onKeyDown={this.onKeyPressed} name="email" placeholder="이메일 주소 *" type="email" value={this.state.email} onChange={this.onChangeText}  />
                    </div>


                    {this.state.signType !== SIGN_TYPE_JOIN &&
                    <div className="wrap-input">
                        <input name="pwd" type="password" placeholder="비밀번호 *" onKeyDown={this.onKeyPressed} value={this.state.pwd} onChange={this.onChangeText}  />
                    </div>
                    }

                    {/!* {!this.state.isFindPass &&
            <div style={{textAlign:'center'}}>
              <FormControlLabel
                control={
                  <Switch color="secondary" checked={this.state.isBrowserRemember} onChange={this.handleChangeIsRemember} />
                }
                label="로그인 유지하기"
              />
            </div>
          } *!/}

                    <Button className="btn-black" variant="contained" fullWidth color="primary" onClick={this.clickButton} >{this.mTitle}</Button>

                    {/!* <button className="btn-black" onClick={this.clickButton}>{this.mTitle}</button> *!/}
                    <div className="wrap-join-find row-margin">

                        {isLoginMode && <Button onClick={this.clickJoinMode} >회원가입</Button>}
                        {isLoginMode && <Button onClick={this.clickFindPassMode}>비밀번호 찾기</Button>}
                        {!isLoginMode && <Button onClick={this.clickLoginMode} >이메일로 로그인</Button>}
                    </div>

                </form>


            </div>
        )
    }

}

export default Sign*/
