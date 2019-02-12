import React from 'react'
import Downshift from 'downshift'
import { Caption, menuShadow, DIN_FONT, StaticVerticalItems, VerticalItem, sideBarHighlightTextColor, StyledInput } from '../base/BaseComponents'
import styled from 'styled-components'

const Container = styled.div`
    ${menuShadow}
    ${DIN_FONT}
`
/*
border-top-left-radius: 4px;
border-top-right-radius: 4px;
border-bottom-left-radius: ${props => props.dropdownExists ? '0px' : '4px'};
border-bottom-right-radius: ${props => props.dropdownExists ? '0px' : '4px'}
*/

/*
There seems to be a bug in Downshift...
*/

const SuggestionItem = styled(VerticalItem)`
    color: ${props => props.selected ? sideBarHighlightTextColor : 'inherit'};
`

const SearchMenu = styled(StaticVerticalItems)`
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`

class SourceSearch extends React.Component {

    state = {
        inputValue: "",
        selectedItem: ""
    }

    inputElementKeyPress = e => {
        //TODO CODESMELL--duplicate code in text search.
        if (e.nativeEvent.charCode === 13) {
            if (this.props.items.indexOf(this.state.inputValue) > -1) {
                this.props.onValueSelected(this.state.inputValue)
                this.setState({
                    inputValue: "",
                    selectedItem: ""
                })
            }
        }
    }

    render() {
        return (
            <Downshift
                itemToString={item => (item ? item : '')}
                inputValue={this.state.inputValue}
                onInputValueChange={newInputValue => {
                    this.setState({
                        inputValue: newInputValue,
                        selectedItem: newInputValue
                    })
                }}
                selectedItem={this.state.selectedItem}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                }) => {
                    const displayedSuggestions = this.props.items
                        .filter(item => !inputValue || item.includes(inputValue))
                    const showSuggestions = isOpen && displayedSuggestions.length > 0

                    return (
                        <div>
                            <Caption {...getLabelProps()}>Sources</Caption>
                            <Container>
                                <StyledInput
                                    {...getInputProps({
                                        onKeyPress: this.inputElementKeyPress
                                    })}
                                />
                                {showSuggestions
                                    ?
                                    <SearchMenu {...getMenuProps()}>
                                        {
                                            displayedSuggestions.map((item, index) => (
                                                <SuggestionItem
                                                    {...getItemProps({
                                                        key: item,
                                                        index,
                                                        item
                                                    })}
                                                    selected={highlightedIndex === index}
                                                >
                                                    {item}
                                                </SuggestionItem>
                                            ))
                                        }
                                    </SearchMenu>
                                    : null}
                            </Container>
                        </div>)
                }}
            </Downshift>
        )
    }
}

export default SourceSearch
