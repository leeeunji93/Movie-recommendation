import React, { Component } from 'react';
import {Diary, InformationIcon, PosterResultWrapper} from '../../component';


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
