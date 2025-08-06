import { setupCopyButton } from "../utils/copy.js";
import { debounce } from "../utils/debounce.js";

export function setupRemoveLineBreaks() {
  const input = document.getElementById("linebreak-input");
  const output = document.getElementById("linebreak-output");
  const copyBtn = document.getElementById("copy-result-btn");
  const convertBtn = document.getElementById("remove-linebreaks-btn");

  const getReplaceOption = () => {
    const selected = document.querySelector('input[name="replace-option"]:checked');
    return selected ? selected.value : "none";
  };

  const transformText = (text, option) => {
    switch (option) {
      case "space":
        return text.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
      case "none":
      default:
        return text.replace(/[\r\n]+/g, "").replace(/\s+/g, " ").trim();
    }
  };

  const updateOutput = () => {
    const option = getReplaceOption();
    output.value = transformText(input.value, option);
  };

  // 실시간 반영 (자동 업데이트)
  input.addEventListener("input", debounce(updateOutput, 200));
  document.querySelectorAll('input[name="replace-option"]').forEach(radio =>
    radio.addEventListener("change", updateOutput)
  );

  // Convert 버튼 수동 실행용 (선택 사항)
  convertBtn.addEventListener("click", updateOutput);

  // Copy 기능
  setupCopyButton(copyBtn, () => output.value);

  // 초기 실행
  updateOutput();
}
