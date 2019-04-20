import React from 'react'
import styled from 'styled-components'
import { StaticVerticalItems, DIN_FONT, border, menuShadow } from '../base/BaseComponents'
import { Icon } from 'antd'

const Suggestions = styled(StaticVerticalItems)`
    ${menuShadow}
    border-radius
    : 4px;
    ${DIN_FONT}
`
const SourceRow = styled.div`
    padding: 4px 0px;
    border-top: ${props => props.isFirst ? 'inherit' : border};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SourceDisplay = props => (
    <Suggestions>
        {
            props.sources.map((source, index) => (
                <SourceRow
                    isFirst={index === 0}
                    key={source}
                >
                    <div>
                        {source}
                    </div>
                    <IconButton
                        onClick={() => {
                            props.onRemove(source)
                        }}
                    />
                </SourceRow>
            ))
        }
    </Suggestions>
)

class IconButton extends React.Component {

    state = {
        hover: false
    }

    render() {
        return (
            <StyledIcon
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
                onClick={(this.props.onClick)}
                type={this.state.hover ? 'close' : 'check'}
                hover={`${this.state.hover}`} />
        )
    }
}

const StyledIcon = styled(Icon)`
    font-size: 14px;
    cursor: pointer;
    color: ${props => props.hover ? 'rgb(31, 199, 148)' : '#FF3559'};
`

export default SourceDisplay;