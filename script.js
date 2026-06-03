/* ============================================================
   Emma portfolio — interactions
   ============================================================ */

/* ---------- hero journey timeline ---------- */
const JOURNEY = [
  { side:'left',  num:'01', title:'Started sewing —<br>12 years ago',          img:'p24' },
  { side:'right', num:'02', title:'Got serious —<br>8 years',                  img:'p30' },
  { side:'left',  num:'03', title:'Took every tech ed<br>class offered',       img:'p29' },
  { side:'right', num:'04', title:'Designing my own<br>prom dresses',          img:'p16' },
  { side:'left',  num:'05', title:'Committed to Furthering<br>Education at Rose-Hulman!', img:'p32' },
];

const journeyEl = document.getElementById('journey');
journeyEl.innerHTML = JOURNEY.map(m => `
  <div class="t-row ${m.side}">
    <div class="t-photo"><img src="assets/thumb/${m.img}.jpg" alt="" loading="lazy"></div>
    <div class="t-text"><div class="t-num">${m.num}</div><h3>${m.title}</h3></div>
    <div class="t-node"><svg class="btn-dot" viewBox="0 0 100 100"><use href="#btn"/></svg></div>
  </div>`).join('');

/* ---------- portfolio gallery ----------
   Each photo is individually clickable -> modal.
   Description is intentionally a placeholder for Emma to fill in.   */
/* each gown groups all its distinct images; imgs[0] is the cover */
const GALLERY = [
  { title:'The Storybook Gown',   meta:'Cream cotton · hand-inked literary bodice',     imgs:['p01','p03','p04','p05','p07','p08'] },
  { title:'Crimson Ruffle Gown',  meta:'Bias-cut · cascading ruffle & slit',            imgs:['p16','p12','p23'] },
  { title:'Gold Bias Gown',       meta:'1930s-inspired satin · cowl neck',              imgs:['p33','p41','p19','p20'] },
  { title:'Emerald Satin Gown',   meta:'Flutter sleeves · open back · sweep train',     imgs:['p35','p37','p36'] },
  { title:'Light-Up Ball Gown',   meta:'LED-lit tulle · color-changing · lace-up boots',imgs:['p29','p27'] },
  { title:'Floral Appliqué Gown', meta:'Sheer tulle · 3D floral appliqué · pink sash',  imgs:['p28','p25'] },
  { title:'Sage Satin Gown',      meta:'Lace-up bodice · floor length',                 imgs:['p02','p42'] },
  { title:'Olive Satin Dress',    meta:'Long sleeves · draped satin',                   imgs:['p43'] },
  { title:'Pink Gingham Sundress',meta:'Gingham · fit-and-flare · handmade',            imgs:['p39'] },
  { title:'Tailored Plaid Jacket',meta:'Cropped · fully lined',                         imgs:['p09','p11'] },
  { title:'Knit A-Line Dress',    meta:'Sleeveless · structured skirt',                 imgs:['p17','p18'] },
  { title:'Light Blue Knit Top',  meta:'Boat-neck · fitted · handmade',                 imgs:['p40'] },
];

/* CubeSat engineering project — opens in the same carousel */
const CUBESAT = {
  title:'The CubeSat Project',
  meta:'MIT Beaver Works · Finalist · Lunar imaging',
  imgs:['cs1','cs7','cs2','cs4','cs6','cs8','cs3','cs5'],
};
const CUBESAT_DESC = "A finalist in the MIT Beaver Works CubeSat program, run by MIT Lincoln Laboratory. The project's goal was to support NASA's Artemis missions — designing a miniature satellite to orbit the Moon and scout surface points of interest. Working independently with a small team of friends, Emma helped build and test imaging against simulated lunar environments: the regolith craters, terrain models, and photo rig shown here.";

const galleryEl = document.getElementById('gallery');
galleryEl.innerHTML = GALLERY.map((g,i) => `
  <button class="tile" data-i="${i}" aria-label="${g.title}">
    <img src="assets/img/${g.imgs[0]}.jpg" alt="${g.title}" loading="lazy">
    ${g.imgs.length>1 ? `<span class="count"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 21h12a2 2 0 0 0 2-2V9"/></svg>${g.imgs.length}</span>` : ''}
    <span class="pin"><svg viewBox="0 0 24 24" fill="none" stroke="#d6859a" stroke-width="2"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg></span>
    <span class="cap"><b>${g.title}</b><span>${g.meta}</span></span>
  </button>`).join('');

/* ---------- modal ---------- */
const modal      = document.getElementById('modal');
const modalImg   = document.getElementById('mImg');
const modalTitle = document.getElementById('mTitle');
const modalMeta  = document.getElementById('mMeta');
const modalDesc  = document.getElementById('mDesc');
const modalClose = document.getElementById('modalClose');

const carThumbs = document.getElementById('carThumbs');
const carPrev   = document.getElementById('carPrev');
const carNext   = document.getElementById('carNext');
const mKicker   = document.getElementById('mKicker');
const mNote     = document.getElementById('mNote');
let curSet = null, curImg = 0;

function renderCarousel(){
  const imgs = curSet.imgs;
  const multi = imgs.length > 1;
  modalImg.src = `assets/img/${imgs[curImg]}.jpg`;
  carPrev.style.display = carNext.style.display = multi ? '' : 'none';
  carThumbs.innerHTML = multi ? imgs.map((im,idx) =>
    `<button class="car-thumb${idx===curImg?' active':''}" data-idx="${idx}" aria-label="Photo ${idx+1}">
       <img src="assets/thumb/${im}.jpg" alt="" loading="lazy">
     </button>`).join('') : '';
}
function step(d){
  const len = curSet.imgs.length;
  curImg = (curImg + d + len) % len;
  renderCarousel();
}
function openSet(set, opt, startIdx){
  curSet = set; curImg = startIdx || 0;
  modalImg.alt = set.title;
  modalTitle.textContent = set.title;
  modalMeta.textContent  = set.meta;
  mKicker.textContent = opt.kicker;
  mNote.textContent   = opt.note;
  modalDesc.textContent = opt.desc;
  modalDesc.classList.toggle('placeholder', !!opt.placeholder);
  renderCarousel();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function openModal(i){
  openSet(GALLERY[i], { kicker:'Handmade by Emma', note:'— How it was made —',
                        desc:'Put description of how you made it.', placeholder:true });
}
function openCubesat(idx){
  openSet(CUBESAT, { kicker:'MIT Beaver Works · Finalist', note:'— About the project —',
                     desc:CUBESAT_DESC, placeholder:false }, idx);
}
carPrev.addEventListener('click', () => step(-1));
carNext.addEventListener('click', () => step(1));
carThumbs.addEventListener('click', e => {
  const t = e.target.closest('.car-thumb');
  if (t){ curImg = +t.dataset.idx; renderCarousel(); }
});

/* CubeSat grid */
const csEl = document.getElementById('cubesatGrid');
if (csEl){
  csEl.innerHTML = CUBESAT.imgs.map((im,i) => `
    <button class="tile" data-i="${i}" aria-label="CubeSat photo ${i+1}">
      <img src="assets/img/${im}.jpg" alt="CubeSat project" loading="lazy">
      <span class="pin"><svg viewBox="0 0 24 24" fill="none" stroke="#d6859a" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg></span>
    </button>`).join('');
  csEl.addEventListener('click', e => {
    const t = e.target.closest('.tile');
    if (t) openCubesat(+t.dataset.i);
  });
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
galleryEl.addEventListener('click', e => {
  const tile = e.target.closest('.tile');
  if (tile) openModal(+tile.dataset.i);
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  else if (e.key === 'ArrowRight') step(1);
  else if (e.key === 'ArrowLeft')  step(-1);
});

/* ---------- nav: mobile toggle + scrolled state ---------- */
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
document.getElementById('navToggle').addEventListener('click', () => menu.classList.toggle('show'));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('show'); });

/* ---------- tape-measure scroll bar ---------- */
const marker = document.getElementById('tapeMarker');
function updateScroll(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = h > 0 ? window.scrollY / h : 0;
  marker.style.top = (p * 100) + 'vh';
  // show a friendly "inches" readout based on total page height
  const inches = Math.round((window.scrollY / Math.max(window.innerHeight,1)) * 12);
  marker.dataset.in = inches;
  nav.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateScroll, { passive:true });
window.addEventListener('resize', updateScroll);
updateScroll();

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- open a piece directly via #piece-N (shareable link) ---------- */
function openFromHash(){
  const m = /^#piece-(\d+)$/.exec(location.hash);
  if (m && GALLERY[+m[1]]) openModal(+m[1]);
}
openFromHash();
window.addEventListener('hashchange', openFromHash);
