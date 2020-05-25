import React, { Component } from "react";
import { APIs, NetTool } from "../../tool/NetTool";
import { MdStarBorder, MdDateRange } from "react-icons/md";

class SearchDiary extends Component {
  state = {
    tagsAll: [],

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
          {/* {/!*여기 이름을 바꾸려면 어떻게 해야 하나요?*!/}*/}
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
            <MdStarBorder />
            <input
              name="rating"
              placeholder="별점"
              onChange={this.handleChangeDiaryData}
              value={diaryData.rating}
            />
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
        </div>
      </div>
    );
  }
}

export default SearchDiary;
