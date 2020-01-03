import styled, { css } from 'styled-components'

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const AroundRow = styled(Row)`
    justify-content: space-around;
`

export const BetweenRow = styled(Row)`
    justify-content: space-between;
`

export const oneLine = css`
    white-space: nowrap;
`

export const mediumPadding = '20px';

export const avenirNext = css`
    font-family: "Avenir Next";
`

export const heavyBoxShadow = css`
    box-shadow: rgba(193, 213, 224, 0.5) 0px 0px 40px;
`

export const highlightedBoxShadow = css`
    box-shadow: 0 2px 8px rgba(90, 46, 255, 0.25);
`

export const menuShadow = css`
    box-shadow: 0 2px 8px rgba(50, 60, 80, 0.15);
    &:hover{
        ${highlightedBoxShadow}
    }
    transition: box-shadow 0.3s;
`

export const DIN_FONT = css`
  font-family: "DIN";
`

export const PURPLE_VALUE = '#5a2eff';

export const dinCSS = css`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  ${DIN_FONT}
`

export const Caption = styled.div`
  align-self: flex-start;
  ${dinCSS}
  margin-bottom: 5px;

`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

export const StaticVerticalItems = styled(Column)`
    background: white;
    padding: 0px 11px;
`
export const border = "2px solid rgb(246, 248, 252)"

export const VerticalItem = styled.div`
    padding: 4px 0px;
    border-top: ${border};
`
export const sideBarHighlightTextColor = "rgba(90, 46, 255, 1)"

export const StyledInput = styled.input`
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
    border: none;
    padding: 6px 11px;
    width: 100%;
    height: 33px;
    border-radius: 4px;
`

export const ShadowSearchbox = styled(StyledInput)`
    ${menuShadow}
`

export const StyledSpan = styled.span`
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