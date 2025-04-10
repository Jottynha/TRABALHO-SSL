import { initAudio, playSoundForLesson } from './audio.js';
import { toggleDarkMode, DOM } from './ui.js';
import { setupQuestion, state, audioTypes } from './questions.js';

// Função para iniciar uma lição específica
function startLesson(lessonNumber) {
  state.currentLesson = lessonNumber;
  DOM.menuScreen.style.display = 'none';
  DOM.gameScreen.style.display = 'block';
  DOM.resultText.textContent = '';
  DOM.infoText.textContent = 'Acerte para ver detalhes aqui.';
  initAudio();
  setupQuestion();
}

// Inicializa os eventos da interface
function initUI() {
  // Botões de modos
  DOM.btnLessonMode.addEventListener('click', () => {
    state.isInfinityMode = false;
    DOM.welcomeScreen.style.display = 'none';
    DOM.menuScreen.style.display = 'block';
    document.querySelector('.progress-container').style.display = 'block';
  });

  DOM.btnInfinityMode.addEventListener('click', () => {
    state.isInfinityMode = true;
    state.currentLesson = 0;
    state.lives = 3;
    DOM.vidasEl.textContent = '❤️❤️❤️';
    DOM.vidasEl.style.display = 'inline';
    document.querySelector('.progress-container').style.display = 'none';
    state.score = 0;
    for (let l in state.lessonScores) state.lessonScores[l] = 0;
    DOM.welcomeScreen.style.display = 'none';
    DOM.menuScreen.style.display = 'none';
    DOM.gameScreen.style.display = 'block';
    DOM.resultText.textContent = '';
    DOM.infoText.textContent = 'Acerte para ver detalhes aqui.';
    initAudio();
    setupQuestion();
  });

  // Adiciona os event listeners para cada botão de lição
  document.getElementById('lesson-btn-1').addEventListener('click', () => startLesson(1));
  document.getElementById('lesson-btn-2').addEventListener('click', () => startLesson(2));
  document.getElementById('lesson-btn-3').addEventListener('click', () => startLesson(3));
  document.getElementById('lesson-btn-4').addEventListener('click', () => startLesson(4));

  // Botão para voltar ao menu
  DOM.btnVoltarMenu.addEventListener('click', () => {
    DOM.gameScreen.style.display = 'none';
    DOM.menuScreen.style.display = 'block';
  });

  // Botão para tocar o som
  document.getElementById('btn-play-sound').addEventListener('click', () => {
    playSoundForLesson(state.currentLesson, state.currentAnswer, audioTypes);
  });

  // Botão de alternar modo escuro
  DOM.toggleDark.addEventListener('click', toggleDarkMode);
}

initUI();
