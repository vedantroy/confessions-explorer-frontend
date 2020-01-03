import styled from "styled-components";
import React from "react";
import { DatePicker, Slider } from "antd";
import {
  avenirNext,
  Caption,
  StyledSpan
} from "./../BaseComponents";
import TextSearch from "./TextSearch";
import NameTypeSelector from "./NameType";
import NameSearch from "./NameSearch";
const { RangePicker } = DatePicker;

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
`;
const SettingsPanel = styled.div`
  height: 50vh;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  background: #f1f3f8;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

// Styling for Hacklodge link
const HoverLink = styled(StyledSpan)`
  font-size: 13px;
  padding-top: 1vh;
  transition: 0.3s;
  &:hover {
    color: rgb(90, 46, 255);
  }
`;

const SettingsMenu = ({
  name,
  onNameChange,
  onNameTypeChange,
  includeCommenters,
  includeTagged,
  searchPhrase,
  onSearchPhraseChange,
  timeRange,
  onTimeRangeChange,
  minReacts,
  onReactsChange
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      maxWidth: "400px"
    }}
  >
    <SettingsHeader>Search</SettingsHeader>
    <SettingsPanel>
      <div>
        <Caption>Name (Enter to Submit)</Caption>
        <div>
          <NameSearch defaultValue={name} onSubmit={onNameChange} />
          <NameTypeSelector
            includeCommenters={includeCommenters}
            includeTagged={includeTagged}
            onChange={onNameTypeChange}
          />
        </div>
      </div>
      <div>
        <Caption>Included Text (Enter to Submit)</Caption>
        <TextSearch
          defaultValue={searchPhrase}
          onSubmit={onSearchPhraseChange}
        />
      </div>
      <div>
        <Caption>Date Range</Caption>
        <RangePicker
          onChange={onTimeRangeChange}
          defaultValue={timeRange}
        ></RangePicker>
      </div>
      <div>
        <Caption>Reactions</Caption>
        <Slider
          max={1000}
          defaultValue={minReacts}
          onAfterChange={onReactsChange}
        />
      </div>
    </SettingsPanel>
  </div>
);

export default SettingsMenu;
