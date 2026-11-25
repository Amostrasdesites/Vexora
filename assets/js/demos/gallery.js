import { architectureViews as galleryImages } from '../data/projects.js';

/** Galeria da demonstração Linha Norte. */
const galleryButtons = [...document.querySelectorAll('[data-view]')];
const galleryImage = document.getElementById('arch-image');
for (const button of galleryButtons) {
  button.addEventListener('click', () => {
    const view = galleryImages[Number(button.dataset.view)];
    galleryImage.src = '../assets/images/' + view.file;
    galleryImage.alt = view.alt;
    document.getElementById('arch-caption').textContent = view.caption;
    for (const item of galleryButtons) {
      item.setAttribute('aria-pressed', String(item === button));
    }
  });
}
