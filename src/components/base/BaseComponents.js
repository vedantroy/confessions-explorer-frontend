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

export const Caption = styled.div`
  align-self: flex-start;
  text-transform: uppercase;
  font-size: 11px;
  margin-bottom: 5px;
  font-weight: 700;
  ${DIN_FONT}
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