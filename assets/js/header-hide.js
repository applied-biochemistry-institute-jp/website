/**
 * スマホでスクロール時にヘッダーを非表示にする
 */
(function() {
  let lastScrollTop = 0;
  let isScrolling = false;
  const header = document.querySelector('header');
  const threshold = 50; // トップから50px以内では常に表示
  const mobileBreakpoint = 640;

  if (!header) return;

  function isMobile() {
    return window.innerWidth <= mobileBreakpoint;
  }

  function handleScroll() {
    if (!isMobile()) {
      // PCでは機能を無効化
      header.classList.remove('header-hidden');
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // トップ付近では常に表示
    if (scrollTop < threshold) {
      header.classList.remove('header-hidden');
      lastScrollTop = scrollTop;
      return;
    }

    // スクロール方向を判定
    if (scrollTop > lastScrollTop) {
      // 下にスクロール: ヘッダーを非表示
      header.classList.add('header-hidden');
    } else {
      // 上にスクロール: ヘッダーを表示
      header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop;
  }

  // スクロールイベントをスロットル（パフォーマンス向上）
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // リサイズ時にリセット
  window.addEventListener('resize', function() {
    if (!isMobile()) {
      header.classList.remove('header-hidden');
    }
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });
})();

