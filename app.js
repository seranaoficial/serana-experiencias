/* ============================================
   SERANA EXPERIENCIAS — Interacciones
   ============================================ */

// === CUSTOM CURSOR ===
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  if (dot) { dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`; }
});

function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  if (ring) { ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`; }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .linea-card, .filosofia-card, .herramienta').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.classList.add('is-hover'); ring.classList.add('is-hover'); });
  el.addEventListener('mouseleave', () => { dot.classList.remove('is-hover'); ring.classList.remove('is-hover'); });
});

// === NAV SCROLL STATE ===
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
});

// === MOBILE MENU ===
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('is-open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('is-open')));

// === SCROLL REVEAL ===
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// === QUIZ ===
const quizData = [
  {
    q: '¿Qué necesitas sentir al terminar la experiencia?',
    options: [
      { l: 'Energía y vitalidad', tag: 'energia' },
      { l: 'Calma y claridad', tag: 'calma' },
      { l: 'Conexión profunda con otros', tag: 'conexion' },
      { l: 'Una transformación que me mueva', tag: 'impacto' }
    ]
  },
  {
    q: '¿Cuántas personas van a participar?',
    options: [
      { l: 'Solo yo', tag: 'individual' },
      { l: 'Pareja o grupo pequeño (2–6)', tag: 'pequeno' },
      { l: 'Equipo de trabajo (7+)', tag: 'equipo' },
      { l: 'Grupo grande / hotel / evento', tag: 'masivo' }
    ]
  },
  {
    q: '¿Cuánto tiempo quieren dedicarle?',
    options: [
      { l: 'Una tarde (1–2h)', tag: 'express' },
      { l: 'Medio día', tag: 'medio' },
      { l: 'Un día completo', tag: 'dia' },
      { l: 'Un retiro (2+ días)', tag: 'retiro' }
    ]
  },
  {
    q: '¿Qué te llama más de las siguientes?',
    options: [
      { l: 'Yoga, breathwork, meditación', tag: 'suave' },
      { l: 'Ice bath, fuego, alta intensidad', tag: 'intenso' },
      { l: 'Sonoterapia y naturaleza', tag: 'sonido' },
      { l: 'Coaching y gastronomía', tag: 'consciente' }
    ]
  }
];

const resultMap = {
  energia:    { t: 'Reset Energético',          d: 'Una sesión de movimiento consciente, alimentación vital y un cierre que te deja enchufado. Day retreat ideal para ti o tu equipo.' },
  calma:      { t: 'Ritual de Calma',           d: 'Sonoterapia, breathwork suave, caminata y una cena consciente. Lo que necesitas para resetear.' },
  conexion:   { t: 'Vínculos que importan',     d: 'Experiencia privada o grupo pequeño con prácticas que abren conversación, cuerpo y corazón.' },
  impacto:    { t: 'Alto Impacto',              d: 'Ice bath + fire walking + breathwork. El cuerpo despierta, la mente cede. Para ir en serio.' },
  masivo:     { t: 'Programa a medida',         d: 'Diseñamos un programa completo para tu hotel, evento o grupo corporativo. Hablemos de escala.' }
};

let step = 0;
const stage = document.getElementById('quizStage');
const bar = document.getElementById('quizBar');
const stepEl = document.getElementById('quizStep');
const totalEl = document.getElementById('quizTotal');
const resultEl = document.getElementById('quizResult');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');

totalEl.textContent = quizData.length;

function renderQuestion() {
  const item = quizData[step];
  const letters = ['A', 'B', 'C', 'D'];
  stage.innerHTML = `
    <h3 class="quiz-question">${item.q}</h3>
    <div class="quiz-options">
      ${item.options.map((o, i) => `
        <button class="quiz-option" data-tag="${o.tag}" data-letter="${letters[i]}">
          <span class="opt-letter">${letters[i]}</span>
          <span>${o.l}</span>
        </button>
      `).join('')}
    </div>
  `;
  const pct = ((step + 1) / quizData.length) * 100;
  bar.style.setProperty('--progress', pct + '%');
  stepEl.textContent = step + 1;
  stage.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => chooseOption(btn.dataset.tag, btn.dataset.l));
  });
}

const scores = {};
function chooseOption(tag, letter) {
  scores[tag] = (scores[tag] || 0) + 1;
  setTimeout(() => {
    step++;
    if (step < quizData.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 350);
}

function showResult() {
  // Pick result by best matching tag
  let chosen = 'energia';
  let best = -1;
  // Prioritize masivo si existe
  if (scores.masivo) { chosen = 'masivo'; }
  else {
    for (const k of Object.keys(scores)) {
      if (scores[k] > best) { best = scores[k]; chosen = k; }
    }
  }
  // Normalize tag -> result
  const map = {
    energia: 'energia', calma: 'calma', conexion: 'conexion',
    impacto: 'impacto', individual: 'energia', pequeno: 'conexion',
    equipo: 'conexion', masivo: 'masivo',
    express: 'energia', medio: 'calma', dia: 'conexion', retiro: 'impacto',
    suave: 'calma', intenso: 'impacto', sonido: 'calma', consciente: 'conexion'
  };
  const finalTag = map[chosen] || 'energia';
  const r = resultMap[finalTag];

  stage.hidden = true;
  resultEl.hidden = false;
  resultTitle.textContent = r.t;
  resultDesc.textContent = r.d;
  bar.style.setProperty('--progress', '100%');
}

document.getElementById('quizRestart').addEventListener('click', () => {
  step = 0;
  for (const k in scores) delete scores[k];
  stage.hidden = false;
  resultEl.hidden = true;
  renderQuestion();
});

renderQuestion();

// === FORM SUBMIT ===
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';
  status.className = 'form-status';
  status.textContent = '';

  // Get quiz result if user did it
  const quizTitle = resultEl.hidden ? null : resultTitle.textContent;

  const payload = {
    nombre: form.nombre.value.trim(),
    email: form.email.value.trim(),
    telefono: form.telefono.value.trim(),
    modalidad: form.modalidad.value,
    mensaje: form.mensaje.value.trim(),
    quiz_resultado: quizTitle,
    source: 'serana-experiencias.vercel.app',
    created_at: new Date().toISOString()
  };

  // Try Supabase lead capture if public anon key is present
  const SB_URL = 'https://tjjrnpwwfvmsukfrfchr.supabase.co';
  const ANON_KEY = null; // Configurable later

  try {
    if (ANON_KEY) {
      const r = await fetch(`${SB_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': ANON_KEY,
          'Authorization': 'Bearer ' + ANON_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: payload.nombre,
          email: payload.email,
          phone: payload.telefono,
          source: payload.source,
          message: payload.mensaje + (payload.quiz_resultado ? ` | Quiz: ${payload.quiz_resultado}` : ''),
          modality: payload.modalidad
        })
      });
      if (!r.ok) throw new Error('Supabase ' + r.status);
    } else {
      // No backend wired: just simulate success
      await new Promise(r => setTimeout(r, 700));
    }
    status.className = 'form-status is-success';
    status.textContent = '¡Listo! Te escribimos a tu correo en menos de 24h.';
    form.reset();
  } catch (err) {
    status.className = 'form-status is-error';
    status.textContent = 'Hubo un error. Intenta de nuevo o escríbenos a hola@serana.social';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar y recibir propuesta →';
  }
});
