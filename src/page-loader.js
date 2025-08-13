import { setupCaseConverter } from "./functions/caseConverter.js";
import { setupJsonFormatter } from "./functions/jsonFormatter.js";
import { setupRemoveLineBreaks } from "./functions/removeLineBreaks.js";
import { setupWordCounter } from "./functions/wordCounter.js";

(async () => {
  const page = window.location.pathname.split("/").pop() || "index.html";

  const contentMap = {
    "index.html": "/src/index-content.html",
    "word-counter.html": "/src/tools/word-counter-content.html",
    "case-converter.html": "/src/tools/case-converter-content.html",
    "remove-line-breaks.html": "/src/tools/remove-line-breaks-content.html",
    "json-formatter.html": "/src/tools/json-formatter-content.html",
  };

  try {
    const [header, footer, content, leftAd, rightAd, bottomAd] =
      await Promise.all([
        fetch("/src/components/layout/header.html").then((res) => res.text()),
        fetch("/src/components/layout/footer.html").then((res) => res.text()),
        fetch(contentMap[page] || "/src/index-content.html").then((res) =>
          res.text()
        ),
        fetch("/src/components/layout/side-ads-left.html").then((res) =>
          res.text()
        ),
        fetch("/src/components/layout/side-ads-right.html").then((res) =>
          res.text()
        ),
        fetch("/src/components/layout/bottom-ad.html").then((res) =>
          res.text()
        ),
      ]);

    // 안전한 DOM 삽입
    injectHTML("header-include", header);
    injectHTML("footer-include", footer);
    injectHTML("page-content", content);
    injectHTML("side-ads-left", leftAd);
    injectHTML("side-ads-right", rightAd);
    injectHTML("bottom-ad-include", bottomAd);

    // 다음 frame에서 기능 연결
    requestAnimationFrame(() => {
      if (page === "word-counter.html") {
        setupWordCounter();
      }

      if (page === "json-formatter.html") {
        setupJsonFormatter();
      }

      if (page === "case-converter.html") {
        setupCaseConverter();
      }

      if (page === "remove-line-breaks.html") {
        setupRemoveLineBreaks();
      }
    });
  } catch (err) {
    console.error("렌더링 오류:", err);
    const errorTarget = document.getElementById("page-content");
    if (errorTarget) {
      errorTarget.innerHTML = `<p class="text-red-500">⚠️ Failed to load content. Please try again later.</p>`;
    }
  }
})();

// helper 함수: 안전하게 HTML 삽입
function injectHTML(id, html) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = html;
  }
}
