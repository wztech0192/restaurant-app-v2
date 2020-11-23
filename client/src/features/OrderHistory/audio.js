import audioURL from "assets/alertAudio.mp3";

export default new (class {
    constructor() {
        this.alertAudio = new Audio(audioURL);
    }

    error(e) {
        console.error(e);
        this.stop();
    }
    play() {
        if (!this.loop) {
            this.loop = setInterval(() => {
                this.alertAudio.play().catch(this.error.bind(this));
            }, 5000);
        }
    }
    stop() {
        if (this.loop) {
            clearInterval(this.loop);
            delete this.loop;
        }
    }
})();
