import React from 'react'
import { Checkbox } from 'antd'
import { StyledSpan } from '../base/BaseComponents'

export default class NameTypeSelector extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', marginTop: '5px' }}>
                <Checkbox defaultChecked={true} onChange={_ => {
                    this.props.onChange('commented')
                }} />
                <StyledSpan>Commented</StyledSpan>
                <Checkbox defaultChecked={true} onChange={_ => {
                    this.props.onChange('tagged')
                }} />
                <StyledSpan>Tagged</StyledSpan>
            </div>
        )
    }

}
