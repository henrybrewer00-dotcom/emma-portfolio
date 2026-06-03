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
const GALLERY = [
  { img:'p01', title:'The Storybook Gown',      meta:'Cream cotton · hand-inked literary bodice' },
  { img:'p16', title:'Crimson Ruffle Gown',     meta:'Bias-cut · cascading ruffle & slit' },
  { img:'p19', title:'Gold Bias Gown',          meta:'1930s-inspired satin · cowl neck' },
  { img:'p27', title:'Light-Up Ball Gown',      meta:'LED-lit tulle · color-changing · lace-up boots' },
  { img:'p28', title:'Floral Appliqué Gown',    meta:'Sheer tulle · 3D floral appliqué · pink sash' },
  { img:'p02', title:'Sage Satin Gown',         meta:'Lace-up bodice · floor length' },
  { img:'p11', title:'Tailored Plaid Jacket',   meta:'Cropped · fully lined' },
  { img:'p17', title:'Knit A-Line Dress',       meta:'Sleeveless · structured skirt' },
];

const galleryEl = document.getElementById('gallery');
galleryEl.innerHTML = GALLERY.map((g,i) => `
  <button class="tile" data-i="${i}" aria-label="${g.title}">
    <img src="assets/img/${g.img}.jpg" alt="${g.title}" loading="lazy">
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

function openModal(i){
  const g = GALLERY[i];
  modalImg.src = `assets/img/${g.img}.jpg`;
  modalImg.alt = g.title;
  modalTitle.textContent = g.title;
  modalMeta.textContent  = g.meta;
  modalDesc.textContent  = 'Put description of how you made it.';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

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
