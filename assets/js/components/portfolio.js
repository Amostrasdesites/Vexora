import { projects } from '../data/projects.js';

/** Seleção de projetos, cenas e prévia em desktop ou celular. */
export function initPortfolio() {
  if (!document.querySelector('.case')) return;
  const byId = (id) => document.getElementById(id);
  const stage = document.querySelector('.case');
  const preview = byId('demo-preview');
  const frame = byId('demo-frame');
  const devices = [...preview.querySelectorAll('[data-device]')];
  const selectors = [...document.querySelectorAll('[data-showcase]')];
  const scenes = byId('scene-controls');
  const demoButton = document.querySelector('[data-open-demo]');

  function selectScene(project, index) {
    const scene = project.scenes[index];
    const photo = byId('case-photo');
    if (photo.getAttribute('src') !== 'assets/images/' + scene.image)
      photo.src = 'assets/images/' + scene.image;
    photo.alt = scene.alt;
    byId('scene-label').textContent = scene.label;
    byId('scene-title').textContent = scene.title;
    byId('scene-description').textContent = scene.description;
    byId('commerce-sample').hidden = !scene.sample;
    if (scene.sample) {
      byId('sample-title').textContent = scene.sample[0];
      byId('sample-text').textContent = scene.sample[1];
    }
    stage.dataset.scene = String(index);
    for (const button of scenes.children) {
      button.setAttribute('aria-pressed', String(Number(button.dataset.scene) === index));
    }
  }

  function selectProject(key) {
    const project = projects[key];
    stage.dataset.project = key;
    for (const button of selectors) {
      button.setAttribute('aria-pressed', String(button.dataset.showcase === key));
    }
    byId('case-title').textContent = project.name;
    byId('case-type').textContent = project.type;
    byId('case-line').textContent = project.line;
    byId('showcase-link').href = project.url;
    demoButton.firstChild.textContent = project.action + ' ';
    scenes.replaceChildren(
      ...project.scenes.map((scene, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.scene = String(index);
        button.textContent = scene.tab;
        button.addEventListener('click', () => selectScene(project, index));
        return button;
      }),
    );
    selectScene(project, 0);
  }

  function setDevice(device) {
    preview.querySelector('.demo-view').dataset.viewport = device;
    for (const button of devices) {
      button.setAttribute('aria-pressed', String(button.dataset.device === device));
    }
  }

  for (const button of selectors) {
    button.addEventListener('click', () => selectProject(button.dataset.showcase));
  }
  for (const link of document.querySelectorAll('[data-hero-project]')) {
    link.addEventListener('click', () => selectProject(link.dataset.heroProject));
  }
  for (const button of devices) {
    button.addEventListener('click', () => setDevice(button.dataset.device));
  }

  demoButton.addEventListener('click', () => {
    const project = projects[stage.dataset.project];
    byId('demo-preview-title').textContent = project.name;
    frame.title = 'Demonstração de ' + project.name;
    frame.src = project.url + (project.start || '');
    setDevice(matchMedia('(max-width: 640px)').matches ? 'phone' : 'desktop');
    preview.showModal();
  });
  preview.addEventListener('close', () => frame.removeAttribute('src'));
  byId('showcase-quote').addEventListener('click', () => {
    byId('brief-type').value = projects[stage.dataset.project].goal;
  });
  selectProject('norte');
}
