// Based off source = https://stackoverflow.com/a/43245004/10520987
// Customized to just reset timer.
export class Timer {
    constructor(callback, delay) {
        this.callback = callback
        this.isRunning = false
        this.delay = delay
        this.timerId
    }
    pause() {
        if (this.isRunning) {
            clearTimeout(this.timerId)
            this.isRunning = false;
        }
    }
    resume() {
        if (!this.isRunning) {
            this.timerId = setTimeout(this.callback, this.delay);
            this.isRunning = true;
        }
    }
    start() {
        this.timerId = setTimeout(this.callback, this.delay)
        this.isRunning = true;
    }
}