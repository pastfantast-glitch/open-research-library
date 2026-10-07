const cases = [
  {slug:'character', title:'角色類', reference:'character-reference.png', alt:'寫實男性頭像', notes:[
    ['Meshy','頭部比例與臉部輪廓接近參考圖，表情自然。','眼周與眉毛偏平滑，細部辨識度較弱。'],
    ['Tripo','眉骨、鼻樑與嘴部起伏清楚，膚色也接近設定。','眉眼陰影較重，臉部顯得更嚴肅、稜角更強。'],
    ['混元 3D','光頭、耳朵與五官配置完整，主體容易辨識。','臉型被拉長，眼眶與下巴比例偏離參考圖。']
  ]},
  {slug:'hard-surface', title:'硬表面類', reference:'hard-surface-reference.png', alt:'帶配件的硬表面道具側面圖', notes:[
    ['Meshy','主體、瞄具與槍托配置完整，直線輪廓明確。','握把與彈匣形狀有偏差；貼圖偏暗，零件層次變弱。'],
    ['Tripo','開孔、瞄具與接合處較清楚，深淺配色貼近參考圖。','握把及部分零件比例改動，局部輪廓仍不一致。'],
    ['混元 3D','保留長形主體與後方支架，硬邊結構可辨。','細節較簡化；貼圖過暗，前段開孔不易看清。']
  ]},
  {slug:'text-ui', title:'文字 UI 類', reference:'text-ui-reference.jpg', alt:'兩排金紅色立體數字', notes:[
    ['Meshy','數字排列完整，筆畫邊緣與斜面較有硬表面感。','金屬反光偏弱，紅色內側的材質層次較平。'],
    ['Tripo','0–9 可辨，金紅配色與亮部對比醒目。','筆畫和倒角過圓，呈膨軟感，失去設定圖的俐落硬邊。'],
    ['混元 3D','數字與內孔清楚，白模邊緣比 Tripo 俐落。','貼圖偏橘黃、表面較像塑膠，金屬質感不足。']
  ]},
  {slug:'monster', title:'怪物類', reference:'monster-reference.png', alt:'有彎角與獠牙的怪物頭像', notes:[
    ['Meshy','彎角、尖刺與鱗片密度高，怪物特徵鮮明。','尖刺過密，鼻口與下顎構造比設定圖更繁複。'],
    ['Tripo','角、額刺、眼周與獠牙的位置接近設定，石質貼圖有層次。','嘴部開口與側面尖刺仍有局部變形。'],
    ['混元 3D','角與獠牙完整，正面對稱性高。','臉部更平滑且裝甲化，表面明暗偏黑，少了粗糙石質感。']
  ]},
  {slug:'architecture', title:'建築類', reference:'architecture-reference.png', alt:'有兩側立柱及中央壁面的石造建築構件', notes:[
    ['Meshy','立柱、中央框與磚塊分區保留，整體配置清楚。','頂部拱飾較單薄；貼圖偏淡，石材與刻線對比不足。'],
    ['Tripo','框線、拱飾與下緣紋樣完整，石材明暗接近設定。','柱腳與局部磚縫形狀不同，細節有重組。'],
    ['混元 3D','牆面與立柱比例穩定，外觀容易辨識。','拱飾與中央框較簡化，石材貼圖的粗糙變化較少。']
  ]},
  {slug:'chibi', title:'Q 版卡通類', reference:'chibi-reference.png', alt:'戴藍色寶石頭飾的 Q 版人物頭像', notes:[
    ['Meshy','大眼、髮束與藍色寶石都有保留，表情親和。','貼圖色塊較平，髮絲和臉部的立體層次較弱。'],
    ['Tripo','髮束分層、眼睛高光與頭飾細節豐富。','額前髮型與臉部比例改動，畫面多出肩部服裝。'],
    ['混元 3D','大眼與圓臉風格接近設定，頭飾位置明確。','髮束走向與眼形重新詮釋，局部輪廓不完全一致。']
  ]}
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
      <div class="case-assessment"><h4>各工具的優點與不足</h4>${item.notes.map(([name, strength, weakness]) => `<div class="assessment-row"><strong>${name}</strong><p><span class="assessment-label">優點</span>${strength}</p><p><span class="assessment-label">不足</span>${weakness}</p></div>`).join('')}</div>
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
