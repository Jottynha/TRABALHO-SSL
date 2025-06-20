// js/audio.js
let audioContext = null;

export function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function playSoundForLesson(currentLesson, currentAnswer, audioTypes) {
  const ctx = initAudio();
  const dur = 1.0;
  if (currentLesson === 1) {
    const osc = ctx.createOscillator();
    osc.type = audioTypes[currentAnswer];
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), dur * 1000);
  } else if (currentLesson === 2) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sine';
    filter.type = audioTypes[currentAnswer];
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.connect(filter).connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), dur * 1000);
  } else if (currentLesson === 3) {
    const carrier = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const mg = ctx.createGain();
    const output = ctx.createGain();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(440, ctx.currentTime);
    mod.frequency.setValueAtTime(30, ctx.currentTime);

    if (audioTypes[currentAnswer] === 'am') {
      mg.gain.setValueAtTime(0.5, ctx.currentTime);
      mod.connect(mg);
      mg.connect(output.gain);
      carrier.connect(output);
      output.connect(ctx.destination);
    } else {
      mg.gain.setValueAtTime(100, ctx.currentTime);
      mod.connect(mg).connect(carrier.frequency);
      carrier.connect(ctx.destination);
    }
    mod.start();
    carrier.start();
    setTimeout(() => {
      carrier.stop();
      mod.stop();
    }, dur * 1000);
  }
}

export function playFeedbackSound(type) {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain).connect(ctx.destination);
  if (type === 'success') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
  } else {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
  }
  osc.start();
  setTimeout(() => osc.stop(), 200);
}
