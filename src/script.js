let audioContext;
let currentLesson = 0;
let currentAnswer = '';
let score = 0;

const scoreEl      = document.getElementById('score');
const menuScreen   = document.getElementById('menu-screen');
const gameScreen   = document.getElementById('game-screen');
const infoCard     = document.getElementById('info-card');
const lessonTitle  = document.getElementById('lesson-title');
const optionsBox   = document.getElementById('options-container');
const resultText   = document.getElementById('result');
const infoText     = document.getElementById('info-text');

const infoContent = {
  // Lições de Tipos de Onda
  sine:      'Onda senoidal: forma de onda pura, base da síntese sonora e de muitas aplicações em sinais.',
  square:    'Onda quadrada: alterna entre dois níveis, rica em harmônicos ímpares e com timbre “áspero”.',
  sawtooth:  'Onda dente de serra: possui todos os harmônicos, muito usada em síntese de baixo e strings.',
  // Lições de Filtros
  lowpass:   'Filtro passa-baixa: deixa passar frequências abaixo da frequência de corte.',
  highpass:  'Filtro passa-alta: atenua frequências abaixo da frequência de corte, deixando passar as mais altas.',
  bandpass:  'Filtro passa-banda: isola uma faixa de frequências ao redor da frequência central.',
  // Lições de Modulação
  am:        'Modulação AM: variação de amplitude de uma portadora conforme o sinal modulador.',
  fm:        'Modulação FM: variação de frequência de uma portadora conforme o sinal modulador.'
};

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function startLesson(n) {
  currentLesson = n;
  lessonTitle.textContent = `Lição ${n}`;
  menuScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  resultText.textContent = '';
  infoText.textContent   = 'Acierte um exercício para ver detalhes aqui.';
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
  if (currentLesson === 1) opts = ['sine','square','sawtooth'];
  if (currentLesson === 2) opts = ['lowpass','highpass','bandpass'];
  if (currentLesson === 3) opts = ['am','fm'];
  opts.sort(() => Math.random() - 0.5);
  currentAnswer = opts[Math.floor(Math.random() * opts.length)];
  opts.forEach(opt => {
    const b = document.createElement('button');
    b.className = 'btn btn-option';
    b.textContent = infoContent[opt].split(':')[0]; // Título curto
    b.onclick = () => checkAnswer(opt);
    optionsBox.appendChild(b);
  });
}

function playSound() {
  if (!audioContext) return;
  const dur = 1.0;
  if (currentLesson === 1) {
    const osc = audioContext.createOscillator();
    osc.type = currentAnswer;
    osc.frequency.setValueAtTime(440, audioContext.currentTime);
    osc.connect(audioContext.destination);
    osc.start();
    setTimeout(() => osc.stop(), dur * 1000);
  }
  if (currentLesson === 2) {
    const osc = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    osc.type = 'sine';
    filter.type = currentAnswer;
    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
    osc.connect(filter).connect(audioContext.destination);
    osc.start();
    setTimeout(() => osc.stop(), dur * 1000);
  }
  if (currentLesson === 3) {
    const carrier   = audioContext.createOscillator();
    const modulator = audioContext.createOscillator();
    const modGain   = audioContext.createGain();
    carrier.type    = 'sine';
    carrier.frequency.setValueAtTime(440, audioContext.currentTime);
    modulator.frequency.setValueAtTime(30, audioContext.currentTime);
    if (currentAnswer === 'am') {
      modGain.gain.setValueAtTime(0.5, audioContext.currentTime);
      modulator.connect(modGain).connect(carrier.gain);
    } else {
      modGain.gain.setValueAtTime(100, audioContext.currentTime);
      modulator.connect(modGain).connect(carrier.frequency);
    }
    carrier.connect(audioContext.destination);
    modulator.start(); carrier.start();
    setTimeout(() => { carrier.stop(); modulator.stop(); }, dur * 1000);
  }
}

function checkAnswer(selected) {
  if (selected === currentAnswer) {
    resultText.textContent = '✅ Correto!';
    resultText.style.color   = 'var(--primary-green)';
    infoText.textContent     = infoContent[selected];
    score += 10;
    updateScore();
    setTimeout(setupQuestion, 1200);
  } else {
    resultText.textContent = '❌ Errado! Tente novamente.';
    resultText.style.color = '#f44336';
  }
}

function updateScore() {
  scoreEl.textContent = score;
  scoreEl.classList.add('animate');
  setTimeout(() => scoreEl.classList.remove('animate'), 300);
}
