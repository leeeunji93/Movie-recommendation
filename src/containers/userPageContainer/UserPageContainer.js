import React, { Component } from "react";
import { Login, Register, UserPageWrapper } from "../../component";

class UserPageContainer extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { onChangeLoginState } = this.props;
    return (
      <UserPageWrapper>
        <Login onChangeLoginState={onChangeLoginState} />
        <Register onChangeLoginState={onChangeLoginState} />
      </UserPageWrapper>
    );
  }
}

export default UserPageContainer;
