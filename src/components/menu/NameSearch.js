import React from "react";
import { ShadowSearchbox } from "./../BaseComponents";

export default class NameSearch extends React.Component {
  render() {
    return (
      <ShadowSearchbox
        /* ref={ref => (this.inputElement = ref)} */
        /* onKeyPress={this.onKeyPress} */
        /* defaultValue={this.props.defaultValue} */
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
