/** Código histórico da primeira estrutura do site, preservado para consulta. Não é carregado nas páginas atuais. */
// Include the country and area codes, using digits only.
const studioWhatsApp = '';

const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');

filters.forEach((filter) =>
  filter.addEventListener('click', () => {
    filters.forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
    projects.forEach((project) => {
      project.hidden =
        filter.dataset.filter !== 'all' && project.dataset.category !== filter.dataset.filter;
    });
  }),
);

const planSelect = document.querySelector('#quote-plan');
document.querySelectorAll('.plan-link').forEach((link) =>
  link.addEventListener('click', () => {
    planSelect.value = link.dataset.plan;
  }),
);

const quote = document.querySelector('#quote-form');
const result = document.querySelector('#quote-result');
const message = document.querySelector('#quote-message');
const status = document.querySelector('#quote-status');

if (studioWhatsApp)
  document.querySelector('#quote-action').firstChild.textContent = 'Abrir no WhatsApp ';
quote.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(quote);
  message.value = [
    'Olá, VEXORA! Gostaria de pedir um orçamento.',
    `Meu nome é ${data.get('nome').trim()}.`,
    `Serviço: ${data.get('tipo')}`,
    `Plano: ${data.get('plano')}`,
    `Sobre meu projeto: ${data.get('projeto').trim()}`,
  ].join('\n');
  if (studioWhatsApp) {
    window.location.assign(
      `https://wa.me/${studioWhatsApp}?text=${encodeURIComponent(message.value)}`,
    );
    return;
  }
  status.textContent = 'Mensagem pronta para copiar.';
  result.hidden = false;
  message.focus();
});

document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message.value);
    status.textContent = 'Mensagem copiada.';
  } catch {
    message.focus();
    message.select();
    status.textContent = 'Selecione a opção de copiar no seu dispositivo.';
  }
});
