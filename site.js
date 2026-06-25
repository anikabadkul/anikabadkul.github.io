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
