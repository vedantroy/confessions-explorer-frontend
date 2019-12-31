import React, { Component } from "react";
import moment from "moment";
import "./App.css";
import { Row, Col, Slider, DatePicker } from 'antd';
import styled from 'styled-components'
import { avenirNext, Caption, StyledSpan } from "./components/base/BaseComponents";
import SourceSearch from "./components/menu/SourceSearch";
import SourceDisplay from "./components/menu/SourceDisplay";
import TextSearch from './components/menu/TextSearch'
import PostFeed from "./components/PostFeed";
import NameTypeSelector from "./components/menu/NameType";
import NameSearch from "./components/menu/NameSearch";
const { RangePicker } = DatePicker

const SettingsHeader = styled.div`
  height: 64px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  line-height: 64px;
  text-align: center;
  vertical-align: middle;
  background: #141d24;
  ${avenirNext}
  color: #fff;
  font-size: 24px;
`
const SettingsPanel = styled.div`
  height: 50vh;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  background: #F1F3F8;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const HoverLink = styled(StyledSpan)`
  font-size: 13px;
  padding-top: 1vh;
  transition: 0.3s;
  &:hover {
    color: rgb(90, 46, 255);
  }
`

export default class App extends Component {

  state = {
    suggestions: ["MIT Summer Confessions"],
    sources: ["MIT Confessions"],
    timeRange: [moment([2013]), moment()],
    minReacts: 0,
    searchPhrase: "",
    nameFilter: "",
    commented: true,
    tagged: true,
  }

  render() {

    //Can syntax be simplified? E.g - { timeRange } instead of {timeRange: timeRange}?
    return (
      <Row style={{ height: "100%" }}>
        <Col span={10} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0px 15px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", maxWidth: "400px" }}>
            <SettingsHeader>Search</SettingsHeader>
            <SettingsPanel>
              <div>
                <Caption>Name</Caption>
                <div>
                  <NameSearch
                    onSubmit={name => {
                      this.setState({ nameFilter: name })
                    }}
                  />
                  <NameTypeSelector
                    /* don't change the commented/tagged keys in the state object unless you also
                    change the values that are passed into onChange in NameSearch */
                    onChange={type => {
                      this.setState({
                        [type]: !this.state[type]
                      })
                    }}
                  />
                </div>
              </div>
              <div>
                <Caption>Included Text</Caption>
                <TextSearch
                  onSubmit={value => {
                    this.setState({
                      searchPhrase: value
                    })
                  }}
                />
              </div>
              {/*
              <SourceSearch
                items={this.state.suggestions}
                onValueSelected={chosenValue => {
                  const newSuggestions = this.state.suggestions.filter(item => item !== chosenValue)
                  const newSources = this.state.sources.concat(chosenValue)
                  this.setState({
                    suggestions: newSuggestions,
                    sources: newSources,
                  })
                }}

              />
              <SourceDisplay
                sources={this.state.sources}
                onRemove={removedSource => {
                  this.setState({
                    suggestions: this.state.suggestions.concat(removedSource),
                    sources: this.state.sources.filter(source => source !== removedSource)
                  })
                }}
              />
              */}
              <div>
                <Caption>Date Range</Caption>
                <RangePicker
                  onChange={newTimeRange => {
                    this.setState({ timeRange: newTimeRange })
                  }}
                  defaultValue={this.state.timeRange}>
                </RangePicker>
              </div>
              <div>
                <Caption>Reactions</Caption>
                <Slider
                  max={1000}
                  defaultValue={this.state.minReacts}
                  onAfterChange={newMinReacts => {
                    if (this.state.minReacts !== newMinReacts) {
                      this.setState({ minReacts: newMinReacts })
                    }
                  }}
                />
              </div>
            </SettingsPanel>
          </div>
          <a
            href="http://hacklodge.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}>
            <HoverLink style={{ fontSize: '13px', paddingTop: '1vh' }}>Built at Hacklodge</HoverLink>
          </a>
        </Col>
        <Col span={14} style={{ height: "100%" }}>
          <PostFeed
            queryParams={(
              ({sources, suggestions, ...slimmedState}) => ({
                  ...slimmedState,
                  timeRange: JSON.stringify(slimmedState.timeRange.map(date => Math.trunc((date.valueOf() / 1000)))),
                  name: slimmedState.nameFilter
              }))(this.state)
            }
          />
        </Col>
      </Row >
    )
  }
}