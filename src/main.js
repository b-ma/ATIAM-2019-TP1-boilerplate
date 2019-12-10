import '@babel/polyfill';
import loaders from 'waves-loaders';
import masters from 'waves-masters';
import resumeContext from './resumeContext.js';
import MiniGranular from './MiniGranular.js';

async function init() {
  const audioContext = new AudioContext();
  // resume audio context
  await resumeContext(audioContext);

  const now = audioContext.currentTime;

  const env = audioContext.createGain();
  env.connect(audioContext.destination);
  env.gain.value = 0;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(1, now + 0.005);
  env.gain.exponentialRampToValueAtTime(0.0001, now + 1);

  const sine = audioContext.createOscillator();
  sine.connect(env);
  sine.start(now);
  sine.stop(now + 2);

}

window.addEventListener('load', init);
