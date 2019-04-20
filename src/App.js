import React, { Component } from "react";
import { arraysDifferent } from "./utils/utils"
import moment from "moment";
import "./App.css";
import { Row, Col, Slider, DatePicker } from 'antd';
import styled from 'styled-components'
import { avenirNext, Caption } from "./components/base/BaseComponents";
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

export default class App extends Component {

  defaultSuggestions = ["MIT Summer Confessions"]
  defaultSources = ["MIT Confessions"]
  defaultTextFilter = ""
  defaultMinReacts = 20
  defaultTimeRange = [moment().subtract(2, "years"), moment()]
  defaultCommented = true
  defaultTagged = true

  state = {
    suggestions: this.defaultSuggestions,
    sources: this.defaultSources,
    timeRange: this.defaultTimeRange,
    minReacts: this.defaultMinReacts,
    textFilter: this.defaultTextFilter,
    commented: this.defaultCommented,
    tagged: this.defaultTagged,
    //queryParams: this.queryParams
  }

  updateQueryParams() {
    this.setState({
      queryParams: this.queryParams
    })
  }

  get queryParams() {
    if (this.state === undefined) {
      return {
        sources: JSON.stringify(this.defaultSources),
        timeRange: this.defaultTimeRange.map(date => date.valueOf()),
        minReacts: this.defaultMinReacts,
        textFilter: this.defaultTextFilter,
        commented: this.defaultCommented,
        tagged: this.defaultTagged
      }
    }
    return {
      sources: JSON.stringify(this.state.sources),
      timeRange: this.state.timeRange.map(date => date.valueOf()),
      minReacts: this.state.minReacts,
      textFilter: this.state.textFilter,
      commented: this.state.commented,
      tagged: this.state.tagged
    }
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
                  <NameSearch />
                  <NameTypeSelector
                    /* don't change the commented/tagged keys in the state object unless you also
                    change the values that are passed into onChange in NameSearch */
                    onChange={type => {
                      this.setState({
                        [type]: !this.state[type]
                      }, () => {
                        console.log(this.state[type])
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
                      textFilter: value
                    }, this.updateQueryParams)
                  }}
                />
              </div>
              <SourceSearch
                items={this.state.suggestions}
                onValueSelected={chosenValue => {
                  const newSuggestions = this.state.suggestions.filter(item => item !== chosenValue)
                  const newSources = this.state.sources.concat(chosenValue)
                  this.setState({
                    suggestions: newSuggestions,
                    sources: newSources,
                  }, this.updateQueryParams)
                }}

              />
              <SourceDisplay
                sources={this.state.sources}
                onRemove={removedSource => {
                  this.setState({
                    suggestions: this.state.suggestions.concat(removedSource),
                    sources: this.state.sources.filter(source => source !== removedSource)
                  }, this.updateQueryParams)
                }}
              />
              <div>
                <Caption>Date Range</Caption>
                <RangePicker
                  onChange={newTimeRange => {
                    this.setState({ timeRange: newTimeRange }, this.updateQueryParams)

                  }}
                  defaultValue={this.defaultTimeRange}>
                </RangePicker>
              </div>
              <div>
                <Caption>Reactions</Caption>
                <Slider
                  defaultValue={this.defaultMinReacts}
                  onAfterChange={newMinReacts => {
                    if (this.state.minReacts !== newMinReacts) {
                      this.setState({ minReacts: newMinReacts }, this.updateQueryParams)
                    }
                  }}
                />
              </div>
            </SettingsPanel>
          </div>
        </Col>
        <Col span={14} style={{ height: "100%" }}>
          <PostFeed
            queryParams={{ sources, timeRange, minReacts, textFilter, commented, tagged }}
          />
        </Col>
      </Row >
    )
  }
}