import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { ChatMessageBox, GameInfoTable, Microphone, AudioDisplayTable, Looper } from '..';
import Game from './GameModel';

class GamePortalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new Game()
        };
    }

    render() {
        return (
            <Container fixed>
                {this.props.room.roomCode ? 
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item xs={8}>
                            <AudioDisplayTable {...this.props} />
                        </Grid>
                        <Grid item xs={4}>
                            <GameInfoTable {...this.props} />
                            <ChatMessageBox {...this.props} />
                            <Microphone {...this.props} />
                        </Grid>
                        <Grid item>
                            <Looper {...this.props} />
                        </Grid>
                    </Grid>
                 : <div>Join the room first!</div>}
            </Container>
        );
    }
}

export default GamePortalContainer;