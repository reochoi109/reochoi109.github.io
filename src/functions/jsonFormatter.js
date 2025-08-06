import { setupCopyButton } from "../utils/copy.js";
import { debounce } from "../utils/debounce.js";

export function setupJsonFormatter() {
  const input = document.getElementById("json-input");
  const output = document.getElementById("json-output");
  const lineNumbers = document.getElementById("line-numbers");

  const formatBtn = document.getElementById("format-json");
  const minifyBtn = document.getElementById("minify-json");
  const copyBtn = document.getElementById("copy-json");

  const parseJson = (text) => window.jsonlint.parse(text);

  const renderOutput = (json, minify = false) => {
    const formatted = minify ? JSON.stringify(json) : JSON.stringify(json, null, 2);
    output.value = formatted;
  };

  const showError = (e) => {
    output.value = e.message;
    output.classList.add("text-red-600");
  };

  const clearError = () => {
    output.classList.remove("text-red-600");
  };

  const updateLineNumbers = () => {
    const lines = input.value.split("\n").length || 1;
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("<br>");
  };

  const syncScroll = () => {
    lineNumbers.scrollTop = input.scrollTop;
  };

  const handleInputChange = () => {
    const text = input.value.trim();
    if (!text) {
      output.value = "";
      clearError();
      updateLineNumbers();
      return;
    }

    try {
      const json = parseJson(text);
      clearError();
      renderOutput(json);
    } catch (e) {
      showError(e);
    }

    updateLineNumbers();
  };

  input.addEventListener("input", debounce(handleInputChange, 300));
  input.addEventListener("scroll", syncScroll);
  formatBtn.addEventListener("click", handleInputChange); // 즉시 실행
  minifyBtn.addEventListener("click", () => {
    try {
      const json = parseJson(input.value);
      clearError();
      renderOutput(json, true);
    } catch (e) {
      showError(e);
    }
  });

  setupCopyButton(copyBtn, () => output.value);

  updateLineNumbers();
  handleInputChange();
}
