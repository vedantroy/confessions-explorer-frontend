import React, { Component, Fragment } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";
import Media from "react-media";
import "./App.css";
import { Row, Col } from "antd";
import styled from "styled-components";
import { DIN_FONT, PURPLE_VALUE } from "./components/BaseComponents";
import PostFeed from "./components/PostFeed";
import SettingsMenu from "./components/menu/SettingsMenu";

Modal.setAppElement("#root");
Modal.defaultStyles.content = {
  position: "absolute",
  top: "40px",
  left: "40px",
  right: "40px",
  bottom: "40px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around"
};

const StyledButton = styled.div`
    color: #fff;
    text-align: center;
    cursor: pointer;
    line-height: 35px;
    height: 35px;
    border-radius: 6px;
    padding: 0 20px;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    background: #f5222d;
    text-transform: uppercase;
    font-weight: bold;
    ${DIN_FONT}
    background: ${PURPLE_VALUE}
    width: 120px;
    box-shadow: rgba(193, 213, 224, 0.35) 0px 0px 40px;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 40px rgba(193, 213, 224, 0.75);
    }
  }
`;

export default class App extends Component {
  state = {
    //suggestions: ["MIT Summer Confessions"],
    //sources: ["MIT Confessions"],
    timeRange: [dayjs(new Date("2013", "00", "01")), dayjs()],
    minReacts: 0,
    searchPhrase: "",
    nameFilter: "",
    commented: true,
    tagged: true,
    modalOpen: false
  };

  render() {
    const SettingsInstance = (
      <SettingsMenu
        name={this.state.nameFilter}
        onNameChange={name => {
          this.setState({ nameFilter: name });
        }}
        onNameTypeChange={type => {
          this.setState({
            [type]: !this.state[type]
          });
        }}
        includeCommenters={this.state.commented}
        includeTagged={this.state.tagged}
        searchPhrase={this.state.searchPhrase}
        onSearchPhraseChange={value => {
          this.setState({
            searchPhrase: value
          });
        }}
        timeRange={this.state.timeRange}
        onTimeRangeChange={newTimeRange => {
          this.setState({ timeRange: newTimeRange });
        }}
        minReacts={this.state.minReacts}
        onReactsChange={newMinReacts => {
          if (this.state.minReacts !== newMinReacts) {
            this.setState({ minReacts: newMinReacts });
          }
        }}
      />
    );

    const PostFeedInstance = (
      <PostFeed
        style={{
          height: "100%",
          overflow: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "20px"
        }}
        // Be sure to ignore ALL values in state that aren't necessary for query params.
        // Otherwise, there will be unecessary re-renders/API requests
        queryParams={(({
          sources,
          suggestions,
          modalOpen,
          ...slimmedState
        }) => ({
          ...slimmedState,
          timeRange: JSON.stringify(
            slimmedState.timeRange.map(date =>
              Math.trunc(date.valueOf() / 1000)
            )
          ),
          name: slimmedState.nameFilter
        }))(this.state)}
      ></PostFeed>
    );

    return (
      <Media
        queries={{
          small: { maxWidth: 549 }
        }}
      >
        {matches =>
          matches.small ? (
            <Fragment>
              <a
                style={{
                  textDecoration: "none",
                  position: "fixed",
                  top: "15px",
                  left: "15px",
                  zIndex: "2",
                  userSelect: "none"
                }}
                onClick={() => {
                  this.setState({
                    modalOpen: !this.state.modalOpen
                  });
                }}
              >
                <StyledButton>Search</StyledButton>
              </a>
              <Modal isOpen={this.state.modalOpen}>{SettingsInstance}</Modal>
              {PostFeedInstance}
            </Fragment>
          ) : (
            <Row style={{ height: "100%" }}>
              <Col
                span={10}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px 15px"
                }}
              >
                {SettingsInstance}
              </Col>
              <Col span={14} style={{ height: "100%" }}>
                {PostFeedInstance}
              </Col>
            </Row>
          )
        }
      </Media>
    );
  }
}
