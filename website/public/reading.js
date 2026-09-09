(() => {
  const sectionLinks = [...document.querySelectorAll('.toc a')];
  const links = [...document.querySelectorAll('.toc a,.mobile-contents a')];
  const headings = sectionLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))));
  const scrollRegions = [...document.querySelectorAll('.math.display,.table-wrapper')];
  let pending = false;
  const update = () => {
    pending = false;
    let current = 0;
    const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    headings.forEach((heading, index) => {
      if (!heading) return;
      const landingTop = scrollPadding + (parseFloat(getComputedStyle(heading).scrollMarginTop) || 0);
      if (heading.getBoundingClientRect().top <= landingTop + 2) current = index;
    });
    links.forEach(link => {
      if (link.hash === sectionLinks[current]?.hash) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const updateScrollRegions = () => scrollRegions.forEach(element => {
    if (element.scrollWidth > element.clientWidth + 1) {
      element.tabIndex = 0;
      element.setAttribute('role', 'region');
      element.setAttribute('aria-label', element.classList.contains('table-wrapper') ? 'Scrollable table' : 'Scrollable equation');
    } else {
      element.removeAttribute('tabindex');
      element.removeAttribute('role');
      element.removeAttribute('aria-label');
    }
  });
  window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', () => { update(); updateScrollRegions(); });
  document.querySelectorAll('.mobile-contents a').forEach(link => link.addEventListener('click', () => { link.closest('details').open = false; }));
  document.fonts.ready.then(updateScrollRegions);
  updateScrollRegions();
  update();
})();
