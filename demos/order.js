const checkout = document.body.dataset.mode === 'checkout';
const products = checkout ? [
  {id:'serum', name:'Sérum Maré', description:'Sérum facial de textura leve · 30 ml', cents:7900},
  {id:'sabonete', name:'Sabonete Brisa', description:'Limpeza suave para o rosto · 90 g', cents:3900},
  {id:'kit', name:'Kit Rotina Orla', description:'Sérum e sabonete em um kit de cuidado', cents:10500}
] : [
  {id:'classico', name:'Brasa Clássico', description:'Smash, cheddar e molho da casa no pão tostado.', cents:2590},
  {id:'duplo', name:'Duplo da Casa', description:'Dois smashes, cheddar e cebola caramelizada.', cents:3490},
  {id:'batata', name:'Batata Crocante', description:'Porção de fritas com páprica e sal da casa.', cents:1490}
];
const currency = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'});
const money = cents => currency.format(cents / 100);
const quantities = new Map();
const basket = document.querySelector('#basket');
const basketBody = document.querySelector('#basket-body');
const next = document.querySelector('#basket-next');
const feedback = document.querySelector('#feedback');
const title = document.querySelector('#basket-title');
const mainTitle = checkout ? 'Sua sacola' : 'Seu pedido';
const selected = () => products.filter(product => quantities.has(product.id));
const total = () => selected().reduce((sum, product) => sum + product.cents * quantities.get(product.id), 0);
const updateCount = () => {
  document.querySelector('[data-count]').textContent = [...quantities.values()].reduce((sum, quantity) => sum + quantity, 0);
};
const changeQuantity = (id, change) => {
  const count = (quantities.get(id) || 0) + change;
  if (count > 0) quantities.set(id, count);
  else quantities.delete(id);
  updateCount();
};
const productGrid = document.querySelector('#products');
productGrid.innerHTML = products.map(product => '<article class="product"><h3>' + product.name + '</h3><p>' + product.description + '</p><strong>' + money(product.cents) + '</strong><button class="demo-button" data-add="' + product.id + '" aria-label="Adicionar ' + product.name + '">Adicionar +</button></article>').join('');
productGrid.addEventListener('click', event => {
  const id = event.target.closest('[data-add]')?.dataset.add;
  if (!id) return;
  changeQuantity(id, 1);
  const product = products.find(item => item.id === id);
  document.querySelector('#product-feedback').textContent = product.name + ' adicionado. Quantidade: ' + quantities.get(id) + '.';
});
function showBasket() {
  const rows = selected();
  title.textContent = mainTitle;
  next.hidden = true;
  next.replaceChildren();
  basketBody.hidden = false;
  feedback.textContent = '';
  if (!rows.length) {
    basketBody.innerHTML = '<p>Adicione itens para continuar.</p>';
    return;
  }
  basketBody.innerHTML = rows.map(product => '<div class="line-item"><div><strong>' + product.name + '</strong><br>' + money(product.cents * quantities.get(product.id)) + '</div><div class="quantity"><button data-id="' + product.id + '" data-change="-1" aria-label="Remover uma unidade de ' + product.name + '">−</button><span>' + quantities.get(product.id) + '</span><button data-id="' + product.id + '" data-change="1" aria-label="Adicionar uma unidade de ' + product.name + '">+</button></div></div>').join('') + '<p class="basket-total"><span>Total</span><strong>' + money(total()) + '</strong></p><button class="demo-button" type="button" id="basket-continue">' + (checkout ? 'Ir para pagamento simulado' : 'Preparar mensagem para WhatsApp') + ' →</button>';
}
document.querySelector('.basket-trigger').addEventListener('click', () => {
  showBasket();
  basket.showModal();
  title.focus();
});
basketBody.addEventListener('click', event => {
  const button = event.target.closest('[data-change]');
  if (button) {
    const {id, change} = button.dataset;
    changeQuantity(id, Number(change));
    showBasket();
    (basketBody.querySelector('[data-id="' + id + '"][data-change="' + change + '"]') || basketBody.querySelector('button') || title).focus();
    return;
  }
  if (event.target.closest('#basket-continue')) showNext();
});
function showNext() {
  basketBody.hidden = true;
  next.hidden = false;
  title.textContent = checkout ? 'Pagamento simulado' : 'Mensagem do pedido';
  if (checkout) {
    next.innerHTML = '<p class="demo-note">Ambiente de demonstração. Nenhum dado financeiro é solicitado.</p><form id="demo-payment"><fieldset class="method-list"><legend>Forma de pagamento</legend><label><input type="radio" name="method" value="Pix" checked> Pix</label><label><input type="radio" name="method" value="Cartão" > Cartão</label></fieldset><p class="basket-total"><span>Total</span><strong>' + money(total()) + '</strong></p><div class="basket-actions"><button type="submit" class="demo-button">Simular pagamento</button><button type="button" class="secondary" id="back-basket">Voltar</button></div></form>';
    next.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const method = new FormData(event.currentTarget).get('method');
      const amount = money(total());
      quantities.clear();
      updateCount();
      title.textContent = 'Simulação concluída';
      next.replaceChildren();
      const summary = document.createElement('p');
      summary.textContent = 'Pagamento de teste de ' + amount + ' via ' + method + ' concluído. Nenhuma cobrança foi feita.';
      next.append(summary);
      title.focus();
    });
  } else {
    next.innerHTML = '<p class="demo-note">Este cardápio é fictício. Copie a mensagem ou abra o WhatsApp para ver como o pedido fica. Você escolhe o destinatário.</p><textarea class="order-message" rows="6" aria-label="Mensagem de pedido" readonly></textarea><div class="basket-actions"><a class="demo-button" id="whatsapp-link" target="_blank" rel="noopener noreferrer">Abrir WhatsApp →</a><button class="secondary" id="copy-order" type="button">Copiar</button><button class="secondary" id="back-basket" type="button">Voltar</button></div>';
    const message = 'Olá! Gostaria de fazer um pedido de demonstração:\n\n' + selected().map(product => quantities.get(product.id) + '× ' + product.name).join('\n') + '\n\nTotal: ' + money(total());
    const messageBox = next.querySelector('textarea');
    messageBox.value = message;
    next.querySelector('#whatsapp-link').href = 'https://wa.me/?text=' + encodeURIComponent(message);
    next.querySelector('#copy-order').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message);
        feedback.textContent = 'Mensagem copiada.';
      } catch {
        messageBox.select();
        feedback.textContent = 'Selecione Copiar no menu do seu dispositivo.';
      }
    });
  }
  next.querySelector('#back-basket').addEventListener('click', () => {
    showBasket();
    basketBody.querySelector('#basket-continue').focus();
  });
  title.focus();
}
