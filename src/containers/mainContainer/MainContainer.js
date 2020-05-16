import React, { Component } from 'react';
import MainPageWrapper from '../../component/mainPage/mainPageWrapper/MainPageWrapper';
// eslint-disable-next-line import/no-cycle
import { DropdownList, Post } from '../../component';

class MainContainer extends Component {
  render() {
    return (
            <div>
                <MainPageWrapper>
                    <DropdownList/>
                    <Post/>
                </MainPageWrapper>
            </div>
    );
  }
}

export default MainContainer;
