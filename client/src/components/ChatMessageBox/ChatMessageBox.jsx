import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, IconButton } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { ChatFeed } from 'react-chat-ui';
import styles from './ChatMessageBoxStyles';
import './ChatMessageBoxStyles.css'

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
            this.props.sentMessageToRoom(this.state.currMessage);
        }
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <Paper>
                <div className={classes.chatContainer}>
                    <ChatFeed
                        messages={this.props.user.messages}
                        isTyping={false}
                        hasInputField={false}
                        showSenderName
                        bubblesCentered={false}
                        maxHeight={350}
                        className={classes.chatFeed}
                        InputProps
                        bubbleStyles={
                            {
                                text: {
                                    fontSize: 16
                                },
                                chatbubble: {
                                    backgroundColor: theme.palette.primary.light,
                                    borderRadius: 30,
                                    padding: 10
                                }
                            }
                        }
                    />
                    <form onSubmit={this.submitHandler} autoComplete='off'>
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField autoFocus={this.props.room.lastUpdatedField == 'chat'} style={{'width': '100%'}} name='currMessage' ref='message' value={this.state.currMessage} onChange={this.handleTextFieldChange} helperText={'Type a message...'} />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton aria-label='send' type='submit' name='action'>
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        )
    }
}

ChatMessageBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme(withStyles(styles)(ChatMessageBox));