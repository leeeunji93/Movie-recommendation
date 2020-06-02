import React, { Component } from "react";
import DiaryDataWrapper from "../../component/diaryData/DiaryDataWrapper";
import DiaryData from "../../component/diaryData/DiaryData";

class DiaryDataContainer extends Component {
  render() {
    return (
      <DiaryDataWrapper>
        <DiaryData />
      </DiaryDataWrapper>
    );
  }
}

export default DiaryDataContainer;
