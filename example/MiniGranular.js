
class MiniGranular {
  constructor(audioContext, buffer) {
    this.audioContext = audioContext;
    this.buffer = buffer;

    this.period = 0.05;
    this.duration = 0.2;
    this.position = 0.5;

    this.output = this.audioContext.createGain();
  }

  connect(node) {
    this.output.connect(node);
  }

  advanceTime(time) {
    const env = this.audioContext.createGain();
    env.connect(this.output);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(1, time + this.duration / 2);
    env.gain.linearRampToValueAtTime(0, time + this.duration);

    const grain = this.audioContext.createBufferSource();
    grain.connect(env);
    grain.buffer = this.buffer;
    grain.start(time, this.position);
    grain.stop(time + this.duration);

    return time + this.period;
  }
}

export default MiniGranular;
