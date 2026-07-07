// Reveal on scroll + nav shadow on scroll — compartilhado
// Robusto: revela o que já está na viewport no load, usa IntersectionObserver
// para o resto e tem um failsafe para nunca deixar conteúdo preso em opacity:0.
(function () {
  function revealAll(els) {
    (els || document.querySelectorAll('.reveal')).forEach(function (el) {
      el.classList.add('in');
    });
  }

  function init() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    // Sem suporte a IO (ou ambiente que não dispara): mostra tudo.
    if (!('IntersectionObserver' in window)) { revealAll(els); return; }

    var vh = window.innerHeight || document.documentElement.clientHeight;

    // 1) Revela imediatamente o que já está visível no carregamento (above the fold).
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });

    // 2) IO para o conteúdo que entra com o scroll.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el, i) {
      if (el.classList.contains('in')) return;
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });

    // 3) Failsafe: se algo ainda estiver escondido após 2.4s (IO não disparou),
    //    revela para nunca deixar a página em branco.
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        var vh2 = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh2) el.classList.add('in');
      });
    }, 2400);

    // Failsafe final absoluto: nada permanece invisível depois de 4s.
    // Hard-set inline (sem depender da transição, que pode ficar congelada
    // em abas em segundo plano / ambientes de captura).
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        el.classList.add('in');
      });
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 4000);

    // nav shadow
    var nav = document.querySelector('[data-nav]');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
