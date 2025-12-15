/**
 * 言語切り替え機能
 * 日本語と英語を切り替える
 */

(function() {
  'use strict';

  // 言語設定をローカルストレージから取得、デフォルトは日本語
  const getStoredLanguage = () => {
    return localStorage.getItem('preferredLanguage') || 'ja';
  };

  // 言語設定をローカルストレージに保存
  const setStoredLanguage = (lang) => {
    localStorage.setItem('preferredLanguage', lang);
  };

  // 現在の言語を取得
  const currentLanguage = getStoredLanguage();

  // 言語切り替え関数
  const switchLanguage = (lang) => {
    // .lang-block内の.lang-text要素を制御
    const jaTexts = document.querySelectorAll('.lang-block .lang-text[lang="ja"]');
    const enTexts = document.querySelectorAll('.lang-block .lang-text[lang="en"]');
    
    // CTAボタン内のspan要素を制御
    const jaButtons = document.querySelectorAll('.btn [lang="ja"]');
    const enButtons = document.querySelectorAll('.btn [lang="en"]');
    
    // フッターリンク内のspan要素を制御
    const jaFooterLinks = document.querySelectorAll('.footer-links a [lang="ja"]');
    const enFooterLinks = document.querySelectorAll('.footer-links a [lang="en"]');
    
    // 見出しやタグなど、常に両方表示する要素
    const jaHeadings = document.querySelectorAll('h1 [lang="ja"], h2 [lang="ja"], h3 [lang="ja"], .tag [lang="ja"], .footer-brand [lang="ja"]');
    const enHeadings = document.querySelectorAll('h1 [lang="en"], h2 [lang="en"], h3 [lang="en"], .tag [lang="en"], .footer-brand [lang="en"]');
    
    // ナビゲーションリンク内のテキスト（常に両方表示）
    const navLinks = document.querySelectorAll('.nav-links a');

    if (lang === 'ja') {
      // 日本語テキストを表示、英語テキストを非表示
      jaTexts.forEach(el => {
        el.style.display = '';
      });
      enTexts.forEach(el => {
        el.style.display = 'none';
      });
      // CTAボタン
      jaButtons.forEach(el => {
        el.style.display = '';
      });
      enButtons.forEach(el => {
        el.style.display = 'none';
      });
      // フッターリンク
      jaFooterLinks.forEach(el => {
        el.style.display = '';
      });
      enFooterLinks.forEach(el => {
        el.style.display = 'none';
      });
      // 見出しは両方表示
      jaHeadings.forEach(el => {
        el.style.display = '';
      });
      enHeadings.forEach(el => {
        el.style.display = '';
      });
      // HTMLのlang属性も更新
      document.documentElement.lang = 'ja';
    } else {
      // 英語テキストを表示、日本語テキストを非表示
      jaTexts.forEach(el => {
        el.style.display = 'none';
      });
      enTexts.forEach(el => {
        el.style.display = '';
      });
      // CTAボタン
      jaButtons.forEach(el => {
        el.style.display = 'none';
      });
      enButtons.forEach(el => {
        el.style.display = '';
      });
      // フッターリンク
      jaFooterLinks.forEach(el => {
        el.style.display = 'none';
      });
      enFooterLinks.forEach(el => {
        el.style.display = '';
      });
      // 見出しは両方表示
      jaHeadings.forEach(el => {
        el.style.display = '';
      });
      enHeadings.forEach(el => {
        el.style.display = '';
      });
      // HTMLのlang属性も更新
      document.documentElement.lang = 'en';
    }

    // 言語設定を保存
    setStoredLanguage(lang);

    // ボタンのアクティブ状態を更新
    updateButtonState(lang);
  };

  // ボタンのアクティブ状態を更新
  const updateButtonState = (lang) => {
    const jaButton = document.getElementById('lang-toggle-ja');
    const enButton = document.getElementById('lang-toggle-en');

    if (jaButton && enButton) {
      if (lang === 'ja') {
        jaButton.classList.add('active');
        enButton.classList.remove('active');
      } else {
        jaButton.classList.remove('active');
        enButton.classList.add('active');
      }
    }
  };

  // ページ読み込み時に言語設定を適用
  const initLanguage = () => {
    const lang = getStoredLanguage();
    switchLanguage(lang);
  };

  // イベントリスナーを設定
  const setupEventListeners = () => {
    const jaButton = document.getElementById('lang-toggle-ja');
    const enButton = document.getElementById('lang-toggle-en');

    if (jaButton) {
      jaButton.addEventListener('click', (e) => {
        e.preventDefault();
        switchLanguage('ja');
      });
    }

    if (enButton) {
      enButton.addEventListener('click', (e) => {
        e.preventDefault();
        switchLanguage('en');
      });
    }
  };

  // DOMContentLoaded時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLanguage();
      setupEventListeners();
    });
  } else {
    // すでに読み込み済みの場合
    initLanguage();
    setupEventListeners();
  }

})();

