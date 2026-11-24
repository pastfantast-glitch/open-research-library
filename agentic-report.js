(() => {
  'use strict';
  const dialog = document.querySelector('.image-dialog');
  const viewer = window.createResearchLightbox(dialog, document.querySelector('#large'), document.querySelector('#caption'), document.querySelector('#close'));
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('#original-image').href = button.dataset.image;
      document.body.classList.add('dialog-open');
      viewer.open(button.dataset.image, button.querySelector('img').alt, button);
    });
  });
  const tabs = [...document.querySelectorAll('[data-part]')];
  const panels = [...document.querySelectorAll('.part-panel')];
  function select(id) {
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.part === id)));
    panels.forEach(panel => { panel.hidden = panel.id !== id; });
  }
  tabs.forEach(tab => tab.addEventListener('click', () => select(tab.dataset.part)));
  if (tabs.length) { select(tabs[0].dataset.part); document.body.classList.add('js-enabled'); }
  let openedForPrint = [];
  window.addEventListener('beforeprint', () => {
    openedForPrint = [...document.querySelectorAll('details:not([open])')];
    openedForPrint.forEach(item => { item.open = true; });
  });
  window.addEventListener('afterprint', () => {
    openedForPrint.forEach(item => { item.open = false; });
    openedForPrint = [];
  });
})();
