import React from 'react'
import { ShadowSearchbox } from '../base/BaseComponents'

export default class NameSearch extends React.Component {


    render() {
        return (
            <ShadowSearchbox
                ref={ref => this.inputElement = ref}
                onKeyPress={this.onKeyPress}
            />
        )
    }

    onKeyPress = e => {
        if (e.nativeEvent.charCode === 13) {
            this.props.onSubmit(this.inputElement.value)
        }
    }
}
