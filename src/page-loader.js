// 광고만 로딩하는 간단한 스크립트
async function loadAds() {
  try {
    const [leftAd, rightAd, bottomAd] = await Promise.all([
      fetch("/src/components/layout/side-ads-left.html").then((res) =>
        res.text()
      ),
      fetch("/src/components/layout/side-ads-right.html").then((res) =>
        res.text()
      ),
      fetch("/src/components/layout/bottom-ad.html").then((res) => res.text()),
    ]);

    // 안전한 DOM 삽입
    const leftAdEl = document.getElementById("side-ads-left");
    if (leftAdEl) leftAdEl.innerHTML = leftAd;

    const rightAdEl = document.getElementById("side-ads-right");
    if (rightAdEl) rightAdEl.innerHTML = rightAd;

    const bottomAdEl = document.getElementById("bottom-ad-include");
    if (bottomAdEl) bottomAdEl.innerHTML = bottomAd;
  } catch (err) {
    console.error("광고 로딩 오류:", err);
  }
}

// 광고 로딩 실행
loadAds();
