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

  state = {
    suggestions: this.defaultSuggestions,
    sources: this.defaultSources,
    timeRange: this.defaultTimeRange,
    minReacts: this.defaultMinReacts,
    textFilter: this.defaultTextFilter,
    queryParams: this.queryParams
  }

  DEBUG_compareState(state1, state2) {
    if (state1.minReacts !== state2.minReacts) {
      console.log("minReacts unequal")
    }
    if (arraysDifferent(state1.sources, state2.sources)) {
      console.log("sources unequal")
    }
    if (arraysDifferent(state1.timeRange, state2.timeRange)) {
      console.log("time range unequal")
    }
    if (state1.textFilter !== state2.textFilter) {
      console.log("text filter unequal")
    }
    if (state1.queryParams !== state2.queryParams) {
      console.log("query params unequal")
    }
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
      }
    }
    return {
      sources: JSON.stringify(this.state.sources),
      timeRange: this.state.timeRange.map(date => date.valueOf()),
      minReacts: this.state.minReacts,
      textFilter: this.state.textFilter,
    }
  }

  render() {
    //TODO - implement basic caching
    //TODO - in production, remove index b/c can just use FB Id for key
    //TODO - this is SUPER SUPER SUPER slow because everytime a setting  is changed,
    //this map function is called (often, hundreds of times)

    /*
    let listItems = this.state.confessions.map((confession, index) =>
      (
        < Confession
          key={confession.fb_id}
          source={confession.group}
          date={confession.time}
          reacts={confession.reacts.Total}
          body={confession.text}
          confessionId={confession.fb_id} />
      )
    )
    */

    //Can syntax be simplified? E.g - { timeRange } instead of {timeRange: timeRange}?
    return (
      <Row style={{ height: "100%" }}>
        <Col span={10} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0px 15px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", maxWidth: "400px" }}>
            <SettingsHeader>Search</SettingsHeader>
            <SettingsPanel>
              <div>
                <Caption>Text Search</Caption>
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
            queryParams={this.state.queryParams}
          />
        </Col>
      </Row>
    )
  }
}

/*
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadPosts.bind(this)}
            hasMore={this.state.loadMorePosts}
            loader={<div>Loading....</div>}
            useWindow={true}
          >
            {listItems}
          </InfiniteScroll>
*/
