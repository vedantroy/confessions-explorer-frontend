import React from 'react'
import { ShadowSearchbox } from '../base/BaseComponents'


export default class TextSearch extends React.Component {
    render() {
        return (
            <ShadowSearchbox
                ref={ref => this.inputElement = ref}
                // TODO: Use debouncer, to refresh query after certain amount of time OR enter key press
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
