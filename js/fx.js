/* Extra animations for Kofix Loyalty Card. Adds visuals only; no content or data is changed. */
(()=>{
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s);

/* explainer: a token travels through labelled stations while a caption explains each step */
function explainer(before,title,steps){
 const el=document.createElement('div');el.className='card ex';
 el.innerHTML=`<h3>${title}</h3><div class="exs"><span class="exl"></span><span class="tok"></span>${steps.map((s,i)=>`<div class="st"><i>${i+1}</i>${s[0]}</div>`).join('')}</div><p class="exc" aria-live="off"></p>`;
 before.parentNode.insertBefore(el,before);
 const st=[...el.querySelectorAll('.st')],tok=$('.tok',el),ln=$('.exl',el),cap=$('.exc',el),box=$('.exs',el);let k=-1;
 const go=i=>{k=i;const base=st[0].offsetLeft+st[0].offsetWidth/2,x=st[i].offsetLeft+st[i].offsetWidth/2;
  st.forEach((s,j)=>{s.classList.toggle('on',j===i);s.classList.toggle('dn',j<i)});
  tok.style.left=x+'px';ln.style.width=(x-base)+'px';ln.style.left=base+'px';
  cap.style.animation='none';cap.offsetWidth;cap.style.animation='';cap.textContent=steps[i][1]};
 let t;const run=()=>{t=setInterval(()=>go((k+1)%steps.length),3200)};
 new IntersectionObserver(e=>{clearInterval(t);if(e[0].isIntersecting){go(Math.max(k,0));run()}}).observe(el);
 addEventListener('resize',()=>k>=0&&go(k));
}
explainer($('#jr'),'How a loyalty point is born',[['Customer books','A customer books a Kofix service, for example a portrait session.'],['Booking verified','Kofix confirms the booking really happened. Until then nothing is credited.'],['Points credited','After verification, demo points appear on the member card.'],['Reward explored','The member can browse rewards. In this demo no real reward or payment is issued.']]);
explainer($('#rf'),'How a referral travels',[['You share','You send an honest recommendation to a friend you know.'],['Friend visits','Your friend opens the Kofix website through your sample link.'],['Friend books','The friend requests a service or makes an eligible booking.'],['Pending, then approved','The referral stays pending until the booking is verified. Then demo points are credited.']]);
explainer($('#ac'),'How a lesson works',[['Read','Each module starts with a short, plain explanation.'],['See an example','A practical example shows the idea in real life.'],['Try it','A small exercise lets you apply it to your own idea.'],['Quiz and badge','Answer the quiz to earn a demo badge and skill points.']]);
explainer($('#mk'),'How a demo redemption works',[['Pick a reward','Browse rewards and check the conditions on each card.'],['Confirm the demo','A confirmation screen reminds you that this is a simulation.'],['Recorded','The demo points move into your transaction history.'],['Reversible','If a transaction is cancelled, the points can be returned and the reversal is shown.']]);

if(still)return;

/* floating bubbles */
const L=document.createElement('div');L.className='bubbles';L.setAttribute('aria-hidden','true');
for(let i=0;i<16;i++){const b=document.createElement('i'),s=12+Math.random()*58;b.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${16+Math.random()*20}s;animation-delay:${-Math.random()*30}s`;L.appendChild(b)}
document.body.prepend(L);

/* scroll progress bar */
const sp=document.createElement('div');sp.id='sp';document.body.appendChild(sp);
addEventListener('scroll',()=>{sp.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight||1)*100)+'%'},{passive:true});

/* 3D coin in the hero */
const h=$('.hero');if(h){const c=document.createElement('div');c.className='coin';c.setAttribute('aria-hidden','true');c.innerHTML='<div>K</div><small>demo points</small>';h.appendChild(c)}

/* bubble ripple and pop on every button click */
document.addEventListener('click',e=>{const b=e.target.closest('.b,.tabs button');if(!b||b.disabled)return;
 const r=b.getBoundingClientRect(),p=document.createElement('span');p.className='rp';p.style.left=(e.clientX-r.left)+'px';p.style.top=(e.clientY-r.top)+'px';b.appendChild(p);setTimeout(()=>p.remove(),700);
 for(let i=0;i<6;i++){const q=document.createElement('i');q.className='pop';const a=Math.random()*6.28,d=30+Math.random()*40;q.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d}px`;document.body.appendChild(q);setTimeout(()=>q.remove(),900)}});

/* 3D tilt on cards and tiles */
document.addEventListener('pointermove',e=>{const t=e.target.closest('.tile,.grid>.card');if(!t||e.pointerType==='touch')return;
 const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 t.style.transform=`perspective(700px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateZ(6px)`});
document.addEventListener('pointerout',e=>{const t=e.target.closest('.tile,.grid>.card');if(t)t.style.transform=''});
})();
