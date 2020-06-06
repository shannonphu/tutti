import React, { Component } from 'react';
import Tone from 'tone';
import Peaks from 'peaks.js';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { Player } from '../Tone/Player/Player';
import SAMPLE_MP3 from '../../assets/kevin_bossa.mp3';

class AudioWaveform extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            peaks: null, 
            isPlaying: false 
        };

        this.togglePlay = this.togglePlay.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.seek = this.seek.bind(this);
        this.playSegment = this.playSegment.bind(this);

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }

    async componentDidMount() {
        let _component = this;

        await fetch(SAMPLE_MP3)
            .then((response) => {
                return response.arrayBuffer();
            })
            .then((buffer) => {
                return this.audioContext.decodeAudioData(buffer);
            })
            .then((audioBuffer) => {
                var options = {
                    containers: {
                        zoomview: this.refs.zoomView,
                        overview: this.refs.overView
                    },
                    height: 150,
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

                Peaks.init(options, function (err, peaksInstance) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    _component.setState({ peaks: peaksInstance });
                });
            });
    }

    togglePlay() {
        if (this.state.isPlaying) {
            this.state.peaks.player.pause();
        } else {
            this.state.peaks.player.play();
        }

        this.setState({ isPlaying: !this.state.isPlaying });
    }

    zoomIn() {
        this.state.peaks.zoom.zoomIn();
    }

    zoomOut() {
        this.state.peaks.zoom.zoomOut();
    }

    // Demo implementation. Might remove.
    seek() {
        var time = this.refs.seekTime.value;
        var seconds = parseFloat(time);
        if (!Number.isNaN(seconds)) {
            this.state.peaks.player.seek(seconds);
        }
    }

    // Demo implementation. Might remove.
    playSegment() {
        var start = this.refs.segmentStartTime.value;
        var startInSeconds = parseFloat(start);
        var end = this.refs.segmentEndTime.value;
        var endInSeconds = parseFloat(end);
        this.state.peaks.player.playSegment({ startTime: startInSeconds, endTime: endInSeconds, editable: true });
    }

    render() {
        return (
            <div>
                <div id='zoomview' ref='zoomView' style={{ backgroundColor: 'white', borderColor: 'grey' }}></div>
                <div id='overview' ref='overView' style={{ backgroundColor: 'white', borderColor: 'grey' }}></div>
                {this.state.peaks ? 
                    <div>
                        <IconButton onClick={this.togglePlay}>
                            {this.state.isPlaying ? <StopIcon /> : <PlayCircleFilledIcon />}
                        </IconButton>
                        <IconButton onClick={this.zoomIn}>
                            <ZoomInIcon />
                        </IconButton>
                        <IconButton onClick={this.zoomOut}>
                            <ZoomOutIcon />
                        </IconButton>
                        <input type='text' defaultValue='0.0' ref='seekTime' />
                        <Button onClick={this.seek}>Seek</Button>
                        <input type='text' defaultValue='2.0' ref='segmentStartTime' />
                        <input type='text' defaultValue='5.0' ref='segmentEndTime' />
                        <Button onClick={this.playSegment}>Play segment</Button>
                    </div> 
                : null}
            </div>
        )
    }
}

export default AudioWaveform;