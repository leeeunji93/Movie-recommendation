import React, { Component } from 'react';
import MainPageWrapper from '../../component/MainPage/MainPageWrapper/MainPageWrapper';
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
