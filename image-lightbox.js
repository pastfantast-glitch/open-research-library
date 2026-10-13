// One request owns the dialog. Late image loads cannot replace a newer selection.
window.createResearchLightbox = function (dialog, image, caption, closeButton) {
  let request = 0;
  let pending = null;
  let trigger = null;
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'min-width:min(400px,70vw);min-height:140px;display:none;align-items:center;justify-content:center;text-align:center;clear:both;';
  image.before(status);

  function clear() {
    request++;
    if (pending) {
      pending.onload = null;
      pending.onerror = null;
      pending = null;
    }
    image.style.display = 'none';
    image.removeAttribute('src');
    image.alt = '';
    status.style.display = 'none';
    dialog.removeAttribute('aria-busy');
  }
  function close() {
    clear();
    dialog.close();
  }
  function open(url, alt, opener) {
    clear();
    trigger = opener;
    const ticket = request;
    caption.textContent = alt;
    status.textContent = '圖片載入中…';
    status.style.display = 'flex';
    dialog.setAttribute('aria-busy', 'true');
    if (!dialog.open) dialog.showModal();
    const loader = new Image();
    pending = loader;
    loader.onload = () => {
      if (ticket !== request || !dialog.open) return;
      image.src = url;
      image.alt = alt;
      image.style.display = 'block';
      status.style.display = 'none';
      dialog.removeAttribute('aria-busy');
      pending = null;
    };
    loader.onerror = () => {
      if (ticket !== request || !dialog.open) return;
      status.textContent = '圖片載入失敗，請關閉後重新點選。';
      dialog.removeAttribute('aria-busy');
      pending = null;
    };
    loader.src = url;
  }
  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('cancel', clear);
  dialog.addEventListener('close', () => {
    // The close event can arrive after a rapid reopen.
    if (dialog.open) return;
    clear();
    document.body.classList.remove('dialog-open');
    trigger?.focus();
  });
  return { open, close };
};
