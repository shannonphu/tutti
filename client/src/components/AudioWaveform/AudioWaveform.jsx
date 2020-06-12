import React, { Component } from 'react';
import Peaks from 'peaks.js';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import { Player } from './Player';
import SILENCE_MP3 from '../../assets/silence.mp3';

class AudioWaveform extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            peaks: null, 
            isPlaying: false 
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }

    async componentDidMount() {
        let audioName = this.props.audioName;
        let audioUrl = this.props.audioUrl;
        let height = this.props.height;
        let _component = this;
        await fetch(audioUrl)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return new Response(blob).arrayBuffer()
            })
            .then((buffer) => {
                return this.audioContext.decodeAudioData(buffer);
            })
            .then((audioBuffer) => {
                var options = {
                    containers: {
                        // zoomview: this.refs.zoomView,
                        overview: this.refs[`overView-${audioName}`]
                    },
                    height: height,
                    overviewWaveformColor: 'navy',
                    player: new Player(audioBuffer),
                    webAudio: {
                        audioBuffer: audioBuffer,
                        scale: 128,
                        multiChannel: false
                    },
                    keyboard: true,
                    showPlayheadTime: true,
                    zoomLevels: [128, 256, 512, 1024, 2048, 4096]
                };

                Peaks.init(options, (err, peaksInstance) => {
                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    _component.setState({ peaks: peaksInstance });
                });
            });
    }

    play() {
        this.state.peaks.player.play();
    }

    pause() {
        this.state.peaks.player.pause();
    }

    render() {
        return (
            <div>
                <div ref={`zoomView-${this.props.audioName}`} style={{ display: 'none' }}></div>
                <div ref={`overView-${this.props.audioName}`} style={{ backgroundColor: 'white', borderColor: 'grey', height: this.props.height, width: this.props.width }}></div>

                {this.state.peaks && this.props.shouldShowControls ? 
                    <div>
                        <div>
                            <IconButton onClick={this.play}>
                                <PlayCircleFilledIcon />
                            </IconButton>
                            <IconButton onClick={this.pause}>
                                <StopIcon />
                            </IconButton>
                        </div> 
                    </div>
                : null}
            </div>
        )
    }
}

export default AudioWaveform;