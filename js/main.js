import { initAudio, playSoundForLesson } from './audio.js';
import { toggleDarkMode, DOM, updateHighScore, unlockLesson } from './ui.js';
import { setupQuestion, state, audioTypes,lessonTips, updateCompletedLessons } from './questions.js';


const LS_USERS_KEY = 'ssl_users';
function loadUsers() {
  return JSON.parse(localStorage.getItem(LS_USERS_KEY) || '{}');
}
function saveUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

let isLoginMode = true;
let currentUser = null;

// Elementos de Auth (certifique-se de tê-los no HTML)
const authScreen     = document.getElementById('auth-screen');
const authTitle      = document.getElementById('auth-title');
const authUsername   = document.getElementById('auth-username');
const authPassword   = document.getElementById('auth-password');
const btnAuthAction  = document.getElementById('btn-auth-action');
const toggleAuth     = document.getElementById('toggle-auth');
const authError      = document.getElementById('auth-error');

// Mostra tela de login/cadastro
function showAuth() {
  authScreen.style.display      = 'block';
  DOM.welcomeScreen.style.display  = 'none';
  DOM.menuScreen.style.display     = 'none';
  DOM.gameScreen.style.display     = 'none';
  DOM.infoCard.style.display       = 'none';
  DOM.highscoreCard.style.display  = 'none';
  DOM.completedLessonsCard.style.display = 'none';
  DOM.tips.style.display          = 'none';
  document.querySelector('.progress-container').style.display = 'none';
}

// Mostra tela inicial do jogo
function showWelcome() {
  const saved = JSON.parse(localStorage.getItem('ssl_state'));
  if (saved) {
    Object.assign(state, saved);
    updateHighScore(state.highScore);
    updateCompletedLessons();
    for (const lesson of state.lessonsCompleted) {
      unlockLesson(lesson+1);
    }
  } 

  authScreen.style.display      = 'none';
  DOM.welcomeScreen.style.display  = 'flex';
  DOM.menuScreen.style.display     = 'block';
  DOM.gameScreen.style.display     = 'none';
  DOM.infoCard.style.display       = 'block';
  DOM.highscoreCard.style.display  = 'block';
  DOM.completedLessonsCard.style.display = 'block';
  DOM.tips.style.display          = 'block';
  document.querySelector('.progress-container').style.display = 'none';
}

// Alterna entre modo Login e Cadastro
toggleAuth.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  authTitle.textContent      = isLoginMode ? 'Login' : 'Criar conta';
  btnAuthAction.textContent  = isLoginMode ? 'Entrar' : 'Cadastrar';
  toggleAuth.textContent     = isLoginMode ? 'Criar conta' : 'Já tenho conta';
  authError.style.display    = 'none';
});

// Ação de Login/Cadastro
btnAuthAction.addEventListener('click', () => {
  const users = loadUsers();
  const u = authUsername.value.trim();
  const p = authPassword.value;

  if (!u || !p) {
    authError.textContent = 'Preencha usuário e senha';
    authError.style.display = 'block';
    return;
  }

  if (isLoginMode) {
    // LOGIN
    if (!users[u] || users[u].password !== p) {
      authError.textContent = 'Usuário ou senha inválidos';
      authError.style.display = 'block';
      return;
    }
    // Restaura estado
    Object.assign(state, users[u].state || {});
  } else {
    // CADASTRO
    if (users[u]) {
      authError.textContent = 'Usuário já existe';
      authError.style.display = 'block';
      return;
    }
    users[u] = { password: p, state: { ...state } };
    saveUsers(users);
  }

  currentUser = u;
  showWelcome();
});

// Salva state ao fechar / recarregar
window.addEventListener('beforeunload', () => {
  if (currentUser) {
    const users = loadUsers();
    users[currentUser].state = { ...state };
    saveUsers(users);
  }
});

// Inicializa na abertura
showAuth();

export function saveState() {
  localStorage.setItem('ssl_state', JSON.stringify(state));
  if (currentUser) {
    const users = loadUsers();
    users[currentUser].state = { ...state };
    saveUsers(users);
  }
}

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
    DOM.menuScreen.style.display = 'block';
    DOM.gameScreen.style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
    
  }
  
  
// Função para iniciar uma lição específica
function startLesson(lessonNumber) {
  updateTipsContent(lessonNumber)
  state.currentLesson = lessonNumber;
  DOM.menuScreen.style.display = 'none';
  DOM.gameScreen.style.display = 'block';
  document.querySelector('.progress-container').style.display = 'block';
  DOM.resultText.textContent = '';
  DOM.infoText.textContent = 'Acerte para ver detalhes aqui.';
  initAudio();
  setupQuestion();
}

function updateTipsContent(lesson) {
  const tipsContent = document.getElementById('tips-content');
  if (lessonTips[lesson]) {
    tipsContent.textContent = lessonTips[lesson];
  } else {
    tipsContent.textContent = "Nenhuma dica disponível para esta lição.";
  }
}

// Inicializa os eventos da interface
function initUI() {
  document.getElementById('wave-canvas').style.display = 'none';
  document.getElementById('game-screen').style.display = 'none';
  // Botões de modos
  DOM.btnLessonMode.addEventListener('click', () => {
    state.isInfinityMode = false;
    DOM.welcomeScreen.style.display = 'none';
    DOM.menuScreen.style.display = 'block';
    document.querySelector('.progress-container').style.display = 'none';
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
  document.getElementById('lesson-btn-5').addEventListener('click', () => startLesson(5));
  document.getElementById('lesson-btn-6').addEventListener('click', () => startLesson(6));
  document.getElementById('lesson-btn-7').addEventListener('click', () => startLesson(7));
  document.getElementById('lesson-btn-8').addEventListener('click', () => startLesson(8));
  document.getElementById('lesson-btn-9').addEventListener('click', () => startLesson(9));
  document.getElementById('lesson-btn-10').addEventListener('click', () => startLesson(10));
  // Botão para voltar ao menu
  DOM.btnVoltarMenu.addEventListener('click', returnToWelcome);

  // Botão para tocar o som
  document.getElementById('btn-play-sound').addEventListener('click', () => {
    playSoundForLesson(state.currentLesson, state.currentAnswer, audioTypes);
  });

  // Botão de alternar modo escuro
  DOM.toggleDark.addEventListener('click', toggleDarkMode);

  const infoButton = document.getElementById('btn-info');
  const modal = document.getElementById('info-modal');
  const closeModal = document.getElementById('close-modal');
  infoButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
}

initUI();

const saved = JSON.parse(localStorage.getItem('ssl_state'));
if (saved) {
  Object.assign(state, saved);
}
const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.btn-option').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const difficulty = btn.getAttribute('data-difficulty');
    if (!difficulty) {
      tooltip.style.display = 'none';
      return;
    }
    tooltip.style.display = 'block';
    tooltip.textContent = 'Nível: ' + difficulty;
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
  });
  
  btn.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});

document.getElementById('btn-settings').addEventListener('click', () => {
  document.getElementById('settings-modal').style.display = 'block';
});

document.getElementById('close-settings').addEventListener('click', () => {
  document.getElementById('settings-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
  const modal = document.getElementById('settings-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.getElementById('btn-clear-scores').addEventListener('click', () => {
  Swal.fire({
    title: 'Tem certeza?',
    text: "Todos os scores das lições serão apagados!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, apagar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      for (let i = 1; i <= 10; i++) {
        state.lessonScores[i] = 0;
      }
      state.score = 0;
      state.highScore = 0;
      state.lessonsCompleted = [];
      document.getElementById('highscore-value').innerText = '0';
      document.getElementById('completed-lessons-content').innerHTML = '<p>Nenhuma lição concluída ainda.</p>';

      Swal.fire('Apagado!', 'Os scores foram zerados.', 'success');
    }
  });
});
