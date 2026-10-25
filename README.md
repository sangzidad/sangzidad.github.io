<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>我们的恋爱计时</title>
<style>
*{box-sizing:border-box}
body{margin:0;color:#fbeaf3;font:15px/1.7 "PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif;
background:radial-gradient(1200px 700px at 12% -10%,rgba(255,45,117,.28),transparent 60%),
radial-gradient(1000px 600px at 92% 8%,rgba(151,71,255,.26),transparent 60%),
linear-gradient(165deg,#120716,#1d0a22 45%,#2c1030);background-attachment:fixed;min-height:100%;overflow-x:hidden}
#cv{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.page{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:56px 20px 80px}
.hero{text-align:center;padding:18px 0 34px}
.names{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;font-size:clamp(30px,6.4vw,54px);font-weight:700;letter-spacing:2px}
.names span.n{background:linear-gradient(100deg,#fff,#ffd0e4 40%,#ffd18a);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.names span.h{font-size:.8em;color:#ff2d75;filter:drop-shadow(0 0 14px rgba(255,45,117,.75));animation:beat 1.4s ease-in-out infinite}
@keyframes beat{0%,100%{transform:scale(1)}18%{transform:scale(1.24)}36%{transform:scale(1)}54%{transform:scale(1.16)}}
.subtitle{margin:18px auto 0;max-width:620px;font-size:clamp(14px,2.6vw,17px);color:rgba(251,234,243,.62)}
.since{margin-top:14px;font-size:13px;letter-spacing:1px;color:rgba(255,209,138,.85)}
.counters{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.card,.prog{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.13);border-radius:20px;padding:26px 22px;
backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 18px 44px rgba(0,0,0,.32)}
.card{text-align:center}
.card-label{font-size:13px;letter-spacing:3px;color:rgba(251,234,243,.62)}
.days-num{font-size:clamp(46px,11vw,76px);font-weight:800;line-height:1;font-variant-numeric:tabular-nums;
background:linear-gradient(180deg,#fff,#ff6fae 60%,#ff2d75);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.days-unit{font-size:18px;color:rgba(251,234,243,.62)}
.exact{font-size:14px;color:#ffd0e4;font-variant-numeric:tabular-nums;letter-spacing:1px}
.tiny{margin-top:10px;font-size:12px;color:rgba(251,234,243,.42);font-variant-numeric:tabular-nums}
.cd{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px}
.cd div{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px 4px}
.cd b{display:block;font-size:clamp(22px,5vw,30px);font-weight:800;font-variant-numeric:tabular-nums;color:#fff}
.cd i{display:block;margin-top:3px;font-size:11px;font-style:normal;color:rgba(251,234,243,.62)}
.prog{margin-top:18px;display:flex;align-items:center;gap:32px;flex-wrap:wrap;justify-content:center}
.heart{width:190px;flex:0 0 auto}
.heart svg{width:100%;height:auto;display:block;filter:drop-shadow(0 10px 26px rgba(255,45,117,.4))}
.pinfo{flex:1 1 260px;min-width:240px}
.pct{font-size:44px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;color:#fff}
.pct small{font-size:18px;color:rgba(251,234,243,.62)}
.pdesc{margin-top:10px;font-size:14px;color:#ffd0e4;letter-spacing:1px}
.pdesc b{color:#ffd18a;font-size:18px}
.bar{margin-top:16px;height:10px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden}
.bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#ff2d75,#ff6fae,#ffd18a);box-shadow:0 0 16px rgba(255,111,174,.7);transition:width .8s}
.prange{margin-top:8px;display:flex;justify-content:space-between;font-size:12px;color:rgba(251,234,243,.45)}
.wall{margin-top:58px}
.wall h2{text-align:center;font-size:clamp(22px,4.6vw,30px);letter-spacing:4px;margin:0 0 26px;
background:linear-gradient(100deg,#fff,#ffd0e4);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.grid{column-count:3;column-gap:16px}
.grid figure{margin:0 0 16px;break-inside:avoid;position:relative;border-radius:16px;overflow:hidden;cursor:zoom-in;
background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);box-shadow:0 12px 30px rgba(0,0,0,.3);
opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s,box-shadow .35s}
.grid figure.in{opacity:1;transform:none}
.grid figure:hover{box-shadow:0 20px 42px rgba(255,45,117,.3)}
.grid img{display:block;width:100%;height:auto;transition:transform .55s}
.grid figure:hover img{transform:scale(1.07)}
.grid figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 14px 12px;font-size:13px;color:#fff;
background:linear-gradient(transparent,rgba(18,7,22,.88));transform:translateY(12px);opacity:0;transition:.35s}
.grid figure:hover figcaption{transform:none;opacity:1}
.grid figcaption s{display:block;font-size:11px;color:#ffd18a;text-decoration:none;opacity:.9}
.footer{margin-top:66px;text-align:center;font-size:13px;letter-spacing:2px;color:rgba(251,234,243,.38)}
.lb{position:fixed;inset:0;z-index:99;background:rgba(10,4,14,.93);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center}
.lb[hidden]{display:none}
.lb-stage{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:92vw}
.lb-stage img{max-width:92vw;max-height:76vh;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.6)}
.lb-cap{display:flex;gap:14px;font-size:14px}
.lb-cap em{font-style:normal;font-size:12px;color:rgba(251,234,243,.62)}
.lb button{position:absolute;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);color:#fff;border-radius:50%;cursor:pointer}
.lb button:hover{background:rgba(255,111,174,.35)}
.lb .x{top:20px;right:20px;width:42px;height:42px;font-size:17px}
.lb .p,.lb .n{top:50%;transform:translateY(-50%);width:48px;height:48px;font-size:30px;line-height:1}
.lb .p{left:22px}.lb .n{right:22px}
@media(max-width:860px){.grid{column-count:2}}
@media(max-width:640px){.page{padding:38px 15px 60px}.counters{grid-template-columns:1fr}.grid{column-count:1}
.heart{width:150px}.grid figcaption{transform:none;opacity:1}.lb .p{left:8px}.lb .n{right:8px}}
</style>
</head>
<body>
<canvas id="cv"></canvas>
<div class="page">

  <header class="hero">
    <div class="names"><span class="n" id="na">你</span><span class="h">❤</span><span class="n" id="nb">我</span></div>
    <p class="subtitle" id="sub"></p>
    <div class="since" id="sincet"></div>
  </header>

  <section class="counters">
    <div class="card">
      <div class="card-label" id="l1">我们已经在一起</div>
      <div><span class="days-num" id="dd">0</span> <span class="days-unit">天</span></div>
      <div class="exact" id="ee">0 时 0 分 0 秒</div>
      <div class="tiny" id="tt"></div>
    </div>
    <div class="card">
      <div class="card-label" id="l2">下一个纪念日</div>
      <div class="cd" id="cd"><div><b>0</b><i>天</i></div><div><b>00</b><i>时</i></div><div><b>00</b><i>分</i></div><div><b>00</b><i>秒</i></div></div>
      <div class="tiny" id="nd"></div>
    </div>
  </section>

  <section class="prog">
    <div class="heart">
      <svg viewBox="0 0 200 200" aria-label="纪念日进度">
        <defs>
          <linearGradient id="hg" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#ff2d75"/><stop offset="55%" stop-color="#ff6fae"/><stop offset="100%" stop-color="#ffd0e4"/>
          </linearGradient>
          <clipPath id="hc"><path d="M100,176 C60,141 15,106 15,66 C15,36 38,15 65,15 C82,15 95,25 100,38 C105,25 118,15 135,15 C162,15 185,36 185,66 C185,106 140,141 100,176 Z"/></clipPath>
        </defs>
        <path fill="rgba(255,255,255,.07)" d="M100,176 C60,141 15,106 15,66 C15,36 38,15 65,15 C82,15 95,25 100,38 C105,25 118,15 135,15 C162,15 185,36 185,66 C185,106 140,141 100,176 Z"/>
        <g clip-path="url(#hc)"><rect id="hf" x="0" y="200" width="200" height="0" fill="url(#hg)"/></g>
        <path fill="none" stroke="rgba(255,208,228,.55)" stroke-width="3" d="M100,176 C60,141 15,106 15,66 C15,36 38,15 65,15 C82,15 95,25 100,38 C105,25 118,15 135,15 C162,15 185,36 185,66 C185,106 140,141 100,176 Z"/>
      </svg>
    </div>
    <div class="pinfo">
      <div class="pct"><span id="pc">0</span><small>%</small></div>
      <div class="pdesc">距离第 <b id="ai">1</b> 个纪念日</div>
      <div class="bar"><i id="pb"></i></div>
      <div class="prange"><span id="rs">—</span><span id="re">—</span></div>
    </div>
  </section>

  <section class="wall">
    <h2 id="wt">我们的回忆</h2>
    <div class="grid" id="grid"></div>
  </section>

  <footer class="footer" id="ft"></footer>
</div>

<div class="lb" id="lb" hidden>
  <button class="x" id="lbc">✕</button><button class="p" id="lbp">‹</button><button class="n" id="lbn">›</button>
  <div class="lb-stage"><img id="li" src="" alt=""><div class="lb-cap"><span id="lt"></span><em id="lq"></em></div></div>
</div>

<script>
/* ========== 配置：只改这里 ========== */
var CFG = {
  nameA: '桑梓',                 // 左边名字
  nameB: '张晴晴',                 // 右边名字
  startDate: '2024-09-07',       // 在一起那天，支持 '2024-05-20 14:30'
  subtitle: '遇见你，是我所有好运的开始',
  wallTitle: '我们的照片墙',
  footer: '愿年年有今日，岁岁有今朝',
  fallingHearts: true,           // 背景飘落爱心
  photos: [                      // src 留空则显示占位图；可写本地路径或远程链接，可混用
    {src:'images/1.JPG', caption:'初见那天，风很温柔', date:'2024-08-21'},
    {src:'images/2.JPG', caption:'第一次一起吃的火锅', date:'2024-09-16'},
    {src:'images/3.JPG', caption:'你笑起来的样子',   date:'2025-11-05'},
    {src:'images/4.JPG', caption:'一起逛过的城',     date:'2026-03-08'},
    {src:'images/5.JPG', caption:'夏天的风和你',     date:'2026-03-22'},
    {src:'images/6.JPG', caption:'想把时间停在这里', date:'2026-07-06'},
    {src:'images/7.JPG', caption:'一起吃的第 100 顿', date:'2026-08-19'},
    {src:'images/8.JPG', caption:'下一年也要一起',   date:'2026-09-24'}
  ]
/* 加照片示例：
   {src:'images/1.jpg', caption:'我们的第一张合照', date:'2024-05-20'}     本地
   {src:'https://你的图床/a.jpg', caption:'海边', date:'2024-06-01'}        远程
===================================== */

var $=function(id){return document.getElementById(id)};
function pad(n){return n<10?'0'+n:''+n}
function pd(s){var m=String(s||'').trim().match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
  return m?new Date(+m[1],+m[2]-1,+m[3],+(m[4]||0),+(m[5]||0)):null}
function fd(d){return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'}
function sp(ms){ms=ms<0?0:ms;var s=Math.floor(ms/1000);return{d:Math.floor(s/86400),h:Math.floor(s/3600)%24,m:Math.floor(s/60)%60,s:s%60}}
function ann(b,y){return new Date(y,b.getMonth(),b.getDate(),b.getHours(),b.getMinutes())}

$('na').textContent=CFG.nameA; $('nb').textContent=CFG.nameB;
$('sub').textContent=CFG.subtitle; $('wt').textContent=CFG.wallTitle; $('ft').textContent=CFG.footer;
document.title=CFG.nameA+' ❤ '+CFG.nameB+' · 恋爱计时';

var st=pd(CFG.startDate), cdb=$('cd').getElementsByTagName('b'), hf=$('hf');

/* 占位图：src 为空或加载失败时使用 */
function ph(i,t){
  var h=(i*47)%360, s='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760">'+
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="hsl('+h+',55%,22%)"/>'+
    '<stop offset="100%" stop-color="hsl('+((h+40)%360)+',50%,30%)"/></linearGradient></defs>'+
    '<rect width="600" height="760" fill="url(#g)"/>'+
    '<text x="300" y="370" font-size="130" text-anchor="middle" fill="#ff6fae" font-family="sans-serif">\u2665</text>'+
    '<text x="300" y="440" font-size="24" text-anchor="middle" fill="#fbeaf3" font-family="sans-serif">'+String(t||('第 '+(i+1)+' 张')).replace(/[<>&]/g,'')+'</text>'+
    '<text x="300" y="480" font-size="18" text-anchor="middle" fill="#fbeaf3" fill-opacity=".5" font-family="sans-serif">把你们的照片放到这里</text></svg>';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
}

function tick(){
  var now=new Date(); if(!st)return;
  $('sincet').textContent='始于 '+fd(st);
  if(now<st){ // 还没到开始日
    var l=sp(st-now); $('l1').textContent='距离我们在一起';
    $('dd').textContent=l.d; $('ee').textContent=l.h+' 时 '+l.m+' 分 '+l.s+' 秒';
    $('tt').textContent='那天是 '+fd(st); $('l2').textContent='距离开始';
    cdb[0].textContent=l.d;cdb[1].textContent=pad(l.h);cdb[2].textContent=pad(l.m);cdb[3].textContent=pad(l.s);
    $('nd').textContent=fd(st); $('pc').textContent='0'; $('pb').style.width='0%';
    $('rs').textContent=$('re').textContent=fd(st); hf.setAttribute('height',0); hf.setAttribute('y',200);
    return;
  }
  var pass=now-st, t=sp(pass);
  $('dd').textContent=t.d; $('ee').textContent=t.h+' 时 '+t.m+' 分 '+t.s+' 秒';
  $('tt').textContent='≈ '+Math.floor(pass/3600000).toLocaleString('en-US')+' 小时 · '+Math.floor(pass/60000).toLocaleString('en-US')+' 分钟';
  var y=st.getFullYear()+1, nx=null;
  while(y<st.getFullYear()+200){var c=ann(st,y); if(c>now){nx=c;break} y++}
  if(!nx)return;
  var last=ann(st,nx.getFullYear()-1); if(last<st)last=st;
  var l=sp(nx-now), p=(now-last)/(nx-last);
  $('l2').textContent='距离第 '+(nx.getFullYear()-st.getFullYear())+' 个纪念日';
  cdb[0].textContent=l.d;cdb[1].textContent=pad(l.h);cdb[2].textContent=pad(l.m);cdb[3].textContent=pad(l.s);
  $('nd').textContent=fd(nx); $('pc').textContent=(p*100).toFixed(2); $('pb').style.width=(p*100).toFixed(2)+'%';
  $('ai').textContent=nx.getFullYear()-st.getFullYear();
  $('rs').textContent=fd(last); $('re').textContent=fd(nx);
  var H=200*p; hf.setAttribute('height',H.toFixed(2)); hf.setAttribute('y',(200-H).toFixed(2));
}
tick(); setInterval(tick,1000);

/* 照片墙 */
var ps=CFG.photos||[], cur=0, grid=$('grid');
ps.forEach(function(p,i){
  var f=document.createElement('figure'), img=document.createElement('img');
  img.loading='lazy'; img.alt=p.caption||('照片 '+(i+1)); img.src=p.src||ph(i,p.caption);
  img.onerror=function(){img.onerror=null; img.src=ph(i,p.caption)};
  f.appendChild(img);
  if(p.caption||p.date){
    var c=document.createElement('figcaption'); c.textContent=p.caption||'';
    if(p.date){var d=document.createElement('s'); d.textContent=p.date; c.appendChild(d)}
    f.appendChild(c);
  }
  f.onclick=function(){openBox(i)}; grid.appendChild(f);
});
if(window.IntersectionObserver){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  [].forEach.call(document.querySelectorAll('.grid figure'),function(f){io.observe(f)});
}else [].forEach.call(document.querySelectorAll('.grid figure'),function(f){f.classList.add('in')});

/* 灯箱 */
function show(i){ if(!ps.length)return; cur=(i+ps.length)%ps.length; var p=ps[cur];
  var im=$('li'); im.onerror=function(){im.onerror=null; im.src=ph(cur,p.caption)}; im.src=p.src||ph(cur,p.caption);
  $('lt').textContent=(p.caption||'')+(p.date?'　·　'+p.date:''); $('lq').textContent=(cur+1)+' / '+ps.length; }
function openBox(i){ show(i); $('lb').hidden=false; document.body.style.overflow='hidden' }
function closeBox(){ $('lb').hidden=true; document.body.style.overflow='' }
$('lbc').onclick=closeBox; $('lbp').onclick=function(e){e.stopPropagation();show(cur-1)};
$('lbn').onclick=function(e){e.stopPropagation();show(cur+1)};
$('lb').onclick=function(e){if(e.target===$('lb'))closeBox()};
document.addEventListener('keydown',function(e){ if($('lb').hidden)return;
  if(e.key==='Escape')closeBox(); else if(e.key==='ArrowLeft')show(cur-1); else if(e.key==='ArrowRight')show(cur+1); });
var tx=0; $('lb').addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
$('lb').addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>45)show(cur+(dx<0?1:-1))});

/* 背景飘落爱心 */
if(CFG.fallingHearts!==false && !(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){
  var cv=$('cv'), ctx=cv.getContext('2d'), W,H, dpr=Math.min(devicePixelRatio||1,2), parts=[];
  var CO=['#ff6fae','#ff2d75','#ffd0e4','#ffb3d1'];
  function rs(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function mk(i){return{x:Math.random()*W,y:i?Math.random()*H:-30,s:10+Math.random()*18,v:.25+Math.random()*.55,
    d:(Math.random()-.5)*.5,r:(Math.random()-.5)*.8,vr:(Math.random()-.5)*.012,a:.12+Math.random()*.3,c:CO[Math.random()*CO.length|0]}}
  function hp(){ctx.beginPath();ctx.moveTo(0,7);ctx.bezierCurveTo(-8,1,-10,-4,-6.5,-8);ctx.bezierCurveTo(-4,-10.5,-1,-9.5,0,-6.5);
    ctx.bezierCurveTo(1,-9.5,4,-10.5,6.5,-8);ctx.bezierCurveTo(10,-4,8,1,0,7);ctx.closePath()}
  function loop(){ctx.clearRect(0,0,W,H);
    for(var i=0;i<parts.length;i++){var p=parts[i]; p.y+=p.v; p.x+=Math.sin(p.y/60)*p.d+p.d*.3; p.r+=p.vr;
      if(p.y>H+40)parts[i]=mk(0); if(p.x<-40)p.x=W+30; if(p.x>W+40)p.x=-30;
      ctx.save();ctx.globalAlpha=p.a;ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.scale(p.s/20,p.s/20);ctx.fillStyle=p.c;hp();ctx.fill();ctx.restore()}
    requestAnimationFrame(loop)}
  rs(); addEventListener('resize',function(){rs();parts=[];for(var i=0;i<22;i++)parts.push(mk(1))});
  for(var i=0;i<22;i++)parts.push(mk(1)); requestAnimationFrame(loop);
}else $('cv').style.display='none';
</script>
</body>
</html>
