import React from 'react'
import { StyledInput, menuShadow } from '../base/BaseComponents'
import styled from 'styled-components'

const MaterializedStyledInput = styled(StyledInput)`
    ${menuShadow}
`

export default class TextSearch extends React.Component {
    render() {
        return (
            <MaterializedStyledInput
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
