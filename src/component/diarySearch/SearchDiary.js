import React, { Component } from "react";
import { APIs, NetTool } from "../../tool/NetTool";
import { MdDateRange } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import "./SearchDiary.css";

class SearchDiary extends Component {
  state = {
    tagsAll: [],
    selectedMovie: null,

    diaryData: {
      title: "",
      cover: "",
      notes: "",
      rating: "",
      tags: "",
      watchDate: "",
      createdAt: "0",
      modifiedAt: "0",
    },
  };

  componentDidMount() {
    //서버에서 모든 태그 종류들 가져온다.
    this.refreshTags();
  }

  //모든 태그들 가져온다.
  refreshTags() {
    NetTool.request(APIs.filmTags)
      .exec()
      .then((resultData) => {
        console.log("가져온 태그들 데이터 ", resultData);
        this.setState({ tagsAll: resultData });
      })
      .catch((error) => {
        alert(error);
      });
  }

  handleChangeDiaryData = (e) => {
    const { diaryData } = this.state;
    /*?*/
    diaryData[e.target.name] = e.target.value;
    this.setState({
      diaryData: diaryData,
    });
  };

  TagTypeItem = ({ tagTypeData }) => {
    const TagItem = ({ tag }) => {
      return <div className="TagItem">{tag}</div>;
    };

    return (
      <div>
        <h3>
          태그타입: {tagTypeData.tagType} - 태그 설명:
          {tagTypeData.tagTypeDesc}
        </h3>

        <div className="tags">
          {tagTypeData.tags.map((tag, index) => (
            <TagItem tag={tag} key={index} />
          ))}
        </div>
      </div>
    );
  };

  handlePlusRating = () => {
    const { diaryData } = this.state;
    const maxCore = 4;
    if (diaryData.rating > maxCore) {
      return;
    }
    this.setState({
      rating: ++diaryData.rating,
    });
  };

  handleMinusRating = () => {
    const { diaryData } = this.state;
    diaryData.rating = diaryData.rating - 1;
    this.setState({
      rating: diaryData.rating,
    });
  };

  handleSave = () => {
    const { selectedMovie, diaryData } = this.state;

    if (!selectedMovie) {
      alert("영화를 선택하세요");
      return;
    }
    if (diaryData.title.trim().length === 0) {
      alert("제목을 작성하세요");
      return;
    }
    const movieJson = JSON.stringify(selectedMovie);
    const diaryJson = JSON.stringify(diaryData);

    //저장한다.
    NetTool.request(APIs.filmDiarySave)
      .appendFormData("movieJson", movieJson) //필수 데이터
      .appendFormData("diaryJson", diaryJson) //필수 데이터
      .exec(true)
      .then((jsonData) => {
        alert("데이터 저장 성공");
        this.props.history.push("/diaryList");
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    const { diaryData, tagsAll } = this.state;
    return (
      <div>
        <div className="write">
          <h2>일기쓰기</h2>

          <div className="write_title">
            <input
              name="title"
              placeholder="일기 제목"
              onChange={this.handleChangeDiaryData}
              value={diaryData.title}
            />
          </div>
          <span className="write_date">
            <MdDateRange />
            <input
              name="watchDate"
              placeholder="날짜"
              onChange={this.handleChangeDiaryData}
              value={diaryData.watchDate}
            />
          </span>
          <span className="write_rating">
            <span onClick={this.handlePlusRating}>[+]</span>
            <span onClick={this.handleMinusRating}>[-]</span>
            {[...Array(diaryData.rating)].map((x, i) => (
              <span key={i}>
                <FaStar />️
              </span>
            ))}
          </span>
          <div className="write_tags">
            <h2>전체 태그 목록</h2>
            <input
              style={{ width: "600px" }}
              name="tags"
              value={diaryData.tags}
              onChange={this.onChangeDiaryData}
            />
            {tagsAll.map((tagTypeData, index) => (
              <this.TagTypeItem tagTypeData={tagTypeData} key={index} />
            ))}
          </div>
          <div className="write_content">
            <input
              name="notes"
              placeholder="일기 내용"
              onChange={this.handleChangeDiaryData}
              value={diaryData.notes}
            />
          </div>
          <div className="write_cover">
            <span>포스터 이미지 주소:</span>
            <input
              name="cover"
              placeholder="https://"
              onChange={this.handleChangeDiaryData}
              value={diaryData.cover}
            />
          </div>
          <button onClick={this.handleSave}>저장</button>
        </div>
      </div>
    );
  }
}

export default SearchDiary;
