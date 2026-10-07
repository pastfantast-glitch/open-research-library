const cases = [
  {slug:'character', title:'角色類', reference:'character-reference.png', alt:'寫實男性頭像', observation:'三款結果均保留正面光頭男性的主要輪廓。白模中，眉骨、眼眶與嘴部的塑形強度不同；貼圖後，Tripo 的面部陰影較強，混元 3D 的臉部比例與參考圖有較明顯偏移。'},
  {slug:'hard-surface', title:'硬表面類', reference:'hard-surface-reference.png', alt:'帶配件的硬表面道具側面圖', observation:'三款結果都呈現長形主體、上方配件與後方支架。細小開孔、握把和零件接合的形狀並不一致；貼圖可見 Meshy 與混元 3D 整體較暗，Tripo 對比及零件邊界較清晰。'},
  {slug:'text-ui', title:'文字 UI 類', reference:'text-ui-reference.jpg', alt:'兩排金紅色立體數字', observation:'三款結果均保留 0 至 9 的兩排排列，數字可辨。白模的襯線、內孔與筆畫厚度各有差異；貼圖中的金紅配色大致保留，但亮部與邊緣處理不同。這組圖不能代表一般文字生成能力。'},
  {slug:'monster', title:'怪物類', reference:'monster-reference.png', alt:'有彎角與獠牙的怪物頭像', observation:'彎角、額頭尖刺、獠牙等主要特徵在三款結果中可見。Meshy 的表面細節偏密，Tripo 的面部結構與參考圖較接近，混元 3D 的形體較像經過重新設計的風格化版本。'},
  {slug:'architecture', title:'建築類', reference:'architecture-reference.png', alt:'有兩側立柱及中央壁面的石造建築構件', observation:'三款結果均保留兩側立柱與中央矩形壁面的配置。Tripo 的中央框線與上方拱飾較突出；Meshy 的貼圖使部分線條較柔和；混元 3D 的白模在裝飾紋樣上更簡化。'},
  {slug:'chibi', title:'Q 版卡通類', reference:'chibi-reference.png', alt:'戴藍色寶石頭飾的 Q 版人物頭像', observation:'三款結果都保留大眼、棕髮與頭飾。Meshy 的貼圖色塊較平面，Tripo 的頭髮層次與面部立體感較強，混元 3D 的眼睛、臉型與頭飾呈現較明顯的重新詮釋。'}
];

const models = [
  {slug:'meshy', label:'Meshy'},
  {slug:'tripo', label:'Tripo'},
  {slug:'hunyuan', label:'混元 3D'}
];
const base = '../assets/3d-comparison/';
const list = document.getElementById('comparison-list');

function imageLink(file, alt, eager = false) {
  const url = base + file;
  return `<button type="button" class="image-link" data-full-image="${url}" aria-label="放大圖片：${alt}"><img src="${url}" alt="${alt}" loading="${eager ? 'eager' : 'lazy'}"><span class="expand-hint" aria-hidden="true">放大檢視 ⤢</span></button>`;
}

function render() {
  list.innerHTML = cases.map((item, index) => `
    <section class="case-study" id="case-${item.slug}" aria-labelledby="title-${item.slug}">
      <div class="case-topline"><span>CASE ${String(index + 1).padStart(2,'0')} / 06</span><span class="case-current-mode">白模比較</span></div>
      <div class="case-heading-row"><h3 id="title-${item.slug}">${item.title}</h3><div class="mode-switch case-mode-switch" role="group" aria-label="${item.title}結果呈現模式"><button type="button" class="active" data-mode="clay" aria-pressed="true">白模</button><button type="button" data-mode="texture" aria-pressed="false">貼圖</button></div></div>
      <div class="comparison-grid">
        <figure class="reference-figure"><figcaption>參考圖</figcaption>${imageLink(item.reference, `${item.title}參考圖：${item.alt}`, index === 0)}</figure>
        ${models.map(model => `<figure data-model="${model.slug}"><figcaption>${model.label}</figcaption>${imageLink(`${item.slug}-${model.slug}-clay.png`, `${item.title}，${model.label}，白模結果`)}</figure>`).join('')}
      </div>
      <p class="case-observation"><span>圖像觀察</span>${item.observation}</p>
    </section>`).join('');
}

render();

list.addEventListener('click', event => {
  const button = event.target.closest('.case-mode-switch button');
  if (!button) return;
  const section = button.closest('.case-study');
  const item = cases.find(entry => section.id === `case-${entry.slug}`);
  const mode = button.dataset.mode;
  section.querySelectorAll('.case-mode-switch button').forEach(option => {
    const active = option === button;
    option.classList.toggle('active', active);
    option.setAttribute('aria-pressed', String(active));
  });
  section.querySelector('.case-current-mode').textContent = mode === 'clay' ? '白模比較' : '貼圖比較';
  section.querySelectorAll('[data-model]').forEach(figure => {
    const model = models.find(entry => entry.slug === figure.dataset.model);
    const url = `${base}${item.slug}-${model.slug}-${mode}.png`;
    const alt = `${item.title}，${model.label}，${mode === 'clay' ? '白模' : '貼圖'}結果`;
    const image = figure.querySelector('img');
    image.src = url;
    image.alt = alt;
    const trigger = figure.querySelector('[data-full-image]');
    trigger.dataset.fullImage = url;
    trigger.setAttribute('aria-label', `放大圖片：${alt}`);
  });
});

const dialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('image-dialog-image');
const dialogCaption = document.getElementById('image-dialog-caption');
let imageTrigger = null;

list.addEventListener('click', event => {
  const trigger = event.target.closest('[data-full-image]');
  if (!trigger) return;
  imageTrigger = trigger;
  dialogImage.src = trigger.dataset.fullImage;
  dialogImage.alt = trigger.querySelector('img').alt;
  dialogCaption.textContent = dialogImage.alt;
  document.body.classList.add('dialog-open');
  dialog.showModal();
});

dialog.querySelector('.image-dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogImage.removeAttribute('src');
  imageTrigger?.focus();
});
