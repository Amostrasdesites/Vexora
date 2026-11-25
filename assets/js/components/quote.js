import { siteConfig } from '../config/site.js';
import { plans } from '../data/plans.js';

/** Formulário, resumo, cópia e envio do orçamento. */
export function initQuote() {
  if (!document.querySelector('#brief-form')) return;

  // Os nomes dos planos vêm do mesmo cadastro dos cartões e da tabela legal.
  const planSelect = document.querySelector('#brief-plan');
  const options = ['Ainda estou decidindo', ...plans.map((plan) => plan.name)];
  planSelect.replaceChildren(
    ...options.map((name) => {
      const option = document.createElement('option');
      option.textContent = name;
      option.value = name;
      return option;
    }),
  );
  document.querySelectorAll('[data-plan]').forEach((link) =>
    link.addEventListener('click', () => {
      document.querySelector('#brief-plan').value = link.dataset.plan;
    }),
  );
  const dialog = document.querySelector('#brief-dialog');
  const output = document.querySelector('#brief-output');
  const feedback = document.querySelector('#brief-feedback');
  const share = document.querySelector('#share-brief');
  const whatsapp = document.querySelector('#whatsapp-brief');
  const commercialNumber = siteConfig.whatsapp.replace(/\D/g, '');
  share.hidden = typeof navigator.share !== 'function';
  document.querySelector('#brief-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = fields.get('nome').trim();
    if (!name) {
      document.querySelector('#brief-name').value = '';
      event.currentTarget.reportValidity();
      return;
    }
    const notes = fields.get('detalhes').trim();
    output.value =
      'Olá! Gostaria de um orçamento para um site.\n\nNome ou negócio: ' +
      name +
      '\nPlano: ' +
      fields.get('plano') +
      '\nObjetivo: ' +
      fields.get('objetivo') +
      (notes ? '\nDetalhes: ' + notes : '');
    whatsapp.hidden = !/^55\d{10,11}$/.test(commercialNumber);
    if (!whatsapp.hidden)
      whatsapp.href =
        'https://wa.me/' + commercialNumber + '?text=' + encodeURIComponent(output.value);
    feedback.textContent = '';
    dialog.showModal();
  });
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      feedback.textContent = 'Resumo copiado.';
    } catch {
      output.select();
      feedback.textContent = 'O texto foi selecionado. Copie usando o menu do seu dispositivo.';
    }
  });
  share.addEventListener('click', async () => {
    try {
      await navigator.share({ title: 'Pedido de orçamento', text: output.value });
    } catch (error) {
      if (error.name !== 'AbortError')
        feedback.textContent = 'Use o botão Copiar resumo para compartilhar.';
    }
  });
}
