const galleryImages = [
  {file:'norte.webp', alt:'Interior com paredes de concreto e luz natural', caption:'Luz natural nos ambientes internos.'},
  {file:'norte-fachada.webp', alt:'Fachada em concreto e madeira com piscina', caption:'A fachada se abre para a paisagem.'},
  {file:'norte-detalhes.webp', alt:'Arcos de concreto, uma árvore e sombras projetadas', caption:'As sombras revelam o ritmo dos arcos.'}
];
const galleryButtons = [...document.querySelectorAll('[data-view]')];
const galleryImage = document.getElementById('arch-image');
for (const button of galleryButtons) {
  button.addEventListener('click', () => {
    const view = galleryImages[Number(button.dataset.view)];
    galleryImage.src = '../assets/' + view.file;
    galleryImage.alt = view.alt;
    document.getElementById('arch-caption').textContent = view.caption;
    for (const item of galleryButtons) {
      item.setAttribute('aria-pressed', String(item === button));
    }
  });
}
