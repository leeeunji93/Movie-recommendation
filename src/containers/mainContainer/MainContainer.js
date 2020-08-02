import React, { Component } from 'react';
// eslint-disable-next-line import/no-cycle
import { DiaryList, DropdownList } from '../../component';

class MainContainer extends Component {
  render() {
    return (
      <div>
        <DiaryList />
      </div>
    );
  }
}

export default MainContainer;
