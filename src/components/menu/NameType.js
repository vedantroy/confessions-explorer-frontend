import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

const StyledSpan = styled.span`
    text-transform: uppercase;
    font-size: 11px;
    font-family: "DIN";
    font-weight: bolder;
    color: rgb(148, 157, 170);
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`

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
