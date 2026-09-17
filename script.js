const CONFIG = {
  roblox: 'https://www.roblox.com/',
  discord: 'https://discord.gg/yxjXcUg32K',
  owners: ['mateomiranda314@gmail.com', 'mateomiranda4321@gmail.com']
};

const departments = [
  ['SWAT', 'Special Weapons & Tactics', 'Preparados para las situaciones críticas.', 'Táctico · Rescate · Crisis', 'https://i.ytimg.com/vi/XonSfaDiq4o/maxresdefault.jpg'],
  ['FBI', 'Federal Bureau of Investigation', 'Inteligencia para los casos que cruzan límites.', 'Federal · Inteligencia · Operaciones', 'https://tse3.mm.bing.net/th/id/OIP.xXCQQyF32phRbVLrRhNJ7wHaGo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
  ['LSPD', 'Los Santos Police Department', 'Protegemos la ciudad, una llamada a la vez.', 'Patrulla · Respuesta · Investigación', 'https://static.wikia.nocookie.net/failyv/images/6/67/LOGO_LSPD_HD.png/revision/latest/scale-to-width-down/1200?cb=20220823113855&path-prefix=fr'],
  ['FIRE', 'Urban District Fire & Rescue', 'Entramos donde otros no pueden.', 'Incendios · Rescate · Prevención', 'https://tse1.mm.bing.net/th/id/OIP.dr6xRhSZcYFa8t43BN0dpQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
  ['EMS', 'Emergency Medical Services', 'Cada segundo cuenta cuando alguien necesita ayuda.', 'Rescate · Trauma · Ambulancia', 'https://wiki.eclipse-rp.net/images/2/2a/MD_Logo.png']
];

function renderDepartments() {
  const grid = document.querySelector('#department-grid');
  if (!grid) return;
  grid.innerHTML = departments.map((department) => `
    <article class="department-card reveal">
      <div class="card-image" style="background-image:url('${department[4]}')"></div>
      <span class="dept-code">${department[0]}</span>
      <h3>${department[1]}</h3>
      <p>${department[2]}</p>
      <div class="dept-meta"><span>${department[3].split(' · ')[0]}</span><span>${department[3].split(' · ')[1]}</span></div>
    </article>
  `).join('');
}

function setupOwnerPublishing() {
  const modal = document.querySelector('#owner-modal');
  const form = document.querySelector('#owner-form');
  if (!modal || !form) return;

  document.querySelectorAll('.owner-action').forEach((button) => {
    button.addEventListener('click', () => {
      const email = window.prompt('Ingresá tu correo de propietario para publicar:');
      if (!email || !CONFIG.owners.includes(email.trim().toLowerCase())) {
        window.alert('Acceso denegado.');
        return;
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      form.reset();
      document.querySelector('#owner-title')?.focus();
    });
  });

  document.querySelectorAll('.owner-close').forEach((button) => {
    button.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.remove('open');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = document.querySelector('#owner-error');
    if (error) error.textContent = 'Contenido preparado para publicar.';
    form.reset();
  });
}

function setupNavigation() {
  const menu = document.querySelector('.site-menu');
  const toggle = document.querySelector('.menu-toggle');
  if (!menu || !toggle) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.site-menu > a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

function setupReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealElements.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
  renderDepartments();
  setupOwnerPublishing();
  setupNavigation();
  setupReveals();
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 30));
});
