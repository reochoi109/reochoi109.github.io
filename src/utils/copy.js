export function setupCopyButton(button, getText) {
  if (!button || typeof getText !== "function") return;

  button.addEventListener("click", () => {
    const text = getText();
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      const original = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = original), 700);
    });
  });
}
