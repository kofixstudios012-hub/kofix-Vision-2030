/* Background piano music for Kofix Loyalty Card.
   No controls on the page. Six calm piano-style pieces are synthesized in the
   browser (Web Audio), so no audio files or licences are needed.
   Browsers block sound until the visitor first taps, clicks or presses a key,
   so playback begins on that first interaction. A piece changes every 90 seconds. */
(()=>{
const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
const LEVEL=.1,SWITCH_MS=90000,FADE=3;
/* key = root MIDI note, sc = pentatonic scale, pr = chord roots (semitones from key, M/m quality), bpm = eighth-note pulse */
const TR=[
{key:60,sc:[0,2,4,7,9],pr:[[0,'M'],[9,'m'],[5,'M'],[7,'M']],bpm:52},
{key:62,sc:[0,2,4,7,9],pr:[[0,'M'],[11,'m'],[7,'M'],[9,'M']],bpm:50},
{key:57,sc:[0,3,5,7,10],pr:[[0,'m'],[8,'M'],[3,'M'],[10,'M']],bpm:48},
{key:65,sc:[0,2,4,7,9],pr:[[0,'M'],[9,'m'],[10,'M'],[7,'M']],bpm:54},
{key:67,sc:[0,2,4,7,9],pr:[[0,'M'],[9,'m'],[5,'M'],[2,'M']],bpm:50},
{key:64,sc:[0,3,5,7,10],pr:[[0,'m'],[8,'M'],[3,'M'],[10,'M']],bpm:46}];
const hz=m=>440*Math.pow(2,(m-69)/12);
let ctx,master,verb,cur=-1,step=0,nextT=0,sched,sw,started=false;
function setup(){
 ctx=new AC();master=ctx.createGain();master.gain.value=0;
 const comp=ctx.createDynamicsCompressor(),dry=ctx.createGain(),wet=ctx.createGain(),cv=ctx.createConvolver();
 const n=ctx.sampleRate*3,b=ctx.createBuffer(2,n,ctx.sampleRate);
 for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6)}
 cv.buffer=b;wet.gain.value=.38;dry.gain.value=.9;
 master.connect(dry);dry.connect(comp);master.connect(cv);cv.connect(wet);wet.connect(comp);comp.connect(ctx.destination);
}
function note(m,t,v,dur){
 const f=hz(m),g=ctx.createGain(),lp=ctx.createBiquadFilter();
 lp.type='lowpass';lp.frequency.value=1900+v*1500;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0008,t+dur);
 g.connect(lp);lp.connect(master);
 [[1,1],[2,.32],[3,.1],[4,.04]].forEach(([k,a],i)=>{
  const o=ctx.createOscillator(),og=ctx.createGain();o.type=i?'sine':'triangle';o.frequency.value=f*k;o.detune.value=(Math.random()-.5)*6;
  og.gain.value=a;o.connect(og);og.connect(g);o.start(t);o.stop(t+dur+.1)});
}
function tick(){
 const T=TR[cur],dt=60/T.bpm;
 while(nextT<ctx.currentTime+.8){
  const bar=Math.floor(step/8),s=step%8,[off,q]=T.pr[bar%4];let r=T.key+off;if(r>T.key+6)r-=12;
  const iv=q==='M'?4:3,tones=[0,iv,7,12,12+iv],pat=[0,2,3,4,3,2,4,2];
  const h=nextT+(Math.random()-.5)*.02;
  if(s===0)note(r-12,h,.2,6);
  note(r+tones[pat[s]],h,.13+Math.random()*.04,3.2);
  if((s===0||s===4)&&Math.random()<.55){const sc=T.sc,m=T.key+12+sc[Math.floor(Math.random()*sc.length)]+(Math.random()<.4?12:0);note(m,h+.05,.09,4)}
  nextT+=dt;step++}
}
function play(i){
 cur=i;step=0;nextT=ctx.currentTime+.3;clearInterval(sched);sched=setInterval(tick,250);
 const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(LEVEL,t+FADE);
}
function rotate(){
 const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(0,t+FADE);
 setTimeout(()=>play((cur+1)%TR.length),FADE*1000);
}
function begin(){
 if(started)return;started=true;
 ['pointerdown','keydown','touchend','click'].forEach(e=>removeEventListener(e,begin,true));
 setup();ctx.resume().then(()=>{play(Math.floor(Math.random()*TR.length));sw=setInterval(rotate,SWITCH_MS)});
}
['pointerdown','keydown','touchend','click'].forEach(e=>addEventListener(e,begin,true));
document.addEventListener('visibilitychange',()=>{if(!ctx)return;document.hidden?ctx.suspend():ctx.resume()});
})();
