import Tone from 'tone';

export function Player(audioBuffer) {
    return {
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

        destroy: function() {
            Tone.context.dispose();
            this.externalPlayer = null;
            this.eventEmitter = null;
        },

        play: function() {
            Tone.Transport.start(
                Tone.now(),
                this.getCurrentTime()
            );

            this.eventEmitter.emit('player.play', this.getCurrentTime());
        },

        pause: function() {
            Tone.Transport.pause();
            this.eventEmitter.emit('player.pause', this.getCurrentTime());
        },

        isPlaying: function() {
            return Tone.Transport.state === 'started';
        },

        seek: function(time) {
            Tone.Transport.seconds = time;

            this.eventEmitter.emit('player.seeked', this.getCurrentTime());
            this.eventEmitter.emit('player.timeupdate', this.getCurrentTime());
        },

        isSeeking: function() {
            return false;
        },

        getCurrentTime: function() {
            return this.externalPlayer.buffer.toSeconds(Tone.Transport.position);
        },

        getDuration: function () {
            return this.externalPlayer.buffer.duration;
        }
    }
}