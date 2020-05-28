import React, { Component } from 'react';

class DummyChat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(event) {
        event.preventDefault();
        let text = this.refs.text.value;
        this.props.addMessage(text);
        this.refs.text.value = null;
    }

    render() {
        return (
            <div>
                <h3>DummyChat</h3>
                <p>This is an example of socket.io. All clients will receive whatever was input.</p>
                <form onSubmit={this.submitHandler}>
                    <div><input type="text" placeholder="Type your message..." ref="text" /></div>
                    <div><button type="submit" name="action">Submit</button></div>
                </form>
                <div>
                    {this.props.chat.messages.map((message) => <li>{message}</li>)}
                </div>
            </div>
        )
    }
}

export default DummyChat;