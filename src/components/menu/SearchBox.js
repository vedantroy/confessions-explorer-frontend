import React from "react";
import { ShadowSearchbox } from "./../BaseComponents";

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.submitEvent = e => props.onSubmit(e.target.value);
  }

  render() {
    return (
      <ShadowSearchbox
        ref={ref => (this.inputElement = ref)}
        onKeyPress={this.onKeyPress}
        onBlur={this.submitEvent}
        defaultValue={this.props.defaultValue}
      />
    );
  }

  onKeyPress = e => {
    if (e.nativeEvent.charCode === 13) {
      this.submitEvent(e);
    }
  };
}
