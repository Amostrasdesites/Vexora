import { legacyShop, legacyMenu } from '../data/legacy-products.js';

/** Comportamento das demonstrações antigas Brasa Burger e Flora. */
const isCheckout = document.body.dataset.demo === 'checkout';
const inventory = isCheckout ? legacyShop : legacyMenu;
const cart = new Map();
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const money = (cents) => currency.format(cents / 100);
const list = document.querySelector('[data-cart-items]');
const action = document.querySelector('[data-cart-action]');
const checkout = document.querySelector('[data-checkout]');
const status = document.querySelector('[data-cart-status]');
const totalCents = () => [...cart].reduce((sum, [id, qty]) => sum + inventory[id][1] * qty, 0);

function drawCart() {
  const quantity = [...cart.values()].reduce((sum, qty) => sum + qty, 0);
  document.querySelector('[data-cart-count]').textContent = quantity;
  document.querySelector('[data-cart-total]').textContent = money(totalCents());
  action.disabled = !quantity;
  checkout.hidden = true;
  list.replaceChildren();
  if (!quantity) {
    const empty = document.createElement('li');
    empty.textContent = 'Adicione itens para continuar.';
    list.append(empty);
  }
  for (const [id, qty] of cart) {
    const [name, price] = inventory[id];
    const row = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = `${qty} × ${name} · ${money(price * qty)}`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.remove = id;
    remove.textContent = '−';
    remove.setAttribute('aria-label', `Remover uma unidade de ${name}`);
    row.append(title, remove);
    list.append(row);
  }
}

document.querySelectorAll('[data-item]').forEach((button) =>
  button.addEventListener('click', () => {
    const id = button.dataset.item;
    cart.set(id, (cart.get(id) ?? 0) + 1);
    drawCart();
    status.textContent = `${cart.get(id)} × ${inventory[id][0]} no carrinho.`;
  }),
);

list.addEventListener('click', (event) => {
  const id = event.target.dataset.remove;
  if (!cart.has(id)) return;
  const quantity = cart.get(id) - 1;
  if (quantity) cart.set(id, quantity);
  else cart.delete(id);
  drawCart();
  status.textContent = `Uma unidade de ${inventory[id][0]} removida.`;
  (
    list.querySelector(`[data-remove="${id}"]`) ?? document.querySelector(`[data-item="${id}"]`)
  ).focus();
});

action.addEventListener('click', () => {
  if (!cart.size) return;
  checkout.hidden = false;
  status.textContent = '';
  if (isCheckout) {
    checkout.querySelector('input:checked').focus();
    return;
  }
  const lines = [...cart].map(
    ([id, qty]) => `${qty} × ${inventory[id][0]} (${money(inventory[id][1] * qty)})`,
  );
  const message = [
    'Pedido demonstrativo | Brasa Burger',
    ...lines,
    `Total: ${money(totalCents())}`,
  ].join('\n');
  const preview = checkout.querySelector('[data-order-message]');
  preview.value = message;
  checkout.querySelector('[data-whatsapp]').href =
    `https://wa.me/?text=${encodeURIComponent(message)}`;
  preview.focus();
});

if (isCheckout)
  checkout.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!cart.size) return;
    const method = new FormData(checkout).get('pagamento');
    const total = money(totalCents());
    cart.clear();
    drawCart();
    status.tabIndex = -1;
    status.textContent = `Compra simulada de ${total} por ${method} concluída.`;
    status.focus();
  });

drawCart();
