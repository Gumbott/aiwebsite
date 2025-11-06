import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';

// Hide noisy dev overlay popups that show generic [object Object] errors from extensions
const hideDevOverlay = () => {
  try {
    const candidates = [
      '#webpack-dev-server-client-overlay',
      '.webpack-dev-server-client-overlay',
      'iframe[style*="z-index:9999999999"]'
    ];
    candidates.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.remove();
      });
    });
    // Fallback: remove generic overlay dialogs
    document.querySelectorAll('div[role="dialog"]').forEach((el) => {
      const text = el.textContent || '';
      if (text.includes('Compiled with problems') || text.includes('Uncaught runtime errors')) {
        el.remove();
      }
    });
  } catch (_) {}
};

// Observe DOM changes to keep overlays hidden
const observer = new MutationObserver(() => hideDevOverlay());
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      hideDevOverlay();
      observer.observe(document.documentElement, { childList: true, subtree: true });
    });
  } else {
    hideDevOverlay();
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}

// Suppress noisy dev overlay popups for non-actionable extension errors like MetaMask
window.addEventListener(
  'error',
  (event) => {
    const raw = event?.error ?? event?.message;
    const text = String(raw);
    const isNoisyExtensionError =
      /isDefaultWallet|getEnabledChains|ethereum\.(send|sendAsync)/i.test(text) ||
      text === '[object Object]';
    if (isNoisyExtensionError) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

window.addEventListener(
  'unhandledrejection',
  (event) => {
    const reason = event?.reason;
    const text = typeof reason === 'object' ? String(reason?.message || reason) : String(reason);
    const isNoisyExtensionError =
      /isDefaultWallet|getEnabledChains|ethereum\.(send|sendAsync)/i.test(text) ||
      text === '[object Object]';
    if (isNoisyExtensionError) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

// Add global error handler
window.addEventListener('error', (event) => {
  const message = String(event?.error?.message || event?.message || event?.error || 'Unknown error');
  // Ignore noisy wallet/extension errors that don't affect the app UI
  if (/isDefaultWallet|getEnabledChains|ethereum\.(send|sendAsync)/i.test(message)) {
    event.preventDefault();
    return;
  }
  console.error('Global error:', event.error || message);
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason;
  const message = typeof reason === 'object' ? String(reason?.message || reason) : String(reason);
  // Ignore noisy wallet/extension errors that don't affect the app UI
  if (/isDefaultWallet|getEnabledChains|ethereum\.(send|sendAsync)/i.test(message)) {
    event.preventDefault();
    return;
  }
  console.error('Unhandled promise rejection:', reason || message);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();