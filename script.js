// Animaciones al hacer scroll + acordeón suave + menú móvil
(function(){
  // IntersectionObserver para animaciones de entrada
  const io = new IntersectionObserver((entries)=>{
    for (const e of entries){
      if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
    }
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-animate]').forEach(el=> io.observe(el));

  // Suavizado de altura del <details> para navegadores sin :has()
  const details = document.querySelectorAll('.accordion details.acc');
  details.forEach(d=>{
    d.addEventListener('toggle', ()=> {
      const content = d.querySelector('.acc__content');
      if(!CSS.supports('selector(:has(*))')){
        if(d.open){
          const h = content.scrollHeight;
          content.style.height = '0px';
          requestAnimationFrame(()=>{
            content.style.transition = 'height .28s ease';
            content.style.height = h + 'px';
          });
          content.addEventListener('transitionend', ()=>{
            content.style.height = 'auto';
            content.style.transition = '';
          }, { once:true });
        }else{
          const h = content.scrollHeight;
          content.style.height = h + 'px';
          requestAnimationFrame(()=>{
            content.style.transition = 'height .24s ease';
            content.style.height = '0px';
          });
          content.addEventListener('transitionend', ()=>{
            content.style.transition = '';
          }, { once:true });
        }
      }
    });
  });

  // Menú móvil simple
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.padding = '10px 12px 14px';
      nav.style.background = 'rgba(255,255,255,0.95)';
      nav.style.position = 'absolute';
      nav.style.top = '56px';
      nav.style.right = '3vw';
      nav.style.border = '1px solid rgba(27,36,48,.08)';
      nav.style.borderRadius = '12px';
      nav.style.boxShadow = '0 10px 30px rgba(20,30,60,.12)';
    });
  }

  // Respeto a usuarios con reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    document.querySelectorAll('[data-animate]').forEach(el=> el.classList.add('in-view'));
  }
})();
