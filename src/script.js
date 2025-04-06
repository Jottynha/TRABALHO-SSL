let audioContext;
let currentLesson = 0;
let currentAnswer = '';
let score = 0;
let isInfinityMode = false;
let lives = 3;

const welcomeScreen = document.getElementById('welcome-screen');
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
  sine: {
    text: 'Onda senoidal: forma pura, base da síntese sonora.',
    extra: 'Presente em sinais analógicos e sistemas harmônicos.'
  },
  square: {
    text: 'Onda quadrada: harmônicos ímpares, timbre áspero.',
    extra: 'Usada em circuitos digitais e sintetizadores.'
  },
  sawtooth: {
    text: 'Onda dente de serra: todos os harmônicos.',
    extra: 'Ideal para síntese subtrativa de som.'
  },
  lowpass: {
    text: 'Filtro passa-baixa: passa baixas frequências.',
    extra: 'Bloqueia ruído de alta frequência em sinais.'
  },
  highpass: {
    text: 'Filtro passa-alta: passa altas frequências.',
    extra: 'Remove componentes de baixa frequência.'
  },
  bandpass: {
    text: 'Filtro passa-banda: isola faixa central.',
    extra: 'Comum em rádio e análise espectral.'
  },
  am: {
    text: 'Modulação AM: variação de amplitude.',
    extra: 'Usado em rádio AM e transmissão de voz.'
  },
  fm: {
    text: 'Modulação FM: variação de frequência.',
    extra: 'Utilizado em rádio FM e telefonia digital.'
  }
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

function startLessonMode() {
  document.getElementById('vidas').style.display = 'none';
  isInfinityMode = false;
  welcomeScreen.style.display = 'none';
  menuScreen.style.display = 'block';
  document.querySelector('.progress-container').style.display = 'block';
}

function startInfinityMode() {
  document.getElementById('btn-voltar-menu').style.display = 'none';
  isInfinityMode = true;
  currentLesson = 0; // modo misto
  lives = 3;
  document.getElementById('vidas').textContent = '❤️❤️❤️';
  document.getElementById('vidas').style.display = 'inline';
  document.querySelector('.progress-container').style.display = 'none';
  score = 0;
  for (let l in lessonScores) lessonScores[l] = 0;
  welcomeScreen.style.display = 'none';
  menuScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  resultText.textContent = '';
  infoText.textContent = 'Acerte para ver detalhes aqui.';
  updateScore();
  updateProgress();
  initAudio();
  setupQuestion();
}


lives = 3;
  document.getElementById('vidas').textContent = '❤️❤️❤️';
  document.getElementById('vidas').style.display = 'inline';
  document.querySelector('.progress-container').style.display = 'none';

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
  if (isInfinityMode) {
    const allOptions = {
      1: ['Onda senoidal','Onda quadrada','Onda dente de serra'],
      2: ['Filtro passa-baixa','Filtro passa-alta','Filtro passa-banda'],
      3: ['Modulação AM','Modulação FM']
    };
    const randomLesson = Math.floor(Math.random() * 3) + 1;
    currentLesson = randomLesson;
    opts = allOptions[randomLesson];
  } else {
    if (currentLesson===1) opts=['Onda senoidal','Onda quadrada','Onda dente de serra'];
    if (currentLesson===2) opts=['Filtro passa-baixa','Filtro passa-alta','Filtro passa-banda'];
    if (currentLesson===3) opts=['Modulação AM','Modulação FM'];
  }

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
function desenharOnda(tipo) {
  const canvas = document.getElementById('wave-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;
  const midY = h / 2;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#2AA64F';

  if (tipo === 'sine' || tipo === 'square' || tipo === 'sawtooth') {
    for (let x = 0; x < w; x++) {
      let y;
      let t = x / w;

      switch (tipo) {
        case 'sine':
          y = Math.sin(t * 2 * Math.PI * 4);
          break;
        case 'square':
          y = Math.sign(Math.sin(t * 2 * Math.PI * 4));
          break;
        case 'sawtooth':
          y = 2 * (t * 4 - Math.floor(t * 4 + 0.5));
          break;
        default:
          y = 0;
      }

      y = midY - y * (h / 2.5);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }

  // Filtros
  else if (tipo === 'lowpass') {
    ctx.moveTo(0, h * 0.2);
    ctx.lineTo(w * 0.4, h * 0.2);
    ctx.lineTo(w * 0.6, h * 0.8);
    ctx.lineTo(w, h * 0.8);
  }
  else if (tipo === 'highpass') {
    ctx.moveTo(0, h * 0.8);
    ctx.lineTo(w * 0.4, h * 0.8);
    ctx.lineTo(w * 0.6, h * 0.2);
    ctx.lineTo(w, h * 0.2);
  }
  else if (tipo === 'bandpass') {
    ctx.moveTo(0, h * 0.8);
    ctx.lineTo(w * 0.3, h * 0.8);
    ctx.lineTo(w * 0.4, h * 0.2);
    ctx.lineTo(w * 0.6, h * 0.2);
    ctx.lineTo(w * 0.7, h * 0.8);
    ctx.lineTo(w, h * 0.8);
  }

  // Modulação AM
  else if (tipo === 'am') {
    const carrierFreq = 30;
    const modFreq = 3;
    const modAmplitude = 0.5;

    for (let x = 0; x < w; x++) {
      const t = x / w;
      const mod = 1 + modAmplitude * Math.sin(2 * Math.PI * modFreq * t);
      const y = midY + mod * (h / 4) * Math.sin(2 * Math.PI * carrierFreq * t);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }

  // Modulação FM
  else if (tipo === 'fm') {
    const carrierFreq = 10;
    const modFreq = 2;
    const modIndex = 10;

    for (let x = 0; x < w; x++) {
      const t = x / w;
      const y = midY + (h / 3) * Math.sin(2 * Math.PI * carrierFreq * t + modIndex * Math.sin(2 * Math.PI * modFreq * t));
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
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
  if (currentLesson === 3) {
    const carrier = audioContext.createOscillator();
    const mod = audioContext.createOscillator();
    const mg = audioContext.createGain(); // modulation gain
    const output = audioContext.createGain(); // final output
  
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(440, audioContext.currentTime);
    mod.frequency.setValueAtTime(30, audioContext.currentTime);
  
    if (audioTypes[currentAnswer] === 'am') {
      // Inicializa o ganho com 1 (nível base), varia entre 0.5 e 1.5
      mg.gain.setValueAtTime(0.5, audioContext.currentTime);
      
      // Conecta modulação ao ganho do volume (AM)
      mod.connect(mg);
      mg.connect(output.gain);     // output.gain é o volume da portadora
      carrier.connect(output);
      output.connect(audioContext.destination);
    } else {
      // FM: modula frequência diretamente
      mg.gain.setValueAtTime(100, audioContext.currentTime);
      mod.connect(mg).connect(carrier.frequency);
      carrier.connect(audioContext.destination);
    }
  
    mod.start();
    carrier.start();
    setTimeout(() => {
      carrier.stop();
      mod.stop();
    }, dur * 1000);
  } 
}

function checkAnswer(selected) {
  playFeedbackSound(selected === currentAnswer ? 'success' : 'error');
  if (selected===currentAnswer) {
    showOverlay('success');
    lessonScores[currentLesson]+=10; score+=10;
    const key = audioTypes[currentAnswer];
    infoText.textContent = infoContent[key].text;
    document.getElementById('info-extra').textContent = infoContent[key].extra;
    desenharOnda(key);
    resultText.textContent = '✅ Correto!'; resultText.style.color='var(--primary-green)';
  } else {
    showOverlay('error');
    if (isInfinityMode) {
      lives--;
      // atualiza visual
      const hearts = '❤️'.repeat(lives) + '🤍'.repeat(3 - lives);
      document.getElementById('vidas').textContent = hearts;
      if (lives <= 0) {
        // fim de jogo: volta ao menu e mantém apenas o score máximo
        setTimeout(voltarParaMenu, 500);
        return;
      }
      resultText.textContent = `❌ Errado! Vidas: ${lives}`;
      resultText.style.color = '#f44336';
    } else {
      lessonScores[currentLesson]=Math.max(lessonScores[currentLesson]-5,0);
      score=Math.max(score-5,0);
      resultText.textContent = '❌ Errado!'; resultText.style.color='#f44336';
    }
    
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
  const progress = lessonScores[currentLesson] || 0;
  const percentage = Math.min(progress / threshold * 100, 100);
  progressBar.style.width = `${percentage}%`;
  
  // Verifica se a lição foi completada
  if (progress >= threshold) {
    showLessonCompletePopup();
  }
}

function showLessonCompletePopup() {
  // Verifica se o pop-up já foi mostrado para evitar repetição
  if (!document.body.classList.contains(`lesson-${currentLesson}-completed`)) {
    document.body.classList.add(`lesson-${currentLesson}-completed`);
    
    Swal.fire({
      title: '🎉 Parabéns!',
      text: `Você completou a Lição ${currentLesson}!`,
      icon: 'success',
      confirmButtonText: 'Continuar',
      customClass: {
        popup: 'popup-finalizacao'
      }
    });
  }
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
