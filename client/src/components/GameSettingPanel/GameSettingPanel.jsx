import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class GameSettingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props);
        console.log(this.props.match.params.roomId);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    submitHandler(event) {
        event.preventDefault();
        if (this.state.name.length > 0) {
            this.props.editUsername(this.state.name);
            this.setState({
                name: ''
            });
        }
    }

    render() {
        return (
            <div>
                <h3>DummyPost</h3>
                <p>This is an example of a normal GET/POST request</p>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <TextField ref="name" id="name" label="Name" value={this.state.name} onChange={this.handleTextFieldChange} />
                    </div>
                    {this.props.match.params.roomId ? null : 
                        (<div><Button variant="contained" label="Submit" type="submit">Submit</Button></div>)}
                </form>
            </div>
        )
    }
}

export default GameSettingPanel;