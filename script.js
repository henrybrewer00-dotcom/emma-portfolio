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
  { title:'Story Book Dress',     meta:'Hand-illustrated bodice · lace-up back · 2021',  imgs:['p01','p03','p04','p05','p07','p08'],
    desc:"This gown is a collaboration between a friend and I. I created the bodice and skirt, and she did the illustrations. Created in 2021, it was the first time that I lined a garment fully. It features a lace up back with metal grommets, full length gathered sleeves with button clasp cuffs, and a large skirt." },
  { title:'Maroon Flounce Gown',  meta:'Flounce ruffles · off-shoulder · skirt train',  imgs:['p16','p12','p23'],
    desc:"I created this dress as a project in my Independent Art class. I was heavily inspired by a Mirror Palais gown for the skirt, and used flounces for all of the ruffles. This dress features a lace up back (along with an invisible zipper), flounce sleeves that can be worn on or off the shoulders, and a long skirt train." },
  { title:'Cream Graduation Gown',meta:'Two interchangeable skirts · lace-up back',      imgs:['p33','p41','p19','p20'],
    desc:"This gown was created specifically to take graduation photos. It is made out of the same kind of fabric as my senior prom dress, and features hand sewn grommet holes for the lace up back, two skirts, and a gathered front. The two skirt options are a short half circle skirt, or a long bias cut one." },
  { title:'Senior Prom Dress',    meta:'Original design · low back · pearl detail',      imgs:['p35','p37','p36'],
    desc:"My senior prom dress was a completely original design. I hand drafted a pattern using my favorite custom top pattern, and created a low back and skirt to go along. It features a low back with a back necklace, along with hand sewn pearls on the top of the slit. The top portion is fully lined, and the skirt's seams are fully finished." },
  { title:'Light Up Fairy Skirt', meta:'LED-lit tulle · lace trim · Halloween',          imgs:['p29','p27'],
    desc:"This was a fun and short project for Halloween. I wanted to be a fairy, so I created a simple gathered skirt with some old lace on the bottom. However, I decided it needed something extra. So I sewed fairy lights all through the skirt, and added a small battery pouch on the inside." },
  { title:'Flower Gown',          meta:'Sheer sleeves · empire waist · Bridgerton-inspired', imgs:['p28','p25'],
    desc:"A very early project of mine, this gown was inspired by the empire waistlines and florals I kept seeing as Bridgerton infiltrated my Pinterest. It has big sheer sleeves, an invisible zipper, and a simple lightly gathered skirt." },
  { title:'Junior Prom Dress',    meta:'Floral appliqué · pearl beading · India silk',   imgs:['p02','p42','p44','p46','p45','p47'],
    desc:"This was my junior year prom dress, which I created in my Independent Art class. Created using fabric that a friend brought back from India, it features a low neckline and invisible zipper closure, along with around a dozen handmade floral appliqués and sea bead embellishments along the bust and waist seams." },
  { title:'Freshman Homecoming Dress', meta:"Freshman year · 1980's sleeve pattern · first invisible zipper", imgs:['p43'],
    desc:"This was my freshman year homecoming dress (I also made my friends'!) and while it is not the best gown I have made, I learned a lot from it. The sleeves are from an old 1980's pattern, and the rest I made myself. I learned how to deal with incredibly slick fabrics, and figured out invisible zippers for the first time on this dress!" },
  { title:'Barbie Halloween Costume', meta:'Barbie-movie recreation · box-pleat skirt · 4-panel bodice', imgs:['p39'],
    desc:"This is a recreation of Margot Robbie's outfit in the Barbie movie, for a friend! It has a very simple box pleat skirt, and a 4 panel bodice with an invisible zipper closure." },
  { title:'Purple Wool Cropped Blazer', meta:'60+ hours · lilac velvet lining · cropped wool', imgs:['p09','p11'],
    desc:"This project was all about improving my technical skills. While I had been sewing for almost 6 years at this point, I felt I was still missing a lot of critical skills, like pattern reading, hand sewing, and understanding complicated linings. This jacket helped me refine all of these skills. It took 60+ hours to make, and has a fantastic lilac velvet lining. I hand sewed the bottom of the lining in, and added a back pleat into the lining for extra comfortability. Overall, it is one of the most technically impressive garments I have made so far!" },
  { title:'Simple Wool Dress',    meta:'Self-drafted · two-panel · most-worn favorite', imgs:['p17','p18'],
    desc:"I made this gown using (once again) my favorite self drafted shirt pattern. It's incredibly simple, featuring only two panels and two back darts for extra shaping. Despite its simple pattern, it is one of my most worn items, and continues to be a favorite of mine. I also created a matching jacket, but I unfortunately need to add in some extra fabric stiffener into the collar before I can wear it out." },
  { title:'Boatneck Top',         meta:'Self-drafted · one pattern piece · made in 4 colors', imgs:['p40'],
    desc:"As my favorite thing I've ever made, this self drafted shirt has been used no less than a dozen times for a variety of purposes. I have created the top itself in 4 different colors, and have used the pattern as a base for 3 separate dresses. It is the most simple pattern possible, as a single pattern piece creates both the front and back panels. There are no darts, no buttons, and no zipper. Only 4 pieces created out of one pattern piece. However, it is a staple in my wardrobe and will continue to be my most used pattern." },
];

/* CubeSat engineering project — opens in the same carousel */
const CUBESAT = {
  title:'The CubeSat Project',
  meta:'MIT Beaver Works · Finalist · Lunar imaging',
  imgs:['cs1','cs9','cs7','cs2','cs4','cs6','cs8','cs3','cs5'],
};
const CUBESAT_DESC = "A finalist in the MIT Beaver Works CubeSat program, run by MIT Lincoln Laboratory. The project's goal was to support NASA's Artemis missions — designing a miniature satellite to orbit the Moon and scout surface points of interest. Working independently with a small team of friends, I helped build and test imaging against simulated lunar environments: the regolith craters, terrain models, and photo rig shown here.";

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
  const g = GALLERY[i];
  openSet(g, { kicker:'Handmade by me', note:'— How it was made —',
               desc: g.desc || 'Put description of how you made it.', placeholder: !g.desc });
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
