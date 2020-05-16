import React, { Component } from "react";
import {
  MyPageMainHeader,
  MyPageMainReviewAll,
  MyPageMainTag,
  MyPageWrapper,
} from "../../component";

class MyPageContainer extends Component {
  render() {
    return (
      <div>
        <MyPageWrapper>
          <MyPageMainHeader />
          <MyPageMainTag />
          <MyPageMainReviewAll />
        </MyPageWrapper>
      </div>
    );
  }
}

export default MyPageContainer;
