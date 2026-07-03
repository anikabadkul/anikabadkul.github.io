// Anika Badkul — shared site behavior
(function(){
  var nav=document.querySelector("nav"),btn=document.querySelector(".nav-toggle"),menu=document.getElementById("nav-menu");
  if(nav&&btn&&menu){
    function close(){nav.classList.remove("nav-open");btn.setAttribute("aria-expanded","false");}
    btn.addEventListener("click",function(){var o=nav.classList.toggle("nav-open");btn.setAttribute("aria-expanded",o?"true":"false");});
    menu.querySelectorAll("a").forEach(function(a){a.addEventListener("click",close);});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
  }
  var els=document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{rootMargin:"0px 0px -8% 0px"});
  els.forEach(function(e){io.observe(e);});
  setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add("in");});},120);
})();

/* Inline demo player (MealPlan) — click-to-load keeps the 12.8MB video out of the initial page */
document.querySelectorAll('[data-demo-src]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var el = document.getElementById(btn.getAttribute('data-demo-thumb'));
    if(!el || el.querySelector('video')) return;
    var src = btn.getAttribute('data-demo-src'), poster = btn.getAttribute('data-demo-poster');
    el.innerHTML = '<video controls autoplay playsinline poster="'+poster+'" style="width:100%;display:block"><source src="'+src+'" type="video/mp4">Your browser does not support inline video. <a href="'+src+'">Download the walkthrough</a> instead.</video>';
    el.querySelector('video').focus();
  });
});

/* ===== 2026 polish: scroll intelligence ===== */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reading progress (case studies only)
  var bar = document.querySelector('.read-progress');
  if(bar){
    var ticking = false;
    var update = function(){
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      ticking = false;
    };
    window.addEventListener('scroll', function(){ if(!ticking){ requestAnimationFrame(update); ticking = true; } }, {passive:true});
    update();
  }

  // Back to top
  var top = document.querySelector('.to-top');
  if(top){
    var t2 = false;
    var toggle = function(){ top.classList.toggle('show', window.scrollY > 900); t2 = false; };
    window.addEventListener('scroll', function(){ if(!t2){ requestAnimationFrame(toggle); t2 = true; } }, {passive:true});
    top.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
    toggle();
  }

  // Stat count-up on first view (falls back to static numbers without JS or with reduced motion)
  var stats = document.querySelectorAll('.stat .n');
  if(stats.length && !reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        io.unobserve(e.target);
        var m = e.target.textContent.trim().match(/^(\d+)(.*)$/);
        if(!m) return;
        var end = parseInt(m[1],10), suffix = m[2], t0 = null, dur = 900;
        var step = function(ts){
          if(!t0) t0 = ts;
          var p = Math.min(1,(ts-t0)/dur), eased = 1 - Math.pow(1-p,3);
          e.target.textContent = Math.round(end*eased) + suffix;
          if(p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },{threshold:.6});
    stats.forEach(function(s){ io.observe(s); });
  }
})();
