const yesBtn   = document.getElementById('yesBtn');
const noBtn    = document.getElementById('noBtn');
const closeBtn = document.getElementById('closeBtn');
const result   = document.getElementById('result');

const HEARTS = ['❤️', '💖', '💕', '💗', '💘'];
let heartTimer = null;
let heartLayer = null;

// สร้างหัวใจ 1 ดวง ลอยขึ้นจากด้านล่าง
function spawnHeart() {
  const h = document.createElement('span');
  h.className = 'heart-float';
  h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = 18 + Math.random() * 26 + 'px';
  h.style.animationDuration = 3 + Math.random() * 3 + 's';
  h.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');
  h.addEventListener('animationend', () => h.remove());
  heartLayer.appendChild(h);
}

function startHearts() {
  heartLayer = document.createElement('div');
  heartLayer.className = 'hearts';
  result.appendChild(heartLayer);

  for (let i = 0; i < 15; i++) setTimeout(spawnHeart, i * 80); // ชุดแรกให้ดูคึกคัก
  heartTimer = setInterval(spawnHeart, 300);                    // แล้วลอยต่อเรื่อย ๆ
}

function stopHearts() {
  clearInterval(heartTimer);
  heartTimer = null;
  if (heartLayer) heartLayer.remove();
  heartLayer = null;
}

// กด No: ครั้งแรกเลื่อนไปทางขวา, กดอีกครั้งกลับที่เดิม
noBtn.addEventListener('click', () => {
  noBtn.classList.toggle('moved');
});

// กด Yes: แสดงหน้าตอบรับ + หัวใจลอย
yesBtn.addEventListener('click', () => {
  result.classList.add('show');
  result.setAttribute('aria-hidden', 'false');
  if (!heartTimer) startHearts();
});

// กดปิด: กลับหน้าแรก และหยุดหัวใจ
closeBtn.addEventListener('click', () => {
  result.classList.remove('show');
  result.setAttribute('aria-hidden', 'true');
  noBtn.classList.remove('moved');
  stopHearts();
});
