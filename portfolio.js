const projects = {
  norte: {
    name: 'Linha Norte',
    type: 'SITE INSTITUCIONAL',
    line: 'Espaços para viver.',
    url: 'demos/linha-norte.html',
    goal: 'Apresentar meu negócio',
    action: 'Visitar o site',
    scenes: [
      {tab:'Interior', image:'norte.webp', alt:'Interior de concreto e madeira iluminado pelo pôr do sol', label:'O AMBIENTE', title:'Casa de luz', description:'Concreto, madeira e luz natural contam a história do projeto. O layout dá espaço para cada imagem e mantém a navegação à mão.'},
      {tab:'Fachada', image:'norte-fachada.webp', alt:'Casa contemporânea com concreto, madeira e piscina', label:'A ARQUITETURA', title:'A casa na paisagem', description:'A imagem de fachada revela o espaço inteiro. Na galeria do site, essa vista ajuda o visitante a entender a relação da casa com o terreno.'},
      {tab:'Detalhes', image:'norte-detalhes.webp', alt:'Corredor com arcos de concreto, sombras e uma árvore', label:'OS MATERIAIS', title:'Entre luz e sombra', description:'A galeria aproxima o visitante das texturas e dos recortes de luz. Cada vista tem texto e navegação próprios, inclusive na versão para celular.'}
    ]
  },
  brasa: {
    name: 'Brasa & Pão',
    type: 'CARDÁPIO DIGITAL',
    line: 'Na brasa. De verdade.',
    url: 'demos/brasa-e-pao.html',
    goal: 'Receber pedidos pelo WhatsApp',
    action: 'Montar um pedido',
    start: '#itens',
    scenes: [
      {tab:'Cardápio', image:'brasa.webp', alt:'Hambúrguer artesanal com dois discos de carne e cheddar', label:'O CARDÁPIO', title:'O pedido começa pela vontade.', description:'O cardápio coloca o produto em primeiro plano. A pessoa escolhe o lanche e os acompanhamentos e pode ajustar o pedido antes de fechar.'},
      {tab:'Carrinho', image:'brasa.webp', alt:'Hambúrguer artesanal com cheddar e pão tostado', label:'A REVISÃO', title:'Tudo na conta.', sample:['1× Duplo da Casa · 1× Batata', 'Total do pedido  •  R$ 49,80'], description:'O carrinho soma os itens na hora. Dá para aumentar ou reduzir a quantidade e conferir o total antes de preparar a mensagem.'},
      {tab:'WhatsApp', image:'brasa.webp', alt:'Hambúrguer artesanal do cardápio de demonstração', label:'O PEDIDO', title:'Mensagem pronta para enviar.', sample:['Mensagem para WhatsApp', 'Olá! Gostaria de fazer um pedido…'], description:'O site prepara uma mensagem com os itens, as quantidades e o total. Na demo, você pode copiar o texto ou abrir o WhatsApp e escolher o destinatário.'}
    ]
  },
  orla: {
    name: 'Orla',
    type: 'LOJA COM CHECKOUT',
    line: 'O cuidado de todo dia.',
    url: 'demos/orla.html',
    goal: 'Vender com pagamento online',
    action: 'Experimentar a loja',
    start: '#itens',
    scenes: [
      {tab:'Vitrine', image:'orla.webp', alt:'Frasco verde de cosmético sobre pedra natural', label:'A VITRINE', title:'A marca em primeiro plano.', description:'Cores, fotografia e tipografia apresentam a coleção. O visitante pode explorar os produtos e montar a sacola ali mesmo.'},
      {tab:'Sacola', image:'orla.webp', alt:'Frasco de sérum da coleção Orla', label:'A SACOLA', title:'Escolha, revise, avance.', sample:['Sérum Maré  ×  1', 'Total da sacola  •  R$ 79,00'], description:'A sacola mostra o preço e a quantidade de cada produto. Você pode revisar tudo antes de seguir para o checkout.'},
      {tab:'Checkout', image:'orla.webp', alt:'Cosmético da vitrine de demonstração', label:'O PAGAMENTO', title:'Pix ou cartão, em teste.', sample:['Forma de pagamento', 'Pix  /  Cartão'], description:'Escolha como pagar e veja a confirmação do pedido. O checkout é simulado e não solicita informações financeiras.'}
    ]
  }
};

const byId = id => document.getElementById(id);
const stage = document.querySelector('.case');
const preview = byId('demo-preview');
const frame = byId('demo-frame');
const devices = [...preview.querySelectorAll('[data-device]')];
const selectors = [...document.querySelectorAll('[data-showcase]')];
const scenes = byId('scene-controls');
const demoButton = document.querySelector('[data-open-demo]');

function selectScene(project, index) {
  const scene = project.scenes[index];
  const photo = byId('case-photo');
  if (photo.getAttribute('src') !== 'assets/' + scene.image) photo.src = 'assets/' + scene.image;
  photo.alt = scene.alt;
  byId('scene-label').textContent = scene.label;
  byId('scene-title').textContent = scene.title;
  byId('scene-description').textContent = scene.description;
  byId('commerce-sample').hidden = !scene.sample;
  if (scene.sample) {
    byId('sample-title').textContent = scene.sample[0];
    byId('sample-text').textContent = scene.sample[1];
  }
  stage.dataset.scene = String(index);
  for (const button of scenes.children) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.scene) === index));
  }
}

function selectProject(key) {
  const project = projects[key];
  stage.dataset.project = key;
  for (const button of selectors) {
    button.setAttribute('aria-pressed', String(button.dataset.showcase === key));
  }
  byId('case-title').textContent = project.name;
  byId('case-type').textContent = project.type;
  byId('case-line').textContent = project.line;
  byId('showcase-link').href = project.url;
  demoButton.firstChild.textContent = project.action + ' ';
  scenes.replaceChildren(...project.scenes.map((scene, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.scene = String(index);
    button.textContent = scene.tab;
    button.addEventListener('click', () => selectScene(project, index));
    return button;
  }));
  selectScene(project, 0);
}

function setDevice(device) {
  preview.querySelector('.demo-view').dataset.viewport = device;
  for (const button of devices) {
    button.setAttribute('aria-pressed', String(button.dataset.device === device));
  }
}

for (const button of selectors) {
  button.addEventListener('click', () => selectProject(button.dataset.showcase));
}
for (const link of document.querySelectorAll('[data-hero-project]')) {
  link.addEventListener('click', () => selectProject(link.dataset.heroProject));
}
for (const button of devices) {
  button.addEventListener('click', () => setDevice(button.dataset.device));
}

demoButton.addEventListener('click', () => {
  const project = projects[stage.dataset.project];
  byId('demo-preview-title').textContent = project.name;
  frame.title = 'Demonstração de ' + project.name;
  frame.src = project.url + (project.start || '');
  setDevice(matchMedia('(max-width: 640px)').matches ? 'phone' : 'desktop');
  preview.showModal();
});
preview.addEventListener('close', () => frame.removeAttribute('src'));
byId('showcase-quote').addEventListener('click', () => {
  byId('brief-type').value = projects[stage.dataset.project].goal;
});
selectProject('norte');
