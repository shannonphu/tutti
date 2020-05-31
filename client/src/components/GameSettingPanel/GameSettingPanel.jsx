import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class GameSettingPanel extends Component {
    constructor(props) {
        super(props);

        if (this.props.match.params.roomId && this.props.room.code == null) {
            this.props.getRoom(this.props.match.params.roomId);
        }

        this.state = {
            bpm: props.room.bpm,
            numBars: props.room.numBars,
            numLoops: props.room.numLoops
        };
        
        this.isRoomCodeSet = this.isRoomCodeSet.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.getTextFieldId = this.getTextFieldId.bind(this);
        this.isInputValid = this.isInputValid.bind(this);
    }

    isRoomCodeSet() {
        return this.props.match.params.roomId !== undefined || (this.props.room !== null && this.props.room.code !== null);
    }

    getTextFieldId() {
        if (this.isRoomCodeSet()) {
            return 'standard-disabled';
        } else {
            return 'standard-required';
        }
    }

    handleTextFieldChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        if (key == 'bpm' || key == 'numBars' || key == 'numLoops') {
            value = parseInt(value)
        }
        this.setState({
            [key]: value
        });
    }

    isInputValid() {
        return this.state.bpm > 0 && this.state.numBars > 0 && this.state.numLoops > 0;
    }

    submitHandler(event) {
        event.preventDefault();
        if (this.isInputValid()) {
            this.props.addRoom(this.state.bpm, this.state.numBars, this.state.numLoops);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div><TextField id={this.getTextFieldId()} name='bpm' type='number' label='BPM' value={this.state.bpm} InputProps={{ readOnly: this.isRoomCodeSet() }} onChange={this.handleTextFieldChange} error={this.state.bpm <= 0} helperText={this.state.bpm <= 0 ? 'BPM must be greater than 0' : ''} /></div>
                    <div><TextField id={this.getTextFieldId()} name='numBars' type='number' label='# Bars' value={this.state.numBars} InputProps={{ readOnly: this.isRoomCodeSet() }} onChange={this.handleTextFieldChange} error={this.state.numBars <= 0} helperText={this.state.numBars <= 0 ? '# Bars must be greater than 0' : ''} /></div>
                    <div><TextField id={this.getTextFieldId()} name='numLoops' type='number' label='# Loops' value={this.state.numLoops} InputProps={{ readOnly: this.isRoomCodeSet() }} onChange={this.handleTextFieldChange} error={this.state.numLoops <= 0} helperText={this.state.numLoops <= 0 ? '# Loops must be greater than 0' : ''} /></div>
                    <div>Total Bars: {this.state.numBars * this.state.numLoops}</div>
                    {this.isRoomCodeSet() ? null : 
                        (<div><Button variant='contained' label='Submit' type='submit' disabled={!this.isInputValid()}>Submit</Button></div>)}
                </form>
            </div>
        )
    }
}

export default GameSettingPanel;