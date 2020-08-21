import React, { Component } from 'react';
import { DiaryList } from '../../component';

class MainContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <DiaryList match={match} />
      </div>
    );
  }
}

export default MainContainer;
