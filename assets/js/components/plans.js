import { plans, comparison } from '../data/plans.js';
import { money, amount, escapeHtml } from '../shared/format.js';

const yearly = (plan) => plan.priceCents + 12 * plan.monthlyCents;
const list = (items) =>
  `<ul class="checklist">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

/** Montar os planos e a manutenção a partir dos mesmos dados. */
export function renderPlans() {
  const cards = document.querySelector('#price-cards');
  if (!cards) return;

  cards.innerHTML = plans
    .map(
      (plan, index) => `
    <article class="price-card ${index === 1 ? 'featured' : ''}">
      <h3>${escapeHtml(plan.name)}</h3>
      <p class="plan-description">${escapeHtml(plan.description)}</p>
      <p class="price"><small>R$</small> ${amount(plan.priceCents)}</p>
      <p class="price-caption">Pagamento único pelo site</p>
      <p class="monthly">+ ${money(plan.monthlyCents)} / mês</p>
      ${list(plan.highlights)}
      <p class="yearly">1º ano <strong>${money(yearly(plan))}</strong></p>
      <a class="button plan-choice" href="#orcamento" data-plan="${escapeHtml(plan.name)}">Escolher ${escapeHtml(plan.name)}</a>
    </article>
  `,
    )
    .join('');

  document.querySelector('#maintenance-cards').innerHTML = plans
    .map(
      (plan) => `
    <article class="maintenance-card">
      <h3>${escapeHtml(plan.name)}</h3>
      <p>${money(plan.monthlyCents)}<small> / mês</small></p>
      ${list(plan.maintenance)}
    </article>
  `,
    )
    .join('');

  document.querySelector('#compare-table').innerHTML = `
    <table>
      <caption>Recursos de criação e entrega</caption>
      <thead><tr><th scope="col">Recursos</th>${plans.map((plan) => `<th scope="col">${escapeHtml(plan.name)}</th>`).join('')}</tr></thead>
      <tbody>${comparison.map(([label, ...values]) => `<tr><th scope="row">${escapeHtml(label)}</th>${values.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    <p class="comparison-notes">¹ Configuração no site contratado, conforme escolhas e adequação de privacidade. ² Recursos e serviços externos definidos na proposta. Loja virtual completa é cobrada à parte.</p>
  `;
}

/** Manter a tabela das condições de contratação com os mesmos preços. */
export function renderLegalPrices() {
  const body = document.querySelector('[data-plan-pricing]');
  if (!body) return;
  body.innerHTML = plans
    .map(
      (plan) => `
    <tr><th>${escapeHtml(plan.name)}</th><td>${money(plan.priceCents)}</td><td>${money(plan.monthlyCents)}</td><td>${money(yearly(plan))}</td></tr>
  `,
    )
    .join('');
}
