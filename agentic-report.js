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
