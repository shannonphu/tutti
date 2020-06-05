import React, { Component } from 'react';
import Tone from 'tone';
import Peaks from 'peaks.js';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { white } from 'color-name';
import SAMPLE_MP3 from '../../assets/kevin_bossa.mp3';

class AudioWaveform extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        var options = {
            containers: {
                // 'zoomview': document.getElementById('zoomview'),
                'overview': document.getElementById('overview'),
            },
            mediaElement: document.getElementById('audio'),
            webAudio: {
                audioContext: audioContext
            },
            overviewWaveformColor: 'green',
            height: 120,
            showPlayheadTime: true,
            // zoomLevels: [512, 1024, 2048, 4096],
            keyboard: true,
            segments: [
                {
                    startTime: 1,
                    endTime: 3,
                    editable: true,
                    color: 'blue',
                    labelText: 'part1'
                },
                {
                    startTime: 3,
                    endTime: 5,
                    editable: true,
                    color: 'purple',
                    labelText: 'part2'
                }
            ]
        };

        Peaks.init(options, (err, peaks) => {
            if (err) {
                console.log(err);
            } else {
                console.log(peaks)
                document.getElementById('zoomIn').addEventListener('click', function () {
                    peaks.zoom.zoomIn();
                });

                document.getElementById('zoomOut').addEventListener('click', function () {
                    peaks.zoom.zoomOut();
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div id='zoomview' style={{ backgroundColor: 'white', borderColor: 'grey' }}></div>
                <div id='overview' style={{ backgroundColor: 'white', borderColor: 'grey' }}></div>
                <audio id='audio' controls='controls'>
                    <source src={SAMPLE_MP3} type='audio/mp3' />
                    Your browser does not support the audio element.
                </audio>
                <div id='controls'>
                    <button id='zoomIn'>Zoom In</button>
                    <button id='zoomOut'>Zoom Out</button>
                    <button id='segment'>Add Segment</button>
                    <button id='point'>Add Point</button>
                </div>
            </div>
        )
    }
}

export default AudioWaveform;