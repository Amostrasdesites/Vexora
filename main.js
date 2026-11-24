const plans = [
  {name:'Básico', description:'Para colocar seu negócio online com uma landing page.', price:'449,90', monthly:'89,90', yearly:'1.528,70', highlights:['1 página responsiva','WhatsApp e redes sociais','Mapa e formulário simples','Publicação e configuração de domínio'], maintenance:['3 alterações simples','Suporte por WhatsApp','Relatório simples de visitas']},
  {name:'Profissional', description:'Para apresentar mais serviços e ser encontrado no Google.', price:'1.169,90', monthly:'149,90', yearly:'2.968,70', highlights:['Até 5 páginas responsivas','SEO básico e Google Meu Negócio','E-mail profissional','Formulário enviado por e-mail'], maintenance:['Até 6 alterações simples','Suporte por WhatsApp','Backup e relatório simples de visitas']},
  {name:'Premium', description:'Para vender com uma experiência sob medida.', price:'2.199,90', monthly:'289,90', yearly:'5.678,70', highlights:['Até 10 páginas ou blog','Layout e animações personalizados','Textos para conversão','SEO avançado e pixel de anúncios'], maintenance:['Até 2h de alterações simples','Suporte prioritário por WhatsApp','Backup e monitoramento do site','Relatório mensal detalhado de visitas']}
];
const list = (items, cls = '') => '<ul class="' + cls + '">' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
document.querySelector('#price-cards').innerHTML = plans.map((plan, index) =>
  '<article class="price-card ' + (index === 1 ? 'featured' : '') + '"><h3>' + plan.name + '</h3><p class="plan-description">' + plan.description + '</p><p class="price"><small>R$</small> ' + plan.price + '</p><p class="price-caption">Pagamento único pelo site</p><p class="monthly">+ R$ ' + plan.monthly + ' / mês</p>' + list(plan.highlights, 'checklist') + '<p class="yearly">1º ano <strong>R$ ' + plan.yearly + '</strong></p><a class="button plan-choice" href="#orcamento" data-plan="' + plan.name + '">Escolher ' + plan.name + '</a></article>').join('');
document.querySelector('#maintenance-cards').innerHTML = plans.map(plan => '<article class="maintenance-card"><h3>' + plan.name + '</h3><p>R$ ' + plan.monthly + '<small> / mês</small></p>' + list(plan.maintenance, 'checklist') + '</article>').join('');
const compare = [
  ['Páginas','1','Até 5','Até 10 ou blog'],
  ['Design responsivo e identidade visual','Incluído','Incluído','Incluído'],
  ['Animações','Leves','Leves','Personalizadas'],
  ['Layout 100% personalizado','—','—','Incluído'],
  ['Textos para conversão','—','—','Incluído'],
  ['WhatsApp, redes sociais, mapa e formulário simples','Incluído','Incluído','Incluído'],
  ['Publicação, configuração de domínio e SSL','Incluído','Incluído','Incluído'],
  ['Formulário por e-mail e e-mail profissional','—','Incluído','Incluído'],
  ['SEO','—','Básico','Avançado + pixel de anúncios'],
  ['Google Meu Negócio','—','Incluído','Incluído'],
  ['Configuração de Google Analytics¹','Incluído','Incluído','Incluído'],
  ['Conexão com agenda, catálogo ou pagamento²','Incluído','Incluído','Incluído'],
  ['Treinamento em vídeo','Incluído','Incluído','Incluído'],
  ['Rodadas de ajustes pós-entrega','1','2','3']
];
document.querySelector('#compare-table').innerHTML = '<table><caption>Recursos de criação e entrega</caption><thead><tr><th scope="col">Recursos</th>' + plans.map(plan => '<th scope="col">' + plan.name + '</th>').join('') + '</tr></thead><tbody>' + compare.map(([label, ...values]) => '<tr><th scope="row">' + label + '</th>' + values.map(value => '<td>' + value + '</td>').join('') + '</tr>').join('') + '</tbody></table><p class="comparison-notes">¹ Configuração no site contratado, conforme escolhas e adequação de privacidade. ² Recursos e serviços externos definidos na proposta. Loja virtual completa é cobrada à parte.</p>';
document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#brief-plan').value = link.dataset.plan;
}));
const dialog = document.querySelector('#brief-dialog');
const output = document.querySelector('#brief-output');
const feedback = document.querySelector('#brief-feedback');
const share = document.querySelector('#share-brief');
const whatsapp = document.querySelector('#whatsapp-brief');
const commercialNumber = VEXORA_CONFIG.whatsapp.replace(/\D/g, '');
share.hidden = typeof navigator.share !== 'function';
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  const name = fields.get('nome').trim();
  if (!name) {
    document.querySelector('#brief-name').value = '';
    event.currentTarget.reportValidity();
    return;
  }
  const notes = fields.get('detalhes').trim();
  output.value = 'Olá! Gostaria de um orçamento para um site.\n\nNome ou negócio: ' + name + '\nPlano: ' + fields.get('plano') + '\nObjetivo: ' + fields.get('objetivo') + (notes ? '\nDetalhes: ' + notes : '');
  whatsapp.hidden = !/^55\d{10,11}$/.test(commercialNumber);
  if (!whatsapp.hidden) whatsapp.href = 'https://wa.me/' + commercialNumber + '?text=' + encodeURIComponent(output.value);
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
    await navigator.share({title:'Pedido de orçamento', text:output.value});
  } catch (error) {
    if (error.name !== 'AbortError') feedback.textContent = 'Use o botão Copiar resumo para compartilhar.';
  }
});
