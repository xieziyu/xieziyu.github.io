(function () {
  'use strict';

  var root = document.documentElement;

  /* language toggle: the initial value is resolved by the inline script in <head> */
  var toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh';
      root.setAttribute('data-lang', next);
      root.lang = next === 'zh' ? 'zh-Hans' : 'en';
      try { localStorage.setItem('lang', next); } catch (e) {}
    });
  }

  /* scroll reveal */
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  document.querySelectorAll('.hero .reveal').forEach(function (el, i) {
    el.style.setProperty('--i', i);
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { io.observe(el); });
})();
