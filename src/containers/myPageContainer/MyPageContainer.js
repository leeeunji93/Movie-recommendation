import React, { Component } from "react";
import {
  MyPageMainHeader,
  MyPageMainReviewAll,
  MyPageMainTag,
  MyPageWrapper,
} from "../../component";

class MyPageContainer extends Component {
  render() {
    const { isLogin } = this.props;
    return (
      <div>
        <MyPageWrapper>
          <MyPageMainHeader isLogin={isLogin} />
          <MyPageMainTag />
          <MyPageMainReviewAll />
        </MyPageWrapper>
      </div>
    );
  }
}

export default MyPageContainer;
