
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const fontSize = 14;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = document.body.classList.contains('dark') ? '#eee' : '#333';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

let matrixInterval = setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

document.getElementById('matrixToggle').addEventListener('click', () => {
  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
    ctx.clearRect(0, 0, width, height);
  } else {
    matrixInterval = setInterval(drawMatrix, 50);
  }
});

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

document.getElementById('year').textContent = new Date().getFullYear();
