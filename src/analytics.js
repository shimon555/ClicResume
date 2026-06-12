/**
 * Analytics Module
 * Anonymous, event-based analytics. Loads only after user consent.
 * Never sends resume content or personal data.
 *
 * Supported providers:
 * - Google Analytics 4 (GA4)
 * - Vercel Web Analytics
 * - Custom endpoint (for future self-hosted dashboard)
 */

const config = {
    enabled: false,
    gaMeasurementId: '',  // e.g. 'G-XXXXXXXXXX'
    vercelAnalytics: false,
    endpoint: '',
    siteId: 'clicresume'
};

let ga4Initialized = false;
let vercelInitialized = false;

/* ── Consent ── */

const CONSENT_KEY = 'clicresume_analytics_consent';

export function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

export function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch {}
    if (value === 'accepted') {
        config.enabled = true;
        initGA4();
        initVercel();
    } else {
        config.enabled = false;
    }
}

export function hasConsent() {
    return getConsent() === 'accepted';
}

/* ── GA4 ── */

function initGA4() {
    if (ga4Initialized || !config.gaMeasurementId || !config.enabled) return;
    ga4Initialized = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.gaMeasurementId, {
        anonymize_ip: true,
        send_page_view: true
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.gaMeasurementId)}`;
    document.head.appendChild(script);
}

/* ── Vercel Web Analytics ── */

function initVercel() {
    if (vercelInitialized || !config.vercelAnalytics || !config.enabled) return;
    vercelInitialized = true;

    const script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    document.head.appendChild(script);
}

/* ── Speed Insights (Vercel) ── */

export function initSpeedInsights() {
    // Speed Insights is non-personal perf data — can load without consent
    const script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/speed-insights/script.js';
    document.head.appendChild(script);
}

/* ── Track Event ── */

export function track(eventName, details = {}) {
    if (!config.enabled) return;

    // GA4
    if (config.gaMeasurementId && typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
            site_id: config.siteId,
            language: document.documentElement.lang || 'he',
            ...details
        });
    }

    // Custom endpoint
    if (config.endpoint) {
        const payload = {
            event: eventName,
            siteId: config.siteId,
            path: location.pathname,
            language: document.documentElement.lang || 'he',
            timestamp: new Date().toISOString(),
            details
        };
        const body = JSON.stringify(payload);
        try {
            if (navigator.sendBeacon) {
                navigator.sendBeacon(config.endpoint, new Blob([body], { type: 'application/json' }));
                return;
            }
            fetch(config.endpoint, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body, keepalive: true
            }).catch(() => {});
        } catch {}
    }
}

/* ── Configure ── */

export function configure(newConfig) {
    Object.assign(config, newConfig);
}

/* ── Auto-init ── */

export function autoInit() {
    // TODO: Set your IDs here when ready:
    // configure({ gaMeasurementId: 'G-XXXXXXXXXX', vercelAnalytics: true });

    // Load Speed Insights (non-personal, always OK)
    initSpeedInsights();

    // Check consent
    if (hasConsent()) {
        config.enabled = true;
        initGA4();
        initVercel();
    }
}
