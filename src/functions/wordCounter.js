import { debounce } from "../utils/debounce.js";

export function setupWordCounter() {
  const textarea = document.getElementById("text-input");
  const charCount = document.getElementById("char-count");
  const wordCount = document.getElementById("word-count");
  const sentenceCount = document.getElementById("sentence-count");
  const paragraphCount = document.getElementById("paragraph-count");
  const topWordsEl = document.getElementById("top-words");

  if (
    !textarea ||
    !charCount ||
    !wordCount ||
    !sentenceCount ||
    !paragraphCount
  ) {
    console.warn("Word Counter: 필수 요소가 누락되었습니다.");
    return;
  }

  const stopWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "if",
    "then",
    "else",
    "in",
    "on",
    "at",
    "to",
    "from",
    "by",
    "with",
    "without",
    "of",
    "for",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "do",
    "does",
    "did",
    "as",
    "that",
    "this",
    "these",
    "those",
    "it",
    "its",
    "i",
    "you",
    "he",
    "she",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "their",
    "our",
    "so",
    "not",
    "no",
    "yes",
    "can",
    "will",
    "would",
    "should",
    "could",
    "have",
    "has",
    "had",
  ]);

  const updateCounts = () => {
    const text = textarea.value;

    charCount.textContent = text.length;

    const words = text.match(/\b[\w'-]+\b/g) || [];
    wordCount.textContent = words.length;

    const sentences = text
      .replace(/\s+/g, " ")
      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    sentenceCount.textContent = sentences.length;

    const paragraphs = text
      .split(/\n{2,}|\r{2,}/)
      .filter((p) => p.trim().length > 0);
    paragraphCount.textContent = paragraphs.length;

    if (topWordsEl) {
      const freqMap = {};

      for (const word of words) {
        const lower = word.toLowerCase();
        if (!stopWords.has(lower)) {
          freqMap[lower] = (freqMap[lower] || 0) + 1;
        }
      }

      const topEntries = Object.entries(freqMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      topWordsEl.innerHTML = topEntries
        .map(
          ([word, count]) =>
            `<li><span class="font-medium">${word}</span>: ${count}</li>`
        )
        .join("");
    }
  };

  textarea.addEventListener("input", debounce(updateCounts, 300));
  updateCounts();
}
