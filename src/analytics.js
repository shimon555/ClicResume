/**
 * Analytics Module
 * Anonymous, event-based analytics. Disabled by default.
 * Never sends resume content or personal data.
 */

const config = {
    enabled: false,
    provider: 'endpoint',
    endpoint: '',
    gaMeasurementId: '',
    siteId: 'korot-haim-beklik'
};

let initialized = false;

function init() {
    if (initialized || !config.enabled) return;
    initialized = true;
    if (config.provider !== 'ga4' || !config.gaMeasurementId) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.gaMeasurementId, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.gaMeasurementId)}`;
    document.head.appendChild(script);
}

export function track(eventName, details = {}) {
    if (!config.enabled) return;
    init();

    if (config.provider === 'ga4' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
            site_id: config.siteId,
            language: document.documentElement.lang || 'he',
            ...details
        });
        return;
    }

    if (!config.endpoint) return;
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

export function configure(newConfig) {
    Object.assign(config, newConfig);
}
