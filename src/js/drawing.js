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
  