import React, { Component } from 'react';
import { MyPage } from '../../component';

class MyPageContainer extends Component {
  render() {
    const { isLogin } = this.props;
    return (
      <div>
        <MyPage isLogin={isLogin} />
      </div>
    );
  }
}

export default MyPageContainer;
