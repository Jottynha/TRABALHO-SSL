// js/drawing.js
export function desenharOnda(tipo) {
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
        const t = x / w;
  
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
    } else if (tipo === 'lowpass') {
      ctx.moveTo(0, h * 0.2);
      ctx.lineTo(w * 0.4, h * 0.2);
      ctx.lineTo(w * 0.6, h * 0.8);
      ctx.lineTo(w, h * 0.8);
    } else if (tipo === 'highpass') {
      ctx.moveTo(0, h * 0.8);
      ctx.lineTo(w * 0.4, h * 0.8);
      ctx.lineTo(w * 0.6, h * 0.2);
      ctx.lineTo(w, h * 0.2);
    } else if (tipo === 'bandpass') {
      ctx.moveTo(0, h * 0.8);
      ctx.lineTo(w * 0.3, h * 0.8);
      ctx.lineTo(w * 0.4, h * 0.2);
      ctx.lineTo(w * 0.6, h * 0.2);
      ctx.lineTo(w * 0.7, h * 0.8);
      ctx.lineTo(w, h * 0.8);
    } else if (tipo === 'am') {
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
    } else if (tipo === 'fm') {
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

  export function drawUnitStep(ctx, displacement) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, '#e0f7fa'); 
    gradient.addColorStop(1, '#b2ebf2'); 
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2); // Eixo X
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.moveTo(ctx.canvas.width / 2, 0); // Eixo Y
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.stroke();
  
    // Configurar o estilo do degrau
    ctx.strokeStyle = '#00796b'; // Verde escuro
    ctx.lineWidth = 3;
  
    // Desenhar o degrau unitário deslocado com suavidade
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const stepPosition = centerX + displacement; // Posição do deslocamento
  
    ctx.beginPath();
    ctx.moveTo(0, centerY); // Linha horizontal antes do degrau
    ctx.lineTo(stepPosition - 10, centerY); // Suavizar antes do degrau
    ctx.quadraticCurveTo(stepPosition, centerY, stepPosition, centerY - 10); // Curva suave na subida
    ctx.lineTo(stepPosition, centerY - 50); // Subida do degrau
    ctx.quadraticCurveTo(stepPosition, centerY - 60, stepPosition + 10, centerY - 60); // Suavizar após o degrau
    ctx.lineTo(ctx.canvas.width, centerY - 60); // Linha horizontal após o degrau
    ctx.stroke();
  
    // Adicionar sombra ao degrau
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
  
    // Re-desenhar o degrau para aplicar a sombra
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(stepPosition - 10, centerY);
    ctx.quadraticCurveTo(stepPosition, centerY, stepPosition, centerY - 10);
    ctx.lineTo(stepPosition, centerY - 50);
    ctx.quadraticCurveTo(stepPosition, centerY - 60, stepPosition + 10, centerY - 60);
    ctx.lineTo(ctx.canvas.width, centerY - 60);
    ctx.stroke();
  
    // Remover sombra para futuros desenhos
    ctx.shadowColor = 'transparent';
  }
  
  export function drawScaledSignal(ctx, scaleFactor) {
    // Limpar o canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Configurar o estilo do gráfico
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
  
    // Criar gradiente para o fundo
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, '#ffebee'); // Vermelho claro
    gradient.addColorStop(1, '#ffcdd2'); // Vermelho mais escuro
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Desenhar os eixos
    ctx.strokeStyle = '#000'; // Preto para os eixos
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2); // Eixo X
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.moveTo(ctx.canvas.width / 2, 0); // Eixo Y
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.stroke();
  
    // Desenhar o sinal "Normal"
    ctx.strokeStyle = 'blue'; // Azul para o sinal normal
    ctx.lineWidth = 2;
    ctx.beginPath();
  
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const amplitude = 50; // Amplitude do sinal
    const frequency = 0.05; // Frequência base do sinal
  
    for (let x = 0; x < ctx.canvas.width; x++) {
      const normalY = centerY - amplitude * Math.sin(frequency * (x - centerX)); // Onda senoidal normal
      if (x === 0) {
        ctx.moveTo(x, normalY);
      } else {
        ctx.lineTo(x, normalY);
      }
    }
  
    ctx.stroke();
  
    // Desenhar o sinal escalonado
    ctx.strokeStyle = 'red'; // Vermelho para o sinal escalonado
    ctx.lineWidth = 2;
    ctx.beginPath();
  
    for (let x = 0; x < ctx.canvas.width; x++) {
      const scaledX = (x - centerX) * scaleFactor; // Aplicar o fator de escala
      const scaledY = centerY - amplitude * Math.sin(frequency * scaledX); // Onda senoidal escalonada
      if (x === 0) {
        ctx.moveTo(x, scaledY);
      } else {
        ctx.lineTo(x, scaledY);
      }
    }
  
    ctx.stroke();

  ctx.font = '10px Poppins, sans-serif';
  ctx.fillStyle = 'blue';
  ctx.fillText('Sinal Original', 10, 10);
  ctx.fillStyle = 'red';
  ctx.fillText('Sinal com Mudança de Escala', 10, 30);
}

export function drawAmplitudeChange(ctx, amplitudeFactor) {
  // Limpar o canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Criar um fundo com gradiente (opcional)
  const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
  gradient.addColorStop(0, '#f1f8e9'); // Verde muito claro
  gradient.addColorStop(1, '#dcedc8'); // Verde claro
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Desenhar os eixos
  ctx.strokeStyle = '#000'; // Preto
  ctx.lineWidth = 1;
  ctx.beginPath();
  // Eixo X
  ctx.moveTo(0, ctx.canvas.height / 2);
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
  // Eixo Y
  ctx.moveTo(ctx.canvas.width / 2, 0);
  ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
  ctx.stroke();
  
  // Parâmetros do sinal
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const baseAmplitude = 50;  // Amplitude padrão do sinal
  const frequency = 0.05;    // Frequência do sinal
  
  // Desenhar o sinal original (em azul)
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < ctx.canvas.width; x++) {
    const y = centerY - baseAmplitude * Math.sin(frequency * (x - centerX));
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  
  // Desenhar o sinal com amplitude alterada (em vermelho)
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < ctx.canvas.width; x++) {
    const y = centerY - (baseAmplitude * amplitudeFactor) * Math.sin(frequency * (x - centerX));
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  ctx.font = '10px Poppins, sans-serif';
  ctx.fillStyle = 'blue';
  ctx.fillText('Sinal Original', 10, 10);
  ctx.fillStyle = 'red';
  ctx.fillText('Sinal com Amplitude Alterada', 10, 30);
}

export function generateRandomWave(ctx) {
  const centerY = ctx.canvas.height / 2;
  const amplitude = Math.random() * 60 + 20;    // 20–80
  const frequency = Math.random() * 0.08 + 0.02; // 0.02–0.10
  const phase = Math.random() * Math.PI * 2;
  const wave = [];
  for (let x = 0; x < ctx.canvas.width; x++) {
    wave.push(centerY + amplitude * Math.sin(frequency * (x - ctx.canvas.width/2) + phase));
  }
  return wave;
}

export function drawWave(ctx, wave, color, lineWidth = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  wave.forEach((y, x) => x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.stroke();
  ctx.stroke();
  ctx.font = '10px Poppins, sans-serif';
  ctx.fillStyle = 'blue';
  ctx.fillText('Sinal 1', 130, 10);
  ctx.fillStyle = 'green';
  ctx.fillText('Sinal 2', 130, 20);
  ctx.fillStyle = 'red';
  ctx.fillText('Sinal Resultante', 130, 30);
}

export function drawCombinedWave(ctx, wave1, wave2, operation) {
  const centerY = ctx.canvas.height / 2;
  const result = wave1.map((y1, x) => {
    const y2 = wave2[x];
    // traz de volta ao mesmo eixo
    return operation === 'Soma'
      ? y1 + (y2 - centerY)
      : y1 - (y2 - centerY);
  });
  drawWave(ctx, result, 'red', 3);
}

export function drawAxes(ctx) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const cx = cw / 2;
  const cy = ch / 2;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  // Eixo X
  ctx.moveTo(0, cy);
  ctx.lineTo(cw, cy);
  // Eixo Y
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, ch);
  ctx.stroke();
}
