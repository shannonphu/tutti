import React, { Component } from 'react';
import Tone from 'tone';
import Peaks from 'peaks.js';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import SAMPLE_MP3 from '../../assets/kevin_bossa.mp3';

class AudioWaveform extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        await fetch(SAMPLE_MP3)
            .then(function (response) {
                return response.arrayBuffer();
            })
            .then(function (buffer) {
                return audioContext.decodeAudioData(buffer);
            })
            .then(function (audioBuffer) {
                const player = {
                    externalPlayer: new Tone.Player(audioBuffer),
                    eventEmitter: null,

                    init: function (eventEmitter) {
                        this.eventEmitter = eventEmitter;

                        this.externalPlayer.sync();
                        this.externalPlayer.start();

                        Tone.connectSeries(this.externalPlayer, Tone.Master);

                        eventEmitter.emit('player.canplay');

                        Tone.Transport.scheduleRepeat(() => {
                            var time = this.getCurrentTime();
                            eventEmitter.emit('player.timeupdate', time);

                            if (time >= this.getDuration()) {
                                Tone.Transport.stop();
                            }
                        }, 0.25);
                    },

                    destroy: function () {
                        Tone.context.dispose();
                        this.externalPlayer = null;
                        this.eventEmitter = null;
                    },

                    play: function () {
                        Tone.Transport.start(
                            Tone.now(),
                            this.getCurrentTime()
                        );

                        this.eventEmitter.emit('player.play', this.getCurrentTime());
                    },

                    pause: function () {
                        Tone.Transport.pause();
                        this.eventEmitter.emit('player.pause', this.getCurrentTime());
                    },

                    isPlaying: function () {
                        return Tone.Transport.state === "started";
                    },

                    seek: function (time) {
                        Tone.Transport.seconds = time;

                        this.eventEmitter.emit('player.seeked', this.getCurrentTime());
                        this.eventEmitter.emit('player.timeupdate', this.getCurrentTime());
                    },

                    isSeeking: function () {
                        return false;
                    },

                    getCurrentTime: function () {
                        return this.externalPlayer.buffer.toSeconds(Tone.Transport.position);
                    },

                    getDuration: function () {
                        return this.externalPlayer.buffer.duration;
                    }
                };
                var options = {
                    containers: {
                        zoomview: document.getElementById('zoomview'),
                        overview: document.getElementById('overview')
                    },
                    height: 150,
                    player: player,
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

                    console.log('Peaks instance ready');

                    document.querySelector('[data-action="play"]').addEventListener('click', function () {
                        peaksInstance.player.play();
                    });

                    document.querySelector('[data-action="pause"]').addEventListener('click', function () {
                        peaksInstance.player.pause();
                    });

                    document.querySelector('button[data-action="seek"]').addEventListener('click', function (event) {
                        var time = document.getElementById('seek-time').value;
                        var seconds = parseFloat(time);

                        if (!Number.isNaN(seconds)) {
                            peaksInstance.player.seek(seconds);
                        }
                    });

                    document.querySelector('[data-action="zoom-in"]').addEventListener('click', function () {
                        peaksInstance.zoom.zoomIn();
                    });

                    document.querySelector('[data-action="zoom-out"]').addEventListener('click', function () {
                        peaksInstance.zoom.zoomOut();
                    });

                    document.querySelector('[data-action="play-segment"]').addEventListener('click', function () {
                        var start = document.getElementById('segment-start').value;
                        var startInSeconds = parseFloat(start);

                        var end = document.getElementById('segment-end').value;
                        var endInSeconds = parseFloat(end);

                        peaksInstance.player.playSegment({ startTime: startInSeconds, endTime: endInSeconds, editable: true });
                    });
                });
            });
    }

    render() {
        return (
            <div>
                <div id='zoomview' style={{ backgroundColor: 'white', borderColor: 'grey' }}></div>
                <div id='overview' style={{ backgroundColor: 'white', borderColor: 'grey' }}></div>
                <div id="demo-controls">
                    <div id="controls">
                        <button data-action="play">Play</button>
                        <button data-action="pause">Pause</button>
                        <input type="text" id="seek-time" value="0.0" />
                        <button data-action="seek">Seek</button>
                        <button data-action="zoom-in">Zoom in</button>
                        <button data-action="zoom-out">Zoom out</button>
                        <input type="text" id="segment-start" value="2.0" />
                        <input type="text" id="segment-end" value="5.0" />
                        <button data-action="play-segment">Play segment</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AudioWaveform;