// Centralized Tally service to avoid script conflicts
let tallyScriptLoaded = false;
let tallyScriptLoading = false;

export const loadTallyScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (tallyScriptLoaded) {
      resolve();
      return;
    }

    // If already loading, wait for it
    if (tallyScriptLoading) {
      const checkLoaded = () => {
        if (tallyScriptLoaded) {
          resolve();
        } else {
          setTimeout(checkLoaded, 50);
        }
      };
      checkLoaded();
      return;
    }

    tallyScriptLoading = true;

    const d = document;
    const w = "https://tally.so/widgets/embed.js";

    // Check if script already exists
    const existingScript = d.querySelector(`script[src="${w}"]`);
    if (existingScript) {
      tallyScriptLoaded = true;
      tallyScriptLoading = false;
      resolve();
      return;
    }

    const s = d.createElement("script");
    s.src = w;
    s.onload = () => {
      tallyScriptLoaded = true;
      tallyScriptLoading = false;
      loadTallyEmbeds();
      resolve();
    };
    s.onerror = () => {
      tallyScriptLoading = false;
      reject(new Error("Failed to load Tally script"));
    };
    d.body.appendChild(s);
  });
};

export const loadTallyEmbeds = () => {
  if (typeof window.Tally !== "undefined") {
    window.Tally.loadEmbeds();
  } else {
    document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
      const iframe = e as HTMLIFrameElement;
      iframe.src = iframe.dataset.tallySrc || '';
    });
  }

  // Force a re-check after a short delay
  setTimeout(() => {
    if (typeof window.Tally !== "undefined") {
      window.Tally.loadEmbeds();
    }
  }, 100);
};

// Global type declaration for TypeScript
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}