import { shopProducts, menuProducts } from '../data/products.js';
import { money, escapeHtml } from '../shared/format.js';

// Cada página informa se demonstra uma loja ou pedidos pelo WhatsApp.
const checkout = document.body.dataset.mode === 'checkout';
const products = checkout ? shopProducts : menuProducts;
const quantities = new Map();
const basket = document.querySelector('#basket');
const basketBody = document.querySelector('#basket-body');
const next = document.querySelector('#basket-next');
const feedback = document.querySelector('#feedback');
const title = document.querySelector('#basket-title');
const mainTitle = checkout ? 'Sua sacola' : 'Seu pedido';

const selectedProducts = () => products.filter((product) => quantities.has(product.id));
const total = () =>
  selectedProducts().reduce((sum, product) => sum + product.cents * quantities.get(product.id), 0);

function updateCount() {
  document.querySelector('[data-count]').textContent = [...quantities.values()].reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
}

function changeQuantity(id, change) {
  if (!products.some((product) => product.id === id)) return;
  const count = (quantities.get(id) || 0) + change;
  if (count > 0) quantities.set(id, count);
  else quantities.delete(id);
  updateCount();
}

function renderProducts() {
  const grid = document.querySelector('#products');
  grid.innerHTML = products
    .map(
      (product) => `
    <article class="product">
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
      <strong>${money(product.cents)}</strong>
      <button class="demo-button" data-add="${product.id}" aria-label="Adicionar ${escapeHtml(product.name)}">Adicionar +</button>
    </article>
  `,
    )
    .join('');

  grid.addEventListener('click', (event) => {
    const id = event.target.closest('[data-add]')?.dataset.add;
    const product = products.find((item) => item.id === id);
    if (!product) return;
    changeQuantity(id, 1);
    document.querySelector('#product-feedback').textContent =
      `${product.name} adicionado. Quantidade: ${quantities.get(id)}.`;
  });
}

function showBasket() {
  const rows = selectedProducts();
  title.textContent = mainTitle;
  next.hidden = true;
  next.replaceChildren();
  basketBody.hidden = false;
  feedback.textContent = '';

  if (!rows.length) {
    basketBody.innerHTML = '<p>Adicione itens para continuar.</p>';
    return;
  }

  basketBody.innerHTML =
    rows
      .map(
        (product) => `
    <div class="line-item">
      <div><strong>${escapeHtml(product.name)}</strong><br>${money(product.cents * quantities.get(product.id))}</div>
      <div class="quantity">
        <button data-id="${product.id}" data-change="-1" aria-label="Remover uma unidade de ${escapeHtml(product.name)}">−</button>
        <span>${quantities.get(product.id)}</span>
        <button data-id="${product.id}" data-change="1" aria-label="Adicionar uma unidade de ${escapeHtml(product.name)}">+</button>
      </div>
    </div>
  `,
      )
      .join('') +
    `
    <p class="basket-total"><span>Total</span><strong>${money(total())}</strong></p>
    <button class="demo-button" type="button" id="basket-continue">${checkout ? 'Ir para pagamento simulado' : 'Preparar mensagem para WhatsApp'} →</button>
  `;
}

function showCheckout() {
  next.innerHTML = `
    <p class="demo-note">Ambiente de demonstração. Nenhum dado financeiro é solicitado.</p>
    <form id="demo-payment">
      <fieldset class="method-list">
        <legend>Forma de pagamento</legend>
        <label><input type="radio" name="method" value="Pix" checked> Pix</label>
        <label><input type="radio" name="method" value="Cartão"> Cartão</label>
      </fieldset>
      <p class="basket-total"><span>Total</span><strong>${money(total())}</strong></p>
      <div class="basket-actions">
        <button type="submit" class="demo-button">Simular pagamento</button>
        <button type="button" class="secondary" id="back-basket">Voltar</button>
      </div>
    </form>
  `;

  next.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const method = new FormData(event.currentTarget).get('method');
    const amount = money(total());
    quantities.clear();
    updateCount();
    title.textContent = 'Simulação concluída';
    next.replaceChildren();
    const summary = document.createElement('p');
    summary.textContent = `Pagamento de teste de ${amount} via ${method} concluído. Nenhuma cobrança foi feita.`;
    next.append(summary);
    title.focus();
  });
}

function showOrderMessage() {
  next.innerHTML = `
    <p class="demo-note">Este cardápio é fictício. Copie a mensagem ou abra o WhatsApp para ver como o pedido fica. Você escolhe o destinatário.</p>
    <textarea class="order-message" rows="6" aria-label="Mensagem de pedido" readonly></textarea>
    <div class="basket-actions">
      <a class="demo-button" id="whatsapp-link" target="_blank" rel="noopener noreferrer">Abrir WhatsApp →</a>
      <button class="secondary" id="copy-order" type="button">Copiar</button>
      <button class="secondary" id="back-basket" type="button">Voltar</button>
    </div>
  `;

  const lines = selectedProducts().map(
    (product) => `${quantities.get(product.id)}× ${product.name}`,
  );
  const message = `Olá! Gostaria de fazer um pedido de demonstração:\n\n${lines.join('\n')}\n\nTotal: ${money(total())}`;
  const messageBox = next.querySelector('textarea');
  messageBox.value = message;
  next.querySelector('#whatsapp-link').href = `https://wa.me/?text=${encodeURIComponent(message)}`;
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

function showNext() {
  basketBody.hidden = true;
  next.hidden = false;
  title.textContent = checkout ? 'Pagamento simulado' : 'Mensagem do pedido';
  if (checkout) showCheckout();
  else showOrderMessage();

  next.querySelector('#back-basket').addEventListener('click', () => {
    showBasket();
    basketBody.querySelector('#basket-continue').focus();
  });
  title.focus();
}

// Eventos do carrinho, separados da criação dos seus elementos.
document.querySelector('.basket-trigger').addEventListener('click', () => {
  showBasket();
  basket.showModal();
  title.focus();
});

basketBody.addEventListener('click', (event) => {
  const button = event.target.closest('[data-change]');
  if (button) {
    const { id, change } = button.dataset;
    changeQuantity(id, Number(change));
    showBasket();
    (
      basketBody.querySelector(`[data-id="${id}"][data-change="${change}"]`) ||
      basketBody.querySelector('button') ||
      title
    ).focus();
    return;
  }
  if (event.target.closest('#basket-continue')) showNext();
});

renderProducts();
