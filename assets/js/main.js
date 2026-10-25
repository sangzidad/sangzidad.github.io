/* ==========================================================
 *  我们的恋爱计时 · 照片墙
 *  所有内容都在 assets/js/config.js 里配置
 * ========================================================== */
(function () {
  'use strict';

  var C = window.LOVE_CONFIG || {};

  /* ---------------- 工具函数 ---------------- */
  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function parseDate(str) {
    if (!str) return null;
    var m = String(str).trim().match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), 0);
  }

  function fmtDate(d) {
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function fmtClock(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
           ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function splitDuration(ms) {
    if (ms < 0) ms = 0;
    var s = Math.floor(ms / 1000);
    return {
      d: Math.floor(s / 86400),
      h: Math.floor(s / 3600) % 24,
      m: Math.floor(s / 60) % 60,
      s: s % 60
    };
  }

  /* ---------------- 静态文案 ---------------- */
  var nameA = C.nameA || '你';
  var nameB = C.nameB || '我';

  document.title = C.title || (nameA + ' ❤ ' + nameB);
  document.getElementById('name-a').textContent = nameA;
  document.getElementById('name-b').textContent = nameB;
  document.getElementById('subtitle').textContent = C.subtitle || '';
  document.getElementById('wall-title').textContent = C.photoWallTitle || '我们的照片墙';
  document.getElementById('footer-text').textContent = C.footerText || '';

  /* ---------------- 时间计算 ---------------- */
  var start = parseDate(C.startDate);

  var elDays    = document.getElementById('days-num');
  var elExact   = document.getElementById('exact-time');
  var elTotal   = document.getElementById('total-text');
  var elNextLb  = document.getElementById('next-label');
  var elNextDt  = document.getElementById('next-date');
  var cdItems   = document.querySelectorAll('#next-cd .cd-item b');
  var elPct     = document.getElementById('progress-pct');
  var elBar     = document.getElementById('progress-bar');
  var elIdx     = document.getElementById('anniv-index');
  var elRangeS  = document.getElementById('range-start');
  var elRangeE  = document.getElementById('range-end');
  var elHeart   = document.getElementById('heart-fill');
  var elSince   = document.getElementById('since-text');

  function anniversaryOf(base, year) {
    return new Date(year, base.getMonth(), base.getDate(),
                    base.getHours(), base.getMinutes(), 0);
  }

  /** 下一个「满周年」纪念日（一定是开始日之后满 N 年的那天） */
  function nextAnniversary(now, base) {
    var y = base.getFullYear() + 1;
    while (y < base.getFullYear() + 200) {
      var cand = anniversaryOf(base, y);
      if (cand.getTime() > now.getTime()) return { date: cand, index: y - base.getFullYear() };
      y++;
    }
    return null;
  }

  function setCd(d, h, m, s) {
    if (cdItems.length < 4) return;
    cdItems[0].textContent = d;
    cdItems[1].textContent = pad(h);
    cdItems[2].textContent = pad(m);
    cdItems[3].textContent = pad(s);
  }

  function setHeart(p) {
    var ratio = Math.max(0, Math.min(1, p));
    var hFull = 200;                       // viewBox 高度
    var h = hFull * ratio;
    elHeart.setAttribute('height', h.toFixed(2));
    elHeart.setAttribute('y', (hFull - h).toFixed(2));
  }

  function tick() {
    var now = new Date();

    if (!start) {
      elDays.textContent = '?';
      elExact.textContent = '请在 config.js 里填写 startDate';
      return;
    }

    elSince.textContent = '始于 ' + fmtDate(start) + (start.getHours() || start.getMinutes() ? ' ' + fmtClock(start).slice(11) : '');

    /* 还没到开始日：倒计时模式 */
    if (now.getTime() < start.getTime()) {
      var left = splitDuration(start - now);
      document.querySelector('.card-label').textContent = '距离我们在一起';
      elDays.textContent = left.d;
      elExact.textContent = left.h + ' 时 ' + left.m + ' 分 ' + left.s + ' 秒';
      elTotal.textContent = '那天是 ' + fmtDate(start);
      elNextLb.textContent = '距离开始';
      setCd(left.d, left.h, left.m, left.s);
      elNextDt.textContent = fmtDate(start);
      elPct.textContent = '0';
      elBar.style.width = '0%';
      elIdx.textContent = '1';
      elRangeS.textContent = fmtDate(start);
      elRangeE.textContent = fmtDate(start);
      setHeart(0);
      return;
    }

    /* 1) 在一起多久 */
    var passed = now - start;
    var t = splitDuration(passed);
    elDays.textContent = t.d;
    elExact.textContent = t.h + ' 时 ' + t.m + ' 分 ' + t.s + ' 秒';
    elTotal.textContent = '≈ ' + Math.floor(passed / 3600000).toLocaleString('en-US') +
                          ' 小时 · ' + Math.floor(passed / 60000).toLocaleString('en-US') + ' 分钟';

    /* 2) 下一个纪念日 */
    var nxt = nextAnniversary(now, start);
    if (nxt) {
      var last = anniversaryOf(start, nxt.date.getFullYear() - 1);
      if (last.getTime() < start.getTime()) last = start;

      var leftMs = nxt.date - now;
      var l = splitDuration(leftMs);
      elNextLb.textContent = '距离第 ' + nxt.index + ' 个纪念日';
      setCd(l.d, l.h, l.m, l.s);
      elNextDt.textContent = fmtDate(nxt.date);

      var span = nxt.date - last;
      var p = span > 0 ? (now - last) / span : 0;
      elPct.textContent = (p * 100).toFixed(2);
      elBar.style.width = (p * 100).toFixed(2) + '%';
      elIdx.textContent = nxt.index;
      elRangeS.textContent = fmtDate(last);
      elRangeE.textContent = fmtDate(nxt.date);
      setHeart(p);
    }
  }

  tick();
  setInterval(tick, 1000);

  /* ---------------- 照片墙 ---------------- */
  var photos = (C.photos || []).filter(function (p) { return p && p.src; });
  var grid = document.getElementById('masonry');
  var emptyTip = document.getElementById('wall-empty');

  function escapeXml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
    });
  }

  function placeholderSVG(text) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 600 760">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#3a1240"/><stop offset="100%" stop-color="#5d1c4d"/>' +
      '</linearGradient></defs>' +
      '<rect width="600" height="760" fill="url(#g)"/>' +
      '<text x="300" y="360" font-size="120" text-anchor="middle" fill="#ff6fae" font-family="sans-serif">\u2665</text>' +
      '<text x="300" y="430" font-size="26" text-anchor="middle" fill="#fbeaf3" font-family="sans-serif">' + escapeXml(text || '待填充') + '</text>' +
      '<text x="300" y="472" font-size="19" text-anchor="middle" fill="#fbeaf3" fill-opacity=".5" font-family="sans-serif">把你们的照片放到这里</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  if (!photos.length) {
    emptyTip.hidden = false;
  } else {
    photos.forEach(function (p, i) {
      var fig = document.createElement('figure');
      fig.className = 'reveal';
      fig.dataset.index = i;

      var img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = p.caption || ('照片 ' + (i + 1));
      img.src = p.src;
      img.addEventListener('error', function () {
        img.src = placeholderSVG(p.caption || ('第 ' + (i + 1) + ' 张'));
      });

      fig.appendChild(img);

      if (p.caption || p.date) {
        var cap = document.createElement('figcaption');
        cap.textContent = p.caption || '';
        if (p.date) {
          var d = document.createElement('span');
          d.className = 'ph-date';
          d.textContent = p.date;
          cap.appendChild(d);
        }
        fig.appendChild(cap);
      }

      fig.addEventListener('click', function () { openBox(i); });
      grid.appendChild(fig);
    });
  }

  /* ---------------- 灯箱 ---------------- */
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lb-img');
  var boxText = document.getElementById('lb-text');
  var boxCount = document.getElementById('lb-count');
  var current = 0;

  function showPhoto(i) {
    if (!photos.length) return;
    current = (i + photos.length) % photos.length;
    var p = photos[current];
    boxImg.src = p.src;
    boxImg.alt = p.caption || '';
    boxImg.onerror = function () { boxImg.src = placeholderSVG(p.caption || ''); };
    boxText.textContent = (p.caption || '') + (p.date ? '　·　' + p.date : '');
    boxCount.textContent = (current + 1) + ' / ' + photos.length;
  }

  function openBox(i) {
    showPhoto(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBox() {
    box.hidden = true;
    document.body.style.overflow = '';
  }

  document.getElementById('lb-close').addEventListener('click', closeBox);
  document.getElementById('lb-prev').addEventListener('click', function (e) {
    e.stopPropagation(); showPhoto(current - 1);
  });
  document.getElementById('lb-next').addEventListener('click', function (e) {
    e.stopPropagation(); showPhoto(current + 1);
  });
  box.addEventListener('click', function (e) {
    if (e.target === box) closeBox();
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') closeBox();
    else if (e.key === 'ArrowLeft') showPhoto(current - 1);
    else if (e.key === 'ArrowRight') showPhoto(current + 1);
  });

  /* 手机滑动切换 */
  var tx = 0;
  box.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 45) showPhoto(current + (dx < 0 ? 1 : -1));
  });

  /* ---------------- 入场动画 ---------------- */
  var io = null;
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- 背景飘落爱心 ---------------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (C.fallingHearts !== false && !reduce) {
    var cv = document.getElementById('bg-canvas');
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var COLORS = ['#ff6fae', '#ff2d75', '#ffd0e4', '#ffb3d1'];

    function resize() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : -30,
        size: 10 + Math.random() * 18,
        vy: .25 + Math.random() * .55,
        drift: (Math.random() - .5) * .5,
        rot: (Math.random() - .5) * .8,
        vr: (Math.random() - .5) * .012,
        a: .12 + Math.random() * .3,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      };
    }

    function heart(ctx2) {
      ctx2.beginPath();
      ctx2.moveTo(0, 7);
      ctx2.bezierCurveTo(-8, 1, -10, -4, -6.5, -8);
      ctx2.bezierCurveTo(-4, -10.5, -1, -9.5, 0, -6.5);
      ctx2.bezierCurveTo(1, -9.5, 4, -10.5, 6.5, -8);
      ctx2.bezierCurveTo(10, -4, 8, 1, 0, 7);
      ctx2.closePath();
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y += p.vy;
        p.x += Math.sin(p.y / 60) * p.drift + p.drift * .3;
        p.rot += p.vr;
        if (p.y > H + 40) parts[i] = spawn(false);
        if (p.x < -40) p.x = W + 30;
        if (p.x > W + 40) p.x = -30;

        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.size / 20, p.size / 20);
        ctx.fillStyle = p.c;
        heart(ctx);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', function () {
      resize();
      parts = [];
      for (var i = 0; i < 22; i++) parts.push(spawn(true));
    });
    for (var i = 0; i < 22; i++) parts.push(spawn(true));
    requestAnimationFrame(loop);
  } else {
    var cvs = document.getElementById('bg-canvas');
    if (cvs) cvs.style.display = 'none';
  }

  /* ---------------- 背景音乐 ---------------- */
  if (C.musicUrl) {
    var btn = document.getElementById('music-btn');
    var audio = document.getElementById('music-audio');
    audio.src = C.musicUrl;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(function () {
          btn.classList.add('playing');
          btn.textContent = '♫';
        }).catch(function () {});
      } else {
        audio.pause();
        btn.classList.remove('playing');
        btn.textContent = '♪';
      }
    });
  }
})();
