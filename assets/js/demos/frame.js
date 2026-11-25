/** Ajustar a navegação quando a demonstração estiver na prévia do portfólio. */
if (window.self !== window.top) {
  document.body.classList.add('embedded-demo');
  for (const link of document.querySelectorAll('a[href^="../index.html"]')) {
    link.target = '_blank';
    link.rel = 'noopener';
  }
}
