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
