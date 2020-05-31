import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class DummyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        props.getUsername();
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
                <div>This text will update to whatever was input below: {this.props.user.name}</div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <TextField ref="name" id="name" label="Name" value={this.state.name} onChange={this.handleTextFieldChange} />
                    </div>
                    <div>
                        <Button variant="contained" label="Submit" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default DummyPost;