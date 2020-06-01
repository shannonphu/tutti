import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { ChatFeed, Message } from 'react-chat-ui';

class ChatMessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currMessage: ''
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler(event) {
        event.preventDefault();
        if (this.state.currMessage.length > 0) {
            const playerName = 'Shannon';
            this.props.addMessage(playerName, this.state.currMessage, this.props.room.code);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <ChatFeed
                        messages={this.props.chat.messages}
                        isTyping={false}
                        hasInputField={false}
                        showSenderName
                        bubblesCentered={false}
                        maxHeight={400}
                        bubbleStyles={
                            {
                                text: {
                                    fontSize: 16
                                },
                                chatbubble: {
                                    borderRadius: 30,
                                    padding: 10
                                }
                            }
                        }
                    />
                    <form onSubmit={this.submitHandler} autoComplete='off'>
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField autoFocus style={{'width': '100%'}} name='currMessage' ref='message' value={this.state.currMessage} onChange={this.handleTextFieldChange} helperText={'Type a message...'} />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton aria-label='send' type='submit' name='action'>
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChatMessageBox;