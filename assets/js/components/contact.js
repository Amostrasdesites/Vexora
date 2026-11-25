import { siteConfig } from '../config/site.js';

/** Sincronizar os contatos exibidos nas páginas com a configuração central. */
export function initContactLinks() {
  const number = siteConfig.whatsapp.replace(/\D/g, '');
  for (const link of document.querySelectorAll('[data-contact="whatsapp"]')) {
    link.href = `https://wa.me/${number}`;
  }
  for (const label of document.querySelectorAll('[data-contact="phone"]')) {
    label.textContent = siteConfig.whatsappDisplay;
  }
}
