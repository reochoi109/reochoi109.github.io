(async () => {
  const page = window.location.pathname.split("/").pop() || "index.html";

  const contentMap = {
    "index.html": "/src/index-content.html",
    "word-counter.html": "/src/tools/word-counter-content.html",
    "case-converter.html": "/src/tools/case-converter-content.html",
    "remove-line-breaks.html": "/src/tools/remove-line-breaks-content.html",
  };

  try {
    // 공통 요소 + 콘텐츠 + 광고 fetch
    const [header, footer, content, leftAd, rightAd] = await Promise.all([
      fetch("/src/components/layout/header.html").then(res => res.text()),
      fetch("/src/components/layout/footer.html").then(res => res.text()),
      fetch(contentMap[page] || "/src/index-content.html").then(res => res.text()),
      fetch("/src/components/layout/side-ads-left.html").then(res => res.text()),
      fetch("/src/components/layout/side-ads-right.html").then(res => res.text()),
    ]);

    // null-safe DOM 삽입
    const headerEl = document.getElementById("header-include");
    if (headerEl) headerEl.innerHTML = header;

    const footerEl = document.getElementById("footer-include");
    if (footerEl) footerEl.innerHTML = footer;

    const pageContentEl = document.getElementById("page-content");
    if (pageContentEl) pageContentEl.innerHTML = content;

    const leftAdEl = document.getElementById("side-ads-left");
    if (leftAdEl) leftAdEl.innerHTML = leftAd;

    const rightAdEl = document.getElementById("side-ads-right");
    if (rightAdEl) rightAdEl.innerHTML = rightAd;

    // 페이지별 기능 연결
    if (page === "word-counter.html") {
      const textarea = document.getElementById("text-input");
      const charCount = document.getElementById("char-count");
      const wordCount = document.getElementById("word-count");
      const sentenceCount = document.getElementById("sentence-count");
      const paragraphCount = document.getElementById("paragraph-count");

      textarea?.addEventListener("input", () => {
        const text = textarea.value;
        charCount.textContent = text.length;
        wordCount.textContent = text.trim().split(/\s+/).filter(Boolean).length;
        sentenceCount.textContent = text.split(/[.!?]+/).filter(s => s.trim()).length;
        paragraphCount.textContent = text.split(/\n+/).filter(Boolean).length;
      });
    }

    // 다른 도구 페이지도 아래에 추가 가능

  } catch (err) {
    console.error("렌더링 오류:", err);
    const errorTarget = document.getElementById("page-content");
    if (errorTarget) {
      errorTarget.innerHTML = `<p class="text-red-500">⚠️ Failed to load content. Please try again later.</p>`;
    }
  }
})();
