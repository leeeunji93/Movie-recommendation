import React, { Component } from "react";
import DiaryData from "../../component/diaryData/DiaryData";

class DiaryDataContainer extends Component {
  render() {
    const { match } = this.props;
    return <DiaryData match={match} />;
  }
}

export default DiaryDataContainer;
