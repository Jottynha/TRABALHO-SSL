import { initAudio, playSoundForLesson } from './audio.js';
import { toggleDarkMode, DOM } from './ui.js';
import { setupQuestion, state, audioTypes } from './questions.js';

export function returnToWelcome() {
    // Reseta o estado
    state.isInfinityMode = false;
    state.currentLesson = 0;
    state.lives = 3;
    state.score = 0;
    for (let l in state.lessonScores) {
      state.lessonScores[l] = 0;
    }
    
    // Reinicializa os elementos da interface conforme o layout original
    DOM.vidasEl.style.display = 'none';
    // Define explicitamente o display do welcome screen para 'flex', conforme o CSS original
    DOM.welcomeScreen.style.display = 'flex';
    
    // Garante que outras telas estejam ocultas e que a barra de progresso seja escondida
    DOM.menuScreen.style.display = 'none';
    DOM.gameScreen.style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
    
    // (Opcional) Se houver algum outro elemento que precise ser resetado, faça-o aqui.
  }
  
  
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
  DOM.btnVoltarMenu.addEventListener('click', returnToWelcome);

  // Botão para tocar o som
  document.getElementById('btn-play-sound').addEventListener('click', () => {
    playSoundForLesson(state.currentLesson, state.currentAnswer, audioTypes);
  });

  // Botão de alternar modo escuro
  DOM.toggleDark.addEventListener('click', toggleDarkMode);
}

initUI();
