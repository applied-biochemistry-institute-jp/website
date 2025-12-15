/**
 * ニュースデータをJSONファイルから読み込んで表示する
 */
async function loadNews() {
  try {
    const response = await fetch('assets/data/news.json');
    if (!response.ok) {
      throw new Error('Failed to load news data');
    }
    
    const newsData = await response.json();
    const newsContainer = document.getElementById('news-container');
    
    if (!newsContainer) {
      console.error('News container not found');
      return;
    }
    
    // ニュースを日付順（新しい順）にソート
    const sortedNews = newsData.sort((a, b) => {
      // 日付文字列を比較（YYYY.MM.DD形式）
      return b.date.localeCompare(a.date);
    });
    
    // ニュースカードを生成
    newsContainer.innerHTML = sortedNews.map(news => `
      <article class="card">
        <p class="tag">${news.date}</p>
        <h3>
          <span lang="ja">${news.title.ja}</span><br />
          <span lang="en">${news.title.en}</span>
        </h3>
        <div class="lang-block">
          <p class="lang-label">日本語</p>
          <p class="lang-text" lang="ja">
            ${news.content.ja}
          </p>
          <p class="lang-label">English</p>
          <p class="lang-text" lang="en">
            ${news.content.en}
          </p>
        </div>
      </article>
    `).join('');
    
    // 言語切り替え機能を適用（既存のlanguage-toggle.jsが動作するように）
    // ページ読み込み後に言語設定を復元
    if (typeof restoreLanguagePreference === 'function') {
      restoreLanguagePreference();
    }
    
  } catch (error) {
    console.error('Error loading news:', error);
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
      newsContainer.innerHTML = `
        <article class="card">
          <p class="lang-text" lang="ja">ニュースの読み込みに失敗しました。</p>
          <p class="lang-text" lang="en">Failed to load news.</p>
        </article>
      `;
    }
  }
}

// ページ読み込み時にニュースを読み込む
document.addEventListener('DOMContentLoaded', loadNews);

