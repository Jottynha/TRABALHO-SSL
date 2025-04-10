// js/questions.js
import { DOM, showOverlay, updateScore, updateProgress, showLessonCompletePopup, unlockLesson } from './ui.js';
import { playFeedbackSound } from './audio.js';
import { desenharOnda } from './drawing.js';
import { returnToWelcome } from './main.js';
import { updateHighScore } from './ui.js';


export const state = {
  currentLesson: 0,
  currentAnswer: '',
  score: 0,
  lives: 3,
  isInfinityMode: false,
  lessonScores: { 1: 0, 2: 0, 3: 0 },
  threshold: 50,
  highScore: 0
};

export const audioTypes = {
  'Onda senoidal': 'sine',
  'Onda quadrada': 'square',
  'Onda dente de serra': 'sawtooth',
  'Filtro passa-baixa': 'lowpass',
  'Filtro passa-alta': 'highpass',
  'Filtro passa-banda': 'bandpass',
  'Modulação AM': 'am',
  'Modulação FM': 'fm'
};

export const infoContent = {
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

export function setupQuestion() {
  DOM.optionsContainer.innerHTML = '';
  let opts = [];
  if (state.isInfinityMode) {
    const allOptions = {
      1: ['Onda senoidal', 'Onda quadrada', 'Onda dente de serra'],
      2: ['Filtro passa-baixa', 'Filtro passa-alta', 'Filtro passa-banda'],
      3: ['Modulação AM', 'Modulação FM']
    };
    const randomLesson = Math.floor(Math.random() * 3) + 1;
    state.currentLesson = randomLesson;
    opts = allOptions[randomLesson];
  } else {
    if (state.currentLesson === 1)
      opts = ['Onda senoidal', 'Onda quadrada', 'Onda dente de serra'];
    if (state.currentLesson === 2)
      opts = ['Filtro passa-baixa', 'Filtro passa-alta', 'Filtro passa-banda'];
    if (state.currentLesson === 3)
      opts = ['Modulação AM', 'Modulação FM'];
  }

  opts.sort(() => Math.random() - 0.5);
  state.currentAnswer = opts[Math.floor(Math.random() * opts.length)];

  opts.forEach((opt) => {
    const b = document.createElement('button');
    b.className = 'btn btn-option';
    b.textContent = opt;
    b.onclick = () => checkAnswer(opt);
    DOM.optionsContainer.appendChild(b);
  });
}

export function checkAnswer(selected) {
  playFeedbackSound(selected === state.currentAnswer ? 'success' : 'error');
  if (selected === state.currentAnswer) {
    showOverlay('success');
    state.lessonScores[state.currentLesson] += 10;
    state.score += 10;
    // Atualiza as informações
    const key = audioTypes[state.currentAnswer];
    DOM.infoText.textContent = infoContent[key].text;
    DOM.infoExtra.textContent = infoContent[key].extra;
    desenharOnda(key);
    DOM.resultText.textContent = '✅ Correto!';
    DOM.resultText.style.color = 'var(--primary-green)';
  } else {
    showOverlay('error');
    if (state.isInfinityMode) {
      state.lives--;
      const hearts = '❤️'.repeat(state.lives) + '🤍'.repeat(3 - state.lives);
      DOM.vidasEl.textContent = hearts;
      if (state.lives <= 0) {
        Swal.fire({
          title: 'Fim de Jogo!',
          text: 'Você perdeu todas as vidas!',
          icon: 'error',
          confirmButtonText: 'Voltar para o início'
        }).then(() => {
          returnToWelcome();
        });
        return; // Interrompe a execução da função
      }
      
      DOM.resultText.textContent = `❌ Errado! Vidas: ${state.lives}`;
      DOM.resultText.style.color = '#f44336';
    } else {
      state.lessonScores[state.currentLesson] = Math.max(
        state.lessonScores[state.currentLesson] - 5,
        0
      );
      state.score = Math.max(state.score - 5, 0);
      DOM.resultText.textContent = '❌ Errado!';
      DOM.resultText.style.color = '#f44336';
    }
  }
  updateScore(state.score);
  updateProgress(state.lessonScores[state.currentLesson], state.threshold);
  if (state.lessonScores[state.currentLesson] >= state.threshold) {
    unlockLesson(state.currentLesson + 1);
    showLessonCompletePopup(state.currentLesson);
  }
  if (state.score > state.highScore) {
    state.highScore = state.score;
    updateHighScore(state.highScore);  // Atualiza o DOM com a maior pontuação
  }

  setTimeout(setupQuestion, 1200);
}
