import React, { Component } from 'react';
import { MyPage } from '../../component';

class MyPageContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <MyPage match={match} />
      </div>
    );
  }
}

export default MyPageContainer;
