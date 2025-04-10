// js/ui.js
export const DOM = {
    welcomeScreen: document.getElementById('welcome-screen'),
    menuScreen: document.getElementById('menu-screen'),
    gameScreen: document.getElementById('game-screen'),
    btnVoltarMenu: document.getElementById('btn-voltar-menu'),
    btnLessonMode: document.getElementById('btn-lesson-mode'),
    btnInfinityMode: document.getElementById('btn-infinity-mode'),
    toggleDark: document.getElementById('toggle-dark'),
    scoreEl: document.getElementById('score'),
    vidasEl: document.getElementById('vidas'),
    progressBar: document.getElementById('progress-bar'),
    resultText: document.getElementById('result'),
    lessonTitle: document.getElementById('lesson-title'),
    infoText: document.getElementById('info-text'),
    infoExtra: document.getElementById('info-extra'),
    optionsContainer: document.getElementById('options-container'),
    overlay: document.getElementById('overlay')
  };
  
  export function updateHighScore(highScore) {
    const highScoreEl = document.getElementById('highscore-value');
    highScoreEl.textContent = highScore;
  }

  export function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  
  export function updateScore(score) {
    DOM.scoreEl.textContent = score;
    DOM.scoreEl.classList.add('animate');
    setTimeout(() => DOM.scoreEl.classList.remove('animate'), 300);
  }
  
  export function updateProgress(progress, threshold) {
    const percentage = Math.min((progress / threshold) * 100, 100);
    DOM.progressBar.style.width = `${percentage}%`;
    // Aqui, você pode incluir lógica para pop-ups ou alertas de conclusão de lição.
  }
  
  export function showOverlay(type) {
    DOM.overlay.className = 'overlay ' + type;
    setTimeout(() => (DOM.overlay.className = 'overlay'), 500);
  }
  
  export function showLessonCompletePopup(currentLesson) {
    // Checa se a lição já está concluída para evitar pop-ups repetidos.
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
  
  export function unlockLesson(lessonNumber) {
    const btn = document.getElementById(`lesson-btn-${lessonNumber}`);
    if (btn) {
      btn.disabled = false;
      btn.style.borderColor = 'var(--primary-green)';
    }
  }
  