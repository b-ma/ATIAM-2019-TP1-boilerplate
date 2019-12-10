import '@babel/polyfill';
import loaders from 'waves-loaders';
import masters from 'waves-masters';
import resumeContext from './resumeContext.js';
import MiniGranular from './MiniGranular.js';

async function init() {
  const audioContext = new AudioContext();
  // resume audio context
  await resumeContext(audioContext);
  // load some buffer
  const loader = new loaders.AudioBufferLoader();
  const buffer = await loader.load('./drum-loop.wav');
  // init schelduler
  const scheduler = new masters.Scheduler(() => audioContext.currentTime);
  // init granular engine
  const granular = new MiniGranular(audioContext, buffer);
  granular.connect(audioContext.destination);
  // add granular engine to scheduler
  scheduler.add(granular);
}

window.addEventListener('load', init);
