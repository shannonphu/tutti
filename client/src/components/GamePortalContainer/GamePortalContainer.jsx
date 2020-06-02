import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { ChatMessageBox, GameInfoTable, Metronome } from '..';
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
                {this.props.room.code ? 
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item xs={9}>
                            <div></div>
                        </Grid>
                        <Grid item xs={3}>
                            <ChatMessageBox {...this.props} />
                            <GameInfoTable {...this.props} />
                        </Grid>
                    </Grid>
                    : <div>Join the room first!</div>}
            </Container>
        )
    }
}

export default GamePortalContainer;