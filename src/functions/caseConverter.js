import { setupCopyButton } from "../utils/copy.js";
import { debounce } from "../utils/debounce.js";

export function setupCaseConverter() {
  const input = document.getElementById("input-text");
  const output = document.getElementById("output-text");
  const modeSelect = document.getElementById("mode-select");
  const copyBtn = document.getElementById("copy-output");

  const toSentenceCase = (text) =>
    text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?\n]\s*\w)/g, (match) => match.toUpperCase());

  const toCapitalize = (text) =>
    text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const transform = (text, mode) => {
    switch (mode) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "capitalize":
        return toCapitalize(text);
      case "sentence":
        return toSentenceCase(text);
      default:
        return text;
    }
  };

  const updateOutput = () => {
    output.value = transform(input.value, modeSelect.value);
  };

  input.addEventListener("input", debounce(updateOutput, 200));
  modeSelect.addEventListener("change", updateOutput);
  setupCopyButton(copyBtn, () => output.value);
}
