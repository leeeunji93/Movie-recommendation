import React, { Component } from 'react';
import PosterResultWrapper from '../../component/PosterResult/PosterResultWrapper/PosterResultWrapper';
// eslint-disable-next-line import/no-cycle
import { Diary, InformationIcon } from '../../component';


class PosterResultContainer extends Component {
  render() {
    return (
            <PosterResultWrapper>
                <InformationIcon/>
                <Diary/>
            </PosterResultWrapper>
    );
  }
}

export default PosterResultContainer;
