import React from "react";
import { Tag } from 'antd'
import styled from 'styled-components'
import { Row, SpacedRow, oneLine, mediumPadding, avenirNext, BetweenRow } from './base/BaseComponents'
import MaterialIcon from 'material-icons-react'


const Confession = props => (
    <UnstyledLink
        href={`http://facebook.com/${props.confessionId}`}
        rel={"noopener noreferrer"}
        target={"_blank"}>
        <StyledConfession>
            <Header>
                <Row>
                    <SourceTitle>
                        {props.source}
                    </SourceTitle>
                </Row>
                <Row>
                    <StyledMaterialIcon icon="date_range" />
                    <StyledInfo style={{ marginRight: '10px' }}>
                        {props.date}
                    </StyledInfo>
                    <StyledMaterialIcon icon="person" />
                    <StyledInfo>
                        {props.reacts}
                    </StyledInfo>
                </Row>
            </Header>
            <WordWrappedParagraph>
                {props.text}
            </WordWrappedParagraph>
        </StyledConfession>
    </UnstyledLink>
)

export default Confession

const WordWrappedParagraph = styled.p`
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
`

const UnstyledLink = styled.a`
    color: inherit;
    text-decoration: none;
`

const StyledMaterialIcon = ({ icon }) =>
    <div style={{ marginRight: '5px' }}>
        <MaterialIcon
            icon={icon} size={23}
            className="material-icons bottom-align" />
    </div>

const Header = styled(BetweenRow)`
    padding-bottom: 10px
`

const StyledInfo = styled.div`
    ${avenirNext}
    ${oneLine}
    color: #5a2eff;
    font-weight: 700;
`

const StyledConfession = styled.div`
    box-shadow: rgba(193, 213, 224, 0.35) 0px 0px 40px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: ${mediumPadding};
    margin-top: 50px;
    margin-bottom: 50px;
    background: #ffff;
    transition: all 0.4s;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 40px rgba(193, 213, 224, 0.75);
    }
`

const SourceTitle = styled.div`
    ${avenirNext}
    color: #000;
    font-weight: bold;
    font-size: 16px;
    ${oneLine}
`