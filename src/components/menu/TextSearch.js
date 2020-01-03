import React from "react";
import { ShadowSearchbox } from "./../BaseComponents";

export default class TextSearch extends React.Component {
  render() {
    return (
      <ShadowSearchbox
        /*
        ref={ref => (this.inputElement = ref)}
        // TODO: Use debouncer, to refresh query after certain amount of time OR enter key press
        onKeyPress={this.onKeyPress}
        defaultValue={this.props.defaultValue}
        */
       {...this.props}
      />
    );
  }

  /*
  onKeyPress = e => {
    if (e.nativeEvent.charCode === 13) {
      this.props.onSubmit(this.inputElement.value);
    }
  };
  */
}
