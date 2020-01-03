import React from 'react'
import { Checkbox } from 'antd'
import { StyledSpan } from './../BaseComponents'

export default class NameTypeSelector extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', marginTop: '5px' }}>
                <Checkbox defaultChecked={this.props.includeCommenters} onChange={_ => {
                    this.props.onChange('commented')
                }} />
                <StyledSpan>Commented</StyledSpan>
                <Checkbox defaultChecked={this.props.includeTagged} onChange={_ => {
                    this.props.onChange('tagged')
                }} />
                <StyledSpan>Tagged</StyledSpan>
            </div>
        )
    }

}
