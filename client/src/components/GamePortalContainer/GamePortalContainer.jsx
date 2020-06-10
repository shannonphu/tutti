import React, { Component } from 'react';
import Tone from 'tone';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { ChatMessageBox, GameInfoTable, Microphone, AudioDisplayTable, SampleLooper, Looper, UserRecorder } from '..';

class GamePortalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        Tone.Transport.bpm.value = this.props.room.bpm;
    }

    render() {
        return (
            <Container fixed>
                {this.props.room.roomCode ? 
                    <Grid container spacing={5}>
                        <Grid item xs={8}>
                            <AudioDisplayTable {...this.props} />
                        </Grid>
                        <Grid item xs={4}>
                            <GameInfoTable {...this.props} />
                            <ChatMessageBox {...this.props} />
                            <Microphone {...this.props} />
                        </Grid>
                        <Grid item>
                            <SampleLooper {...this.props} />
                        </Grid>
                        <Grid item>
                            <Looper {...this.props} />
                        </Grid>
                        <Grid item>
                            <UserRecorder {...this.props}/>
                        </Grid>
                    </Grid>
                 : <div>Join the room first!</div>}
            </Container>
        );
    }
}

export default GamePortalContainer;