/** Animações de entrada com respeito à preferência de movimento reduzido. */
export function initAnimations() {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const section of document.querySelectorAll(
      '.hero-copy, .hero-art, .gallery-heading, .case, .price-card, .maintenance-card',
    )) {
      revealObserver.observe(section);
    }
  }
}
