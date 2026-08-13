import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9337;
const profile = "/tmp/blog-wireframe-chrome";
const sources = [
  ["molru", "wireframe-molru.html"],
  ["photoai", "wireframe-photoai.html"],
  ["schemapad", "wireframe-schemapad.html"],
  ["slowmind", "wireframe-slowmind.html"],
  ["nodalite", "nodalite-wireframe.html"],
];
const manifest = {};

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
      if (response.ok) return response.json();
    } catch {}
    await delay(100);
  }
  throw new Error("Chrome debugging endpoint did not start.");
}

function connect(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  let nextId = 1;
  const pending = new Map();
  const events = new Map();

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
      return;
    }
    const listeners = events.get(message.method) ?? [];
    listeners.splice(0).forEach((resolve) => resolve(message.params));
  };

  const opened = new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });

  return {
    opened,
    close: () => socket.close(),
    send(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const listeners = events.get(method) ?? [];
        listeners.push(resolve);
        events.set(method, listeners);
      });
    },
  };
}

const slugify = (value) => value
  .normalize("NFKD")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .toLowerCase();

await rm(profile, { recursive: true, force: true });
const chrome = spawn(chromePath, [
  "--headless=new",
  "--hide-scrollbars",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--window-size=1440,900",
  "about:blank",
], { stdio: "ignore" });

try {
  const target = await waitForDebugger();
  const client = connect(target.webSocketDebuggerUrl);
  await client.opened;
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  for (const [product, file] of sources) {
    manifest[product] = [];
    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url: pathToFileURL(path.join(root, file)).href });
    await loaded;
    await delay(150);

    const outputDir = path.join(root, "static", "images", "products", product, "wireframes");
    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    const { result } = await client.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const style = document.createElement('style');
        style.textContent = '.bar,.intro{display:none!important}#pages{width:1440px!important;max-width:none!important;padding:0!important}.sheet{width:1440px!important;margin:0!important;overflow:visible!important}.frame,.artboard{box-shadow:none!important;border-radius:0!important}';
        document.head.append(style);
        return [...document.querySelectorAll('.sheet')]
          .filter(sheet => getComputedStyle(sheet).display !== 'none' && !sheet.classList.contains('hidden'))
          .map((sheet, index) => {
            const target = sheet.querySelector('.frame,.artboard');
            const rect = target.getBoundingClientRect();
            const heading = sheet.querySelector('.meta h3')?.textContent?.trim() || 'Wireframe ' + (index + 1);
            const route = sheet.querySelector('.meta code')?.textContent?.trim() || '';
            return { index, heading, route, x: rect.left + scrollX, y: rect.top + scrollY, width: rect.width, height: rect.height };
          });
      })()`,
    });

    for (const item of result.value) {
      const sourceNumber = item.heading.match(/^\d+/)?.[0];
      const number = String(sourceNumber ?? item.index + 1).padStart(2, "0");
      const heading = item.heading.replace(/^\d+\.?\s*/, "");
      const filename = `${number}-${slugify(heading) || "wireframe"}.png`;
      const screenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: true,
        clip: {
          x: Math.max(0, item.x),
          y: Math.max(0, item.y),
          width: Math.ceil(item.width),
          height: Math.ceil(item.height),
          scale: 1,
        },
      });
      await writeFile(path.join(outputDir, filename), Buffer.from(screenshot.data, "base64"));
      manifest[product].push({
        image: `/images/products/${product}/wireframes/${filename}`,
        title: heading,
        route: item.route,
      });
      console.log(`${product}\t${filename}\t${heading}\t${item.route}`);
    }
  }

  await writeFile(
    path.join(root, "data", "wireframes.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  client.close();
} finally {
  chrome.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => chrome.once("exit", resolve)),
    delay(2000),
  ]);
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await rm(profile, { recursive: true, force: true });
      break;
    } catch {
      await delay(200);
    }
  }
}
