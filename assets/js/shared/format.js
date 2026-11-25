/** Formatação compartilhada de valores, sempre recebidos em centavos. */
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const money = (cents) => currency.format(cents / 100);
export const amount = (cents) => money(cents).replace(/^R\$\s*/, '');

/** Usar somente para texto inserido nos modelos HTML da interface. */
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  );
