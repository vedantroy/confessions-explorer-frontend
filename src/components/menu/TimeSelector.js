import React from "react";
import { DatePicker, Card } from 'antd'
const { RangePicker } = DatePicker

export default class DateSelector extends React.Component {
    render() {
        return (
            <RangePicker
                onChange={this.onDateChanged}
                defaultValue={this.props.defaultRange}>
            </RangePicker>
        )
    }

    onDateChanged = date => {
        this.props.onSelectionChange(date);
    }
}