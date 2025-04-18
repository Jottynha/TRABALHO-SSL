// js/questions.js
import { DOM, showOverlay, updateScore, updateProgress, showLessonCompletePopup, unlockLesson } from './ui.js';
import { playFeedbackSound } from './audio.js';
import { desenharOnda, drawScaledSignal, drawUnitStep, drawAmplitudeChange, generateRandomWave,drawWave, drawCombinedWave,drawAxes } from './drawing.js';
import { returnToWelcome } from './main.js';
import { updateHighScore } from './ui.js';


export const state = {
  currentLesson: 0,
  currentAnswer: '',
  score: 0,
  lives: 3,
  isInfinityMode: false,
  lessonScores: { 1: 0, 2: 0, 3: 0 , 4: 0, 5: 0, 6: 0, 7:0},
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
  'Modulação FM': 'fm',
  'u(t + t0)':'shiftleft', 
  'u(t - t0)':'shiftright',
  'Compressão': 'compress',
  'Expansão': 'expand',
  'Amplitude Aumentada': 'ampup',
  'Amplitude Reduzida': 'ampdown',
  'Soma': 'sum',
  'Subtração': 'subtract',
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
  },
  shiftleft: {
    text: 'Deslocamento para a Esquerda: adianta o sinal no tempo.',
    extra: 'Usado para simular antecipações em sistemas de controle e processamento digital.'
  },
  shiftright: {
    text: 'Deslocamento para a Direita: atrasa o sinal no tempo.',
    extra: 'Empregado em análise de resposta temporal e filtragem de sinais.'
  },
  compress: {
    text: 'Compressão: reduz o volume de um sinal.',
    extra: 'Usado em sistemas de controle e processamento digital.'
  },
  expand: {
    text: 'Expansão: aumenta o volume de um sinal.',
    extra: 'Usado em sistemas de controle e processamento digital.'
  },
  ampup: {
    text: 'Amplitude Aumentada: o sinal apresenta maior variação em torno do zero.',
    extra: 'Isso pode representar um aumento de volume ou intensidade no sinal.'
  },
  ampdown: {
    text: 'Amplitude Reduzida: o sinal apresenta menor variação em torno do zero.',
    extra: 'Isso pode representar uma redução de volume ou intensidade no sinal.'
  },
  sum:{
    text: 'Soma de Sinais: combinação ponto a ponto das amplitudes.',
    extra: 'Representa a adição dos valores instantâneos de cada sinal, podendo reforçar ou atenuar trechos.'
  },
  subtract: {
    text: 'Subtração de Sinais: diferença ponto a ponto das amplitudes.',
    extra: 'Representa a subtração dos valores instantâneos de cada sinal, útil para análises de interferência e cancelamento.'
  }
};

const playSoundButton = document.getElementById('btn-play-sound');
const canvas = document.getElementById('wave-canvas-game');
const canvas_result = document.getElementById('wave-canvas');
const ctx = canvas.getContext('2d');

export function setupQuestion() {
  DOM.optionsContainer.innerHTML = '';
  let opts = [];
  if (state.isInfinityMode) {
    const allOptions = {
      1: ['Onda senoidal', 'Onda quadrada', 'Onda dente de serra'],
      2: ['Filtro passa-baixa', 'Filtro passa-alta', 'Filtro passa-banda'],
      3: ['Modulação AM', 'Modulação FM'],
      4: ['u(t + t0)', 'u(t - t0)'],
      5: ['Compressão', 'Expansão'],
      6: ['Amplitude Aumentada', 'Amplitude Reduzida'],
      7: ['Soma', 'Subtração']
    };
    const randomLesson = Math.floor(Math.random() * 7) + 1;
    state.currentLesson = randomLesson;
    opts = allOptions[randomLesson];    

  } else {
    const questionTextElement = document.getElementById('question-text'); // Elemento para exibir a pergunta
    if (state.currentLesson === 1) {
      opts = ['Onda senoidal', 'Onda quadrada', 'Onda dente de serra'];
      questionTextElement.textContent = 'Qual é o tipo de onda?'; // Pergunta para a lição 1
    }
    if (state.currentLesson === 2) {
      opts = ['Filtro passa-baixa', 'Filtro passa-alta', 'Filtro passa-banda'];
      questionTextElement.textContent = 'Qual é o tipo de filtro?'; // Pergunta para a lição 2
    }
    if (state.currentLesson === 3) {
      opts = ['Modulação AM', 'Modulação FM'];
      questionTextElement.textContent = 'Qual é o tipo de modulação?'; // Pergunta para a lição 3
    }
    if (state.currentLesson === 4) {
      opts = ['u(t + t0)', 'u(t - t0)'];
      questionTextElement.textContent = 'Qual é o deslocamento feito levando em conta o degrau unitário u(t)?'; 
    }
    if (state.currentLesson === 5) {
      opts = ['Compressão', 'Expansão'];
      questionTextElement.textContent = 'Qual é o tipo de mudança de escala?'; // Pergunta para a lição 5
    }
    if (state.currentLesson === 6) {
      opts = ['Amplitude Aumentada', 'Amplitude Reduzida'];
      questionTextElement.textContent = 'Como foi alterada a amplitude do sinal?';
    }
    if (state.currentLesson === 7) {
      opts = ['Soma', 'Subtração'];
      questionTextElement.textContent = 'Você deve somar ou subtrair estes sinais?';
    }
  }

  
  if (state.currentLesson === 4) {
    playSoundButton.disabled = true;
    canvas.style.display = 'block';
    // Gerar deslocamento aleatório (-50 para esquerda, +50 para direita)
    const displacement = Math.floor(Math.random() * 101) - 50;
    drawUnitStep(ctx, displacement);
    state.currentAnswer = displacement > 0 ? 'u(t - t0)' : 'u(t + t0)';    
    canvas_result.style.display = 'none';
  }
  else if (state.currentLesson === 5) {
    playSoundButton.disabled = true;
    canvas.style.display = 'block';
    const constant = Math.random() * (4 - 0.5) + 0.5;
    drawScaledSignal(ctx, constant);
    state.currentAnswer = constant > 1 ? 'Compressão' : 'Expansão';    
    canvas_result.style.display = 'none';
  } else if (state.currentLesson === 6) {
    playSoundButton.disabled = true;
    canvas.style.display = 'block';
    const isAmplified = Math.random() < 0.5;
    const amplitudeFactor = isAmplified 
    ? Math.random() * (2 - 1) + 1  // Valor entre 1 e 2
    : Math.random() * (1 - 0.5) + 0.5;  // Valor entre 0.5 e 1
    drawAmplitudeChange(ctx, amplitudeFactor);
    state.currentAnswer = isAmplified ? 'Amplitude Aumentada' : 'Amplitude Reduzida';
    canvas_result.style.display = 'none';
  } else if (state.currentLesson === 7) {
    playSoundButton.disabled = true;
    canvas.style.display = 'block';
    canvas_result.style.display = 'none'; 
    const wave1 = generateRandomWave(ctx);
    const wave2 = generateRandomWave(ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(ctx);           
    drawWave(ctx, wave1, 'blue');
    drawWave(ctx, wave2, 'green');
    const operation = Math.random() < 0.5 ? 'Soma' : 'Subtração'; 
    state.currentAnswer = operation;
    state._wave1 = wave1;
    state._wave2 = wave2;
    drawCombinedWave(ctx, wave1, wave2, operation);
  } else {
    canvas.style.display = 'none';
    playSoundButton.disabled = false;
  }

  opts.sort(() => Math.random() - 0.5);
  if (![4, 5, 6, 7].includes(state.currentLesson)) {
    state.currentAnswer = opts[Math.floor(Math.random() * opts.length)];
  }
  opts.forEach((opt) => {
    const b = document.createElement('button');
    b.className = 'btn btn-option';
    b.textContent = opt;
    b.onclick = () => checkAnswer(opt);
    DOM.optionsContainer.appendChild(b);
  });
}

export function updateCompletedLessons() {
  const container = document.getElementById('completed-lessons-content');
  container.innerHTML = ''; // Limpa o conteúdo atual

  // Usamos state.lessonScores e state.threshold para checar se a lição foi concluída
  let completadas = [];
  for (let lesson in state.lessonScores) {
    if (state.lessonScores[lesson] >= state.threshold) {
      completadas.push(`Lição ${lesson}`);
    }
  }

  if (completadas.length === 0) {
    container.innerHTML = '<p>Nenhuma lição concluída ainda.</p>';
  } else {
    completadas.forEach(l => {
      const p = document.createElement('p');
      p.textContent = l;
      container.appendChild(p);
    });
  }
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
    if (state.currentLesson === 4 || state.currentLesson === 5 || state.currentLesson === 6) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
    updateCompletedLessons();
  }
  if (state.score > state.highScore) {
    state.highScore = state.score;
    updateHighScore(state.highScore);  // Atualiza o DOM com a maior pontuação
  }

  setTimeout(setupQuestion, 1200);
}

