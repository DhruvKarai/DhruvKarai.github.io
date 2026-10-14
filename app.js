(function(){
var bar=document.getElementById('prog');
if(bar){addEventListener('scroll',function(){var h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true})}
var q=document.getElementById('q');
if(q){var cards=[].slice.call(document.querySelectorAll('.card')),chips=[].slice.call(document.querySelectorAll('.chip')),cat='all',empty=document.getElementById('empty');
function f(){var v=q.value.trim().toLowerCase(),n=0;cards.forEach(function(c){var ok=(cat==='all'||c.dataset.cat===cat)&&(!v||c.dataset.s.indexOf(v)>-1);c.style.display=ok?'':'none';if(ok)n++});empty.style.display=n?'none':'block'}
q.addEventListener('input',f);chips.forEach(function(b){b.addEventListener('click',function(){cat=b.dataset.cat;chips.forEach(function(x){x.setAttribute('aria-pressed',x===b)});f()})});
addEventListener('keydown',function(e){if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus()}})}
var det=[].slice.call(document.querySelectorAll('details'));
var ex=document.getElementById('expand');
if(ex){ex.addEventListener('click',function(){var open=det.some(function(d){return !d.open});det.forEach(function(d){d.open=open});ex.textContent=open?'Collapse all':'Expand all'})}
var toc=[].slice.call(document.querySelectorAll('.toc a'));
toc.forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){t.open=true;}})});
if('IntersectionObserver' in window&&toc.length){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){toc.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});det.forEach(function(d){io.observe(d)})}
var seg=document.querySelectorAll('.seg button');
if(seg.length){var n1=document.querySelector('.n1'),np=document.querySelector('.p'),pn=document.getElementById('pn'),pp=document.getElementById('pp');
function m(v){seg.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.m===v)});
n1.classList.toggle('hit',v==='nsaid'||v==='both');np.classList.toggle('hit',v==='para'||v==='both');
pn.classList.toggle('dim',v==='para');pp.classList.toggle('dim',v==='nsaid');pn.classList.toggle('hl',v==='nsaid');pp.classList.toggle('hl',v==='para')}
seg.forEach(function(b){b.addEventListener('click',function(){m(b.dataset.m)})});m('both')}
})();
(function(){
var m=document.querySelector('main');if(!m)return;
var tl=[].slice.call(document.querySelectorAll('.toc a'));
if(tl.length){var L=document.querySelector('.layout');var n=document.createElement('nav');n.className='mtoc';n.setAttribute('aria-label','On this page');
tl.forEach(function(a){var c=a.cloneNode(true);c.className='';n.appendChild(c)});
L.parentNode.insertBefore(n,L);
var ml=[].slice.call(n.querySelectorAll('a'));
n.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;var t=document.querySelector(a.getAttribute('href'));if(t)t.open=true});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){ml.forEach(function(a){var on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);if(on&&n.scrollWidth>n.clientWidth){n.scrollLeft=a.offsetLeft-16}})}})},{rootMargin:'-25% 0px -65% 0px'});[].forEach.call(document.querySelectorAll('details'),function(d){io.observe(d)})}}
var b=document.createElement('button');b.className='totop';b.type='button';b.setAttribute('aria-label','Back to top');b.textContent='\u2191';document.body.appendChild(b);
b.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
addEventListener('scroll',function(){b.classList.toggle('show',scrollY>900)},{passive:true});
})();
(function(){var h=document.querySelector('.hero');var cs=[].slice.call(document.querySelectorAll('.card strong'));
if(!h||!cs.length)return;var r=document.createElement('div');r.className='ribbon';r.setAttribute('aria-hidden','true');
var t=cs.map(function(c){return '<span>'+c.textContent+'</span>'}).join('');r.innerHTML='<div>'+t+t+'</div>';h.parentNode.insertBefore(r,h.nextSibling)})();

(function(){var q=document.getElementById('q'),c=document.getElementById('count'),s=document.getElementById('sort'),g=document.getElementById('grid');if(!q||!c)return;
var cards=[].slice.call(document.querySelectorAll('.card')),orig=cards.slice();
function upd(){var n=cards.filter(function(x){return x.style.display!=='none'}).length;c.textContent='Showing '+n+(n===1?' medicine':' medicines')}
q.addEventListener('input',upd);[].forEach.call(document.querySelectorAll('.chip,.pop'),function(b){b.addEventListener('click',function(){setTimeout(upd,0)})});
s.addEventListener('change',function(){var a=s.value==='az'?cards.slice().sort(function(x,y){return x.querySelector('strong').textContent.localeCompare(y.querySelector('strong').textContent)}):orig;a.forEach(function(x){g.appendChild(x)})});})();

(function(){var q=document.getElementById('q'),c=document.getElementById('count');if(!q)return;[].forEach.call(document.querySelectorAll('.pop'),function(b){b.addEventListener('click',function(){q.value=b.dataset.q||'';q.dispatchEvent(new Event('input',{bubbles:true}));var t=c||document.getElementById('grid');if(t){t.setAttribute('tabindex','-1');t.scrollIntoView({behavior:'smooth',block:'start'});t.focus({preventScroll:true})}})})})();

(function(){var q=document.getElementById('q');if(!q)return;var box=q.closest('.search');if(!box)return;
var cards=[].slice.call(document.querySelectorAll('.card'));
var items=cards.map(function(c){var slug=c.getAttribute('href').replace(/^.*\//,'').replace('.html','');var words=(c.dataset.s||'').toLowerCase().split(/[^a-z0-9-]+/).filter(function(w){return w.length>=4});
var name=slug.charAt(0).toUpperCase()+slug.slice(1);return{c:c,slug:slug,name:name,words:[slug].concat(words)}});
function lev(a,b,m){if(Math.abs(a.length-b.length)>m)return m+1;var p=[],i,j;for(j=0;j<=b.length;j++)p[j]=j;for(i=1;i<=a.length;i++){var cur=[i],mn=i;for(j=1;j<=b.length;j++){cur[j]=Math.min(p[j]+1,cur[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));if(cur[j]<mn)mn=cur[j]}if(mn>m)return m+1;p=cur}return p[b.length]}
function score(it,v){var best=99;it.words.forEach(function(w,wi){var s;if(w.indexOf(v)===0)s=0;else if(w.indexOf(v)>-1)s=1;else{var m=v.length<=4?1:v.length<=7?2:3;var d=lev(v,w.slice(0,Math.max(v.length,1)+1),m);if(d>m)d=lev(v,w,m);s=d<=m?2+d:99}if(s<99&&wi>0)s+=.5;if(s<best)best=s});return best}
var dd=document.createElement('ul');dd.id='sugg';dd.setAttribute('role','listbox');dd.hidden=true;box.style.position='relative';box.appendChild(dd);
q.setAttribute('aria-controls','sugg');q.setAttribute('aria-autocomplete','list');
function hide(){dd.hidden=true;dd.innerHTML=''}
function show(){var v=q.value.trim().toLowerCase();if(v.length<2){hide();return}
var r=items.map(function(it){return{it:it,s:score(it,v)}}).filter(function(x){return x.s<99}).sort(function(a,b){return a.s-b.s||a.it.name.localeCompare(b.it.name)}).slice(0,5);
dd.innerHTML='';if(!r.length){var li=document.createElement('li');li.className='none';li.textContent='No close match. Try another spelling.';dd.appendChild(li);dd.hidden=false;return}
var exact=r[0].s<=1.5;var head=document.createElement('li');head.className='hd';head.textContent=exact?'Medicines':'Did you mean';dd.appendChild(head);
r.forEach(function(x){var li=document.createElement('li');li.setAttribute('role','option');var a=document.createElement('a');a.href='medicines/'+x.it.slug+'.html';a.textContent=x.it.name;li.appendChild(a);dd.appendChild(li)});dd.hidden=false}
q.addEventListener('input',show);q.addEventListener('focus',show);
document.addEventListener('click',function(e){if(!box.contains(e.target))hide()});
q.addEventListener('keydown',function(e){if(e.key==='Escape')hide();if(e.key==='Enter'){var a=dd.querySelector('a');var v=q.value.trim().toLowerCase();var vis=cards.some(function(c){return c.style.display!=='none'});if(a&&!vis&&!dd.hidden){e.preventDefault();location.href=a.href}}});
/* if nothing matches as typed, show the close matches in the grid too */
function grid(){var v=q.value.trim().toLowerCase();if(v.length<2)return;var any=cards.some(function(c){return c.style.display!=='none'});if(any)return;
var ok=items.filter(function(it){return score(it,v)<99});if(!ok.length)return;cards.forEach(function(c){c.style.display=ok.some(function(it){return it.c===c})?'':'none'});var e=document.getElementById('empty');if(e)e.style.display='none';var n=document.getElementById('count');if(n)n.textContent='Showing '+ok.length+' close '+(ok.length===1?'match':'matches')}
q.addEventListener('input',function(){setTimeout(grid,0)});
})();

(function(){var h=document.documentElement,K='doc-theme',st=null;try{st=localStorage.getItem(K)}catch(e){}
var mq=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)');
function cur(){return st||(mq&&mq.matches?'dark':'light')}
function apply(){var t=cur();h.setAttribute('data-theme',t);var b=document.getElementById('themebtn');if(b){b.setAttribute('aria-pressed',t==='dark');b.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to night mode');b.innerHTML=t==='dark'?'\u2600 Light':'\u263E Night'}}
var nav=document.querySelector('.top nav');if(nav&&!document.getElementById('themebtn')){var b=document.createElement('button');b.type='button';b.id='themebtn';b.className='themebtn';nav.appendChild(b);b.addEventListener('click',function(){st=cur()==='dark'?'light':'dark';try{localStorage.setItem(K,st)}catch(e){}apply()})}
if(mq&&mq.addEventListener)mq.addEventListener('change',function(){if(!st)apply()});apply()})();

;(function(){
var DOC_STEPS={"ACE (angiotensin-converting enzyme)": "A protein in the body that turns angiotensin I into angiotensin II. Blocking it is how ACE inhibitors lower blood pressure.", "ADP released on platelets": "When platelets are triggered they release a chemical called ADP, which tells more platelets to switch on and stick together.", "Acid pump enzyme (H+, K+-ATPase)": "The 'pump' in the stomach lining that pushes acid into the stomach. It is the final step in making stomach acid.", "Adrenaline and noradrenaline": "Natural chemical messengers (stress hormones) that speed up the heart and tighten blood vessels. They act on beta receptors.", "Airway muscle relaxes": "The ring of muscle around the airways loosens, so the airways widen.", "Airways open wider, easier to breathe": "Wider airways let air move in and out more easily, so breathing feels easier.", "Allergen contact": "Something you are allergic to (such as pollen) touches the nose, eyes or airways and sets off the allergic reaction.", "Alpha-1A and alpha-1D receptors in prostate and urethra": "Docking points on muscle in the prostate and the tube that carries urine out. When they are switched on, the muscle tightens.", "Angiotensin I": "An inactive hormone made in the blood. It has little effect until ACE converts it into angiotensin II.", "Angiotensin II": "A hormone that narrows blood vessels and triggers the body to hold on to salt and water, which raises blood pressure.", "Arachidonic acid": "A fatty acid released from cell membranes. It is the starting material the body uses to make prostaglandins.", "Bacteria grow and multiply": "Bacteria divide and spread. If this carries on unchecked, the infection gets worse.", "Bacteria need new proteins": "Bacteria constantly build proteins to grow and survive. Stopping this slows them down.", "Bacterial ribosome (50S subunit)": "Ribosomes are the tiny machines that build proteins. Bacterial ribosomes are different enough from human ones that a medicine can target them.", "Beta-1 receptors in the heart": "Docking points on heart muscle. When adrenaline binds to them, the heart beats faster and harder.", "Beta-2 receptors on airway muscle": "Docking points on the muscle around the airways. When switched on, they make that muscle relax.", "Blood clot": "A clump of platelets and fibrin (a sticky protein mesh) that seals a damaged blood vessel. A clot in the wrong place can block blood flow.", "Blood clots": "Clumps of platelets and fibrin (a sticky protein mesh) that seal a damaged blood vessel. A clot in the wrong place can block blood flow.", "COX enzymes (cyclo-oxygenase)": "Enzymes that make prostaglandins. NSAIDs such as ibuprofen block them.", "Calcium channels in blood vessel muscle": "Tiny gates in the muscle of blood vessel walls. Calcium passing through them makes the muscle tighten.", "Calcium flows in to the muscle cell": "Calcium entering the muscle cell is the signal that makes the muscle tighten.", "Cell metabolism rate (how fast cells use energy)": "How quickly the body's cells use energy. Thyroid hormones set this pace.", "Cholesterol made in the liver": "The liver makes most of the body's cholesterol. A statin reduces how much it makes.", "Clotting factors in the blood": "Proteins in the blood that work in a chain to form a clot. The liver makes several of them.", "Cyclo-oxygenase enzyme in platelets": "The COX enzyme inside platelets. Low-dose aspirin blocks it for the life of the platelet.", "Faster, stronger heartbeat": "The heart beats faster and with more force, which raises the heart's workload.", "Gaviscon meets stomach acid": "Gaviscon reacts with stomach acid and changes into a thick gel.", "Gel \"raft\" forms": "A thick gel layer forms that is lighter than the stomach contents.", "Gut contents move along": "Food and waste travel through the bowel. When this slows down, stools become hard and hard to pass.", "Gut handles glucose from food": "The gut breaks food down and absorbs glucose (sugar) into the blood.", "Gut movement (motility)": "The wave-like squeezing of the bowel muscle that pushes contents along.", "HMG-CoA reductase (enzyme in the liver)": "The liver enzyme that controls the main step in making cholesterol. Statins block it.", "Higher heart rate and blood pressure": "When the heart is driven harder and vessels are tighter, pulse and blood pressure go up.", "Histamine H1 receptors": "Docking points that histamine binds to. They cause itching, sneezing and a runny nose. Antihistamines block them.", "Histamine released": "In an allergic reaction, cells release histamine, a chemical that causes the symptoms.", "Infection continues": "If bacteria are not stopped, they keep multiplying and the illness carries on.", "Inflammatory and immune response": "The body's defence reaction, which can cause redness, swelling and symptoms.", "Intact bacterial cell wall": "Bacteria rely on a strong outer wall. Without it they cannot hold their shape and burst.", "Itching, sneezing, runny nose": "The familiar allergy symptoms that histamine causes.", "Less acid reflux into the gullet": "With less acid in the stomach, there is less acid to splash up into the gullet (oesophagus), so heartburn eases.", "Less fluid returns to the blood": "The kidney lets more salt and water pass out as urine, so less fluid is taken back into the blood.", "Less serotonin available": "With serotonin removed quickly, less stays between nerve cells to pass on its message.", "Liver makes glucose": "The liver releases stored and newly made glucose into the blood, especially between meals.", "Loose, frequent stools": "Faster movement through the bowel leaves less time for water to be absorbed, so stools become looser.", "Making clotting factors II, VII, IX and X": "The liver builds these four clotting proteins. It needs vitamin K to finish them.", "Membrane lipids": "Fats that make up the outer layer of body cells. They are the original source of the raw material for prostaglandins.", "Mevalonate (a building block of cholesterol)": "A chemical made on the way to cholesterol. Blocking the step before it reduces cholesterol production.", "Muscle and other tissues take up glucose": "Muscle and other tissues move glucose out of the blood to use for energy.", "Na-K-2Cl co-transporter (loop of Henle)": "A salt carrier in part of the kidney tubule called the loop of Henle. It reabsorbs salt, and water follows it.", "Narrowed vessels and aldosterone": "Angiotensin II narrows blood vessels and prompts the hormone aldosterone, which makes the kidneys keep salt and water.", "Nerve cell releases serotonin": "A nerve cell sends out serotonin to pass a signal to the next cell.", "Nerve signals": "Electrical and chemical messages passed between nerve cells.", "Nervous system": "The brain, spinal cord and nerves, which send signals around the body.", "Neurotransmitter release": "A nerve cell releases chemical messengers (neurotransmitters) to pass its signal on.", "Opioid receptors in the gut wall": "Docking points in the bowel wall that opioid-type medicines bind to. Their effect is to slow the gut down.", "Overactive nerve signals": "Nerve cells firing too much or too easily.", "P2Y12 receptor": "A docking point on platelets that ADP binds to. When it is switched on, platelets become sticky.", "PBP enzymes (penicillin-binding proteins)": "Enzymes bacteria use to build their cell wall. Penicillin-type antibiotics attach to them.", "Pain felt": "The brain receives the pain signal and you notice pain.", "Pain signal from the body": "Injured tissue sends pain signals along the nerves towards the brain.", "Pain, swelling and fever": "Prostaglandins help cause these three symptoms.", "Parietal cells (stomach lining)": "The cells in the stomach lining that make stomach acid.", "Peptidoglycan is built (a structural part of the wall)": "Peptidoglycan is the mesh that gives a bacterial cell wall its strength. Bacteria keep building it as they grow.", "Platelets activate and stick together": "Platelets are small blood cell fragments. When triggered they become sticky and clump together to start a clot.", "Prostaglandin synthetase (COX)": "Another name for the COX enzyme, which makes prostaglandins.", "Prostaglandins": "Chemical messengers the body makes. They help cause pain, swelling and fever, and have other jobs too, such as protecting the stomach lining.", "Protein synthesis": "The way cells build proteins from building blocks.", "Protein synthesis in bacteria": "The way bacteria build the proteins they need to grow. Some antibiotics interfere with it.", "Raft floats on stomach contents": "The gel layer floats on top of the stomach contents, like a lid.", "Salt and water in the kidney tubule": "Salt and water filtered from the blood pass along the kidney tubules, where much of it is normally taken back in.", "Salt and water reabsorbed": "The kidney takes salt and water back into the blood instead of passing them out as urine.", "Seizures or nerve pain": "These happen when nerve cells fire too much or too easily.", "Serotonin (5-HT) acts between nerve cells": "Serotonin (also called 5-HT) is a chemical messenger that passes signals across the gap between nerve cells.", "Serotonin is taken back up into the nerve cell": "After passing on its message, serotonin is pulled back into the nerve cell that released it.", "Serotonin reuptake (transporter)": "A transporter in the nerve cell wall that pulls serotonin back in once it has passed on its message.", "Serotonin taken back into the nerve cell": "After passing on its message, serotonin is pulled back into the nerve cell that released it.", "Serotonin's effects are boosted": "More serotonin stays in the gap, so its message is passed on more strongly.", "Slower urine flow": "When muscle around the urethra stays tight, urine passes more slowly.", "Smooth muscle tightens": "Smooth muscle is the kind found in airways, blood vessels and the gut, which you do not control. When it tightens, the tube narrows.", "Stomach acid is released": "Acid is pumped out of the stomach lining into the stomach.", "Swelling, redness and symptoms": "Typical signs of the body's inflammatory and defence response.", "T4 is converted in the body to T3 (tri-iodothyronine)": "T4 (thyroxine) is the main form made by the thyroid. The body converts it into T3, the more active form.", "Thromboxane A2 made": "A chemical made from the COX enzyme in platelets that makes them stick together and the blood vessel narrow.", "Thyroid gland makes thyroxine (T4)": "The thyroid, a small gland in the neck, makes the hormone thyroxine (T4).", "Trigger such as allergy or injury": "Something sets the reaction off, such as an allergen or an injury.", "Vessel muscle contracts, vessels stay narrower": "The muscle in blood vessel walls tightens, so vessels are narrower and blood pressure is higher.", "Vitamin K": "A vitamin the body needs to finish making several clotting proteins in the liver.", "Voltage-gated calcium channels (alpha-2-delta)": "Gates on nerve cells that let calcium in when the cell is active. Calcium entry triggers the release of chemical messengers."};
var DOC_TERMS=[["NSAIDs?", "NSAID", "Short for non-steroidal anti-inflammatory drug. A group of painkillers, including ibuprofen and naproxen, that also reduce inflammation and fever."], ["enzymes?", "Enzyme", "A protein that speeds up a chemical reaction in the body."], ["receptors?", "Receptor", "A docking point on a cell. A chemical messenger or a medicine fits onto it like a key in a lock and changes what the cell does."], ["platelets?", "Platelets", "Tiny blood cell fragments that stick together to plug a damaged blood vessel and start a clot."], ["prostaglandins?", "Prostaglandins", "Chemical messengers the body makes. They help cause pain, swelling and fever, and have other jobs too, such as protecting the stomach lining."], ["inhibitors?", "Inhibitor", "A medicine that blocks or slows down something, usually an enzyme."], ["ulcers?", "Ulcer", "A sore on the lining of the stomach or gut."], ["angioedema", "Angioedema", "Sudden swelling under the skin, often of the face, lips, tongue or throat. It can be serious. Get urgent medical help if it happens."], ["renal", "Renal", "To do with the kidneys."], ["anticoagulants?", "Anticoagulant", "A medicine that makes blood take longer to clot. Often called a blood thinner."], ["INR", "INR", "A blood test that shows how long your blood takes to clot. It is used to check how warfarin is working."], ["statins?", "Statin", "A medicine that lowers cholesterol by reducing how much the liver makes."], ["cholesterol", "Cholesterol", "A fatty substance in the blood. Too much of the 'bad' (LDL) kind raises the risk of heart disease and stroke."], ["antihistamines?", "Antihistamine", "A medicine that blocks histamine, the chemical behind many allergy symptoms."], ["half-life", "Half-life", "The time it takes for the amount of a medicine in the body to fall by half."], ["metabolised", "Metabolised", "Broken down by the body, mostly in the liver."], ["reflux", "Reflux", "Stomach acid coming back up into the gullet, which causes heartburn."], ["diuretics?", "Diuretic", "A 'water tablet'. It makes the kidneys pass more salt and water as urine."], ["thyroid", "Thyroid", "A small gland in the neck that makes hormones controlling how the body uses energy."], ["withdrawal", "Withdrawal", "Unpleasant symptoms that can happen when a medicine is stopped suddenly after regular use."], ["anaphyla\\w+", "Anaphylaxis", "A severe, sudden allergic reaction. It is an emergency: call 999."], ["asthma", "Asthma", "A long-term condition where the airways become inflamed and narrow, causing wheeze, cough and breathlessness."], ["oedema", "Oedema", "Swelling caused by fluid building up in the body, often in the ankles."], ["SmPC", "SmPC", "Summary of Product Characteristics. The official, detailed information for healthcare professionals that goes with each licensed medicine."], ["BNF", "BNF", "British National Formulary. The main UK reference on how medicines are used."], ["eMC", "eMC", "The electronic medicines compendium. A UK website with the official leaflets and SmPCs for licensed medicines."], ["contraindicat\\w+", "Contraindicated", "Should not be used, because it could cause harm."], ["serotonin syndrome", "Serotonin syndrome", "A rare but serious reaction when too much serotonin builds up. Signs include agitation, sweating, shaking and fever. It needs urgent medical help."], ["rhabdomyolysis", "Rhabdomyolysis", "Severe muscle breakdown that can harm the kidneys."], ["lactic acidosis", "Lactic acidosis", "A rare, serious build-up of lactic acid in the blood."]];
var DOC_SLUGS=["amlodipine", "amoxicillin", "aspirin", "atorvastatin", "bisoprolol", "cetirizine", "citalopram", "clarithromycin", "clopidogrel", "co-codamol", "doxycycline", "fluoxetine", "furosemide", "gabapentin", "gaviscon", "ibuprofen", "levothyroxine", "lisinopril", "loperamide", "loratadine", "metformin", "naproxen", "omeprazole", "paracetamol", "prednisolone", "ramipril", "salbutamol", "sertraline", "tamsulosin", "warfarin"];
function docEnhance(r, on, cleanup) {
  /* gentle fade-in as sections scroll into view */
  if ('IntersectionObserver' in window && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var rv = [].slice.call(r.querySelectorAll('.card, .keys li, .fact, .sechead, .pg, .dg'));
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    rv.forEach(function (el, k) { var b = el.getBoundingClientRect(); if (b.top < window.innerHeight && b.bottom > 0) return; el.classList.add('rv'); el.style.transitionDelay = ((k % 3) * 60) + 'ms'; io.observe(el); });
    cleanup.push(function () { io.disconnect(); });
  }
  var main = r.querySelector('main');
  var isMed = !!r.querySelector('.dhero');
  if (!main || !isMed) return;
  var tip = document.createElement('div');
  tip.className = 'tip'; tip.setAttribute('role', 'dialog'); tip.hidden = true;
  tip.innerHTML = '<b class="tt"></b><p class="tb"></p><button type="button" class="tx" aria-label="Close">Close</button>';
  r.appendChild(tip);
  var cur = null;
  function hide() { tip.hidden = true; if (cur) { cur.setAttribute('aria-expanded', 'false'); cur.focus && cur.focus({ preventScroll: true }); } cur = null; }
  function show(el, title, body) {
    if (cur === el && !tip.hidden) { hide(); return; }
    if (cur) cur.setAttribute('aria-expanded', 'false');
    cur = el; el.setAttribute('aria-expanded', 'true');
    tip.querySelector('.tt').textContent = title;
    tip.querySelector('.tb').textContent = body;
    tip.hidden = false; tip.style.visibility = 'hidden';
    var b = el.getBoundingClientRect(), w = window.innerWidth;
    if (w <= 600) { tip.className = 'tip sheet'; tip.style.left = ''; tip.style.top = ''; }
    else {
      tip.className = 'tip';
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var x = Math.min(Math.max(8, b.left + b.width / 2 - tw / 2), w - tw - 8);
      var y = b.bottom + 8; if (y + th > window.innerHeight - 8) y = Math.max(8, b.top - th - 8);
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    }
    tip.style.visibility = '';
  }
  on(tip.querySelector('.tx'), 'click', hide);
  on(document, 'click', function (e) { if (!tip.hidden && !tip.contains(e.target) && e.target !== cur && !(cur && cur.contains(e.target))) { tip.hidden = true; if (cur) cur.setAttribute('aria-expanded', 'false'); cur = null; } });
  on(document, 'keydown', function (e) { if (e.key === 'Escape' && !tip.hidden) hide(); });
  on(window, 'scroll', function () { if (!tip.hidden && window.innerWidth > 600) { tip.hidden = true; if (cur) cur.setAttribute('aria-expanded', 'false'); cur = null; } }, { passive: true });
  /* 1. tap-a-term definitions: first mention per page */
  var scopes = [].slice.call(main.querySelectorAll('.glance, .keys, details > .body'));
  function textNodes() {
    var out = [];
    scopes.forEach(function (sc) {
      var w = document.createTreeWalker(sc, NodeFilter.SHOW_TEXT, null);
      var n;
      while ((n = w.nextNode())) {
        if (!n.nodeValue.trim()) continue;
        if (n.parentElement.closest('a,button,figure,summary,h1,h2,h3,h4,.refs,.term,.tip,.toc')) continue;
        out.push(n);
      }
    });
    return out;
  }
  DOC_TERMS.forEach(function (t) {
    var re = new RegExp('\\b(' + t[0] + ')\\b', 'i');
    var ns = textNodes();
    for (var i = 0; i < ns.length; i++) {
      var m = re.exec(ns[i].nodeValue);
      if (!m) continue;
      var n = ns[i], rest = n.splitText(m.index), after = rest.splitText(m[0].length);
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'term'; btn.setAttribute('aria-expanded', 'false');
      btn.textContent = rest.nodeValue; rest.parentNode.replaceChild(btn, rest);
      (function (b, tt, dd) { on(b, 'click', function (e) { e.preventDefault(); show(b, tt, dd); }); })(btn, t[1], t[2]);
      break;
    }
  });
  /* 2. tap a diagram step */
  [].slice.call(main.querySelectorAll('.dg-flow')).forEach(function (ol) {
    var any = false;
    [].slice.call(ol.children).forEach(function (li) {
      var k = li.textContent.trim(), d = DOC_STEPS[k];
      if (!d) return; any = true;
      li.setAttribute('role', 'button'); li.setAttribute('tabindex', '0'); li.setAttribute('aria-expanded', 'false'); li.classList.add('tap');
      function go(e) { e.preventDefault(); show(li, k, d); }
      on(li, 'click', go);
      on(li, 'keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') go(e); });
    });
    if (any) { var h = document.createElement('p'); h.className = 'dg-hint'; h.textContent = 'Tap any step to see what it means.'; ol.parentNode.insertBefore(h, ol); }
  });
  /* 4. previous / next medicine */
  var h1 = r.querySelector('.dhero h1');
  if (h1) {
    var slug = h1.textContent.trim().toLowerCase(), i = DOC_SLUGS.indexOf(slug);
    if (i > -1) {
      var nm = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
      var pv = i > 0 ? DOC_SLUGS[i - 1] : null, nx = i < DOC_SLUGS.length - 1 ? DOC_SLUGS[i + 1] : null;
      var nav = document.createElement('nav'); nav.className = 'pager'; nav.setAttribute('aria-label', 'More medicines');
      nav.innerHTML = (pv ? '<a class="pg prev" href="' + pv + '.html"><small>Previous medicine</small><b>\u2190 ' + nm(pv) + '</b></a>' : '<a class="pg prev" href="../index.html#medicines"><small>All medicines</small><b>\u2190 Back to the library</b></a>') + (nx ? '<a class="pg next" href="' + nx + '.html"><small>Next medicine</small><b>' + nm(nx) + ' \u2192</b></a>' : '<a class="pg next" href="../index.html#medicines"><small>All medicines</small><b>Back to the library \u2192</b></a>');
      main.appendChild(nav);
    }
  }
}
docEnhance(document.body,function(t,e,f,o){t.addEventListener(e,f,o)},[]);})();
