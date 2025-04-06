let audioContext;
let currentLesson = 0;
let currentAnswer = '';
let score = 0;
const lessonScores = {1:0,2:0,3:0};
const threshold = 50;
const scoreEl = document.getElementById('score');
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const infoText = document.getElementById('info-text');
const lessonTitle = document.getElementById('lesson-title');
const optionsBox = document.getElementById('options-container');
const resultText = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');
const overlay = document.getElementById('overlay');
const infoContent = {
  sine: 'Onda senoidal: forma pura, base da síntese sonora.',
  square: 'Onda quadrada: harmônicos ímpares, timbre áspero.',
  sawtooth: 'Onda dente de serra: todos os harmônicos.',
  lowpass: 'Filtro passa-baixa: passa baixas frequências.',
  highpass: 'Filtro passa-alta: passa altas frequências.',
  bandpass: 'Filtro passa-banda: isola faixa central.',
  am: 'Modulação AM: variação de amplitude.',
  fm: 'Modulação FM: variação de frequência.'
};
const audioTypes = {
  'Onda senoidal': 'sine',
  'Onda quadrada': 'square',
  'Onda dente de serra': 'sawtooth',
  'Filtro passa-baixa': 'lowpass',
  'Filtro passa-alta': 'highpass',
  'Filtro passa-banda': 'bandpass',
  'Modulação AM': 'am',
  'Modulação FM': 'fm'
};


function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function initAudio() {
  if (!audioContext) audioContext = new (window.AudioContext||window.webkitAudioContext)();
}

function startLesson(n) {
  currentLesson = n;
  lessonTitle.textContent = `Lição ${n}`;
  menuScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  resultText.textContent = '';
  infoText.textContent = 'Acerte para ver detalhes aqui.';
  updateProgress();
  initAudio();
  setupQuestion();
}

function backToMenu() {
  gameScreen.style.display = 'none';
  menuScreen.style.display = 'block';
}

function setupQuestion() {
  optionsBox.innerHTML = '';
  let opts = [];
  if (currentLesson===1) opts=['Onda senoidal','Onda quadrada','Onda dente de serra'];
  if (currentLesson===2) opts=['Filtro passa-baixa','Filtro passa-alta','Filtro passa-banda'];
  if (currentLesson===3) opts=['Modulação AM','Modulação FM'];
  opts.sort(()=>Math.random()-0.5);
  currentAnswer = opts[Math.floor(Math.random()*opts.length)];
  opts.forEach(opt=>{
    const b = document.createElement('button');
    b.className = 'btn btn-option';
    b.textContent = opt;
    b.onclick = ()=> checkAnswer(opt);
    optionsBox.appendChild(b);
  });
}

function playSound() {
  if (!audioContext) return;
  const dur = 1.0;
  if (currentLesson===1) {
    const osc = audioContext.createOscillator(); 
    osc.type = audioTypes[currentAnswer];
    osc.frequency.setValueAtTime(440,audioContext.currentTime);
    osc.connect(audioContext.destination); osc.start(); setTimeout(()=>osc.stop(),dur*1000);
  }
  if (currentLesson===2) {
    const osc = audioContext.createOscillator(); const filter = audioContext.createBiquadFilter();
    osc.type='sine'; 
    filter.type = audioTypes[currentAnswer];
    filter.frequency.setValueAtTime(1000,audioContext.currentTime);
    osc.connect(filter).connect(audioContext.destination); osc.start(); setTimeout(()=>osc.stop(),dur*1000);
  }
  if (currentLesson===3) {
    const carrier = audioContext.createOscillator(); const mod = audioContext.createOscillator(); const mg = audioContext.createGain();
    carrier.type='sine'; carrier.frequency.setValueAtTime(440,audioContext.currentTime);
    mod.frequency.setValueAtTime(30,audioContext.currentTime);
    if (audioTypes[currentAnswer] === 'am') { mg.gain.setValueAtTime(0.5,audioContext.currentTime); mod.connect(mg).connect(carrier.gain);
    } else { mg.gain.setValueAtTime(100,audioContext.currentTime); mod.connect(mg).connect(carrier.frequency); }
    carrier.connect(audioContext.destination); mod.start(); carrier.start(); setTimeout(()=>{carrier.stop();mod.stop();},dur*1000);
  }
}

function checkAnswer(selected) {
  playFeedbackSound(selected === currentAnswer ? 'success' : 'error');
  if (selected===currentAnswer) {
    showOverlay('success');
    lessonScores[currentLesson]+=10; score+=10;
    infoText.textContent = infoContent[audioTypes[selected]];
    resultText.textContent = '✅ Correto!'; resultText.style.color='var(--primary-green)';
  } else {
    showOverlay('error');
    lessonScores[currentLesson]=Math.max(lessonScores[currentLesson]-5,0);
    score=Math.max(score-5,0);
    resultText.textContent = '❌ Errado!'; resultText.style.color='#f44336';
  }
  updateScore(); updateProgress();
  if (lessonScores[currentLesson]>=threshold) unlockLesson(currentLesson+1);
  setTimeout(setupQuestion,1200);
}

function updateScore() {
  scoreEl.textContent = score;
  scoreEl.classList.add('animate');
  setTimeout(()=>scoreEl.classList.remove('animate'),300);
}

function updateProgress() {
  const pct = Math.min((lessonScores[currentLesson]/threshold)*100,100);
  progressBar.style.width = pct + '%';
}

function unlockLesson(n) {
  const btn = document.getElementById(`lesson-btn-${n}`);
  if (btn) { btn.disabled = false; btn.style.borderColor='var(--primary-green)'; }
}

function showOverlay(type) {
  overlay.className = 'overlay ' + type;
  setTimeout(()=>overlay.className='overlay',500);
}

function playFeedbackSound(type) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain).connect(audioContext.destination);
  if (type === 'success') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, audioContext.currentTime);
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
  } else {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, audioContext.currentTime);
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  }
  osc.start();
  setTimeout(() => osc.stop(), 200);
}
