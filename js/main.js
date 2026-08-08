/* ===========================================================
 * 정헌주 교수 개인 홈페이지 스크립트
 * 1) 언어 전환(한국어 기본 / 영어 선택) — localStorage에 저장해 다음 방문에도 유지
 * 2) 미디어 보도 자동 업데이트 — 구글 뉴스 RSS를 rss2json.com 프록시로 가져와
 *    방문할 때마다 최신 기사를 보여줍니다(빌드/서버 없이 순수 클라이언트 JS로 동작).
 * =========================================================== */

(function initLanguage() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('lang-toggle');
  const saved = localStorage.getItem('site-lang');
  const initial = saved === 'en' ? 'en' : 'ko'; // 항상 한국어가 기본값

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'ko' ? 'EN' : '한국어';
    }
  }

  apply(initial);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-lang') === 'ko' ? 'en' : 'ko';
      apply(next);
      localStorage.setItem('site-lang', next);
    });
  }
})();

/* ---------- 미디어 보도 자동 업데이트 ---------- */
(function loadMediaFeed() {
  const listEl = document.getElementById('media-feed');
  const statusEl = document.getElementById('media-status');
  if (!listEl) return;

  // 검색어를 좁게 잡아야("정헌주 연세대") 동명이인 기사가 섞이지 않습니다.
  // 필요하면 이 검색어를 바꿔서 범위를 조절하세요.
  const SEARCH_QUERY = '정헌주 연세대';
  const googleNewsRss =
    'https://news.google.com/rss/search?q=' +
    encodeURIComponent(SEARCH_QUERY) +
    '&hl=ko&gl=KR&ceid=KR:ko';
  const proxyUrl =
    'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(googleNewsRss);
  const fallbackSearchLink =
    'https://news.google.com/search?q=' + encodeURIComponent(SEARCH_QUERY) + '&hl=ko&gl=KR';

  function showFallback(message) {
    if (statusEl) {
      statusEl.innerHTML =
        message +
        ' <a href="' + fallbackSearchLink + '" target="_blank" rel="noopener">구글 뉴스에서 직접 검색하기 →</a>';
    }
  }

  fetch(proxyUrl)
    .then((res) => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then((data) => {
      if (data.status !== 'ok' || !data.items || data.items.length === 0) {
        showFallback('아직 자동으로 찾은 기사가 없습니다.');
        return;
      }
      if (statusEl) statusEl.remove();

      // 구글 뉴스 RSS는 관련도순으로 섞여서 오기 때문에, 화면에는 항상 최신 기사가
      // 먼저 보이도록 pubDate 기준 내림차순으로 직접 정렬한다.
      const sortedItems = data.items.slice().sort((a, b) => {
        const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
        const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
        return dateB - dateA;
      });

      const MAX_ITEMS = 8;
      sortedItems.slice(0, MAX_ITEMS).forEach((item) => {
        const li = document.createElement('li');
        const date = item.pubDate ? item.pubDate.split(' ')[0] : '';
        // rss2json이 title에 " - 언론사명"을 붙여주는 경우가 많아 그대로 활용합니다.
        li.innerHTML =
          '<a class="m-title" href="' +
          item.link +
          '" target="_blank" rel="noopener">' +
          item.title +
          '</a><div class="m-meta">' +
          date +
          '</div>';
        listEl.appendChild(li);
      });
    })
    .catch(() => {
      showFallback('지금은 최신 기사를 자동으로 불러오지 못했습니다(인터넷 연결을 확인해 주세요).');
    });
})();
