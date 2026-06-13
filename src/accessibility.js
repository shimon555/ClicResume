/**
 * Accessibility Widget — קורות חיים בקליק
 * ווידג'ט נגישות עצמאי בעברית, תואם תקן 5568.
 * משפיע על ממשק העריכה בלבד (לא על Preview / PDF).
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'clicresume_a11y';
    const ROOT = document.documentElement;

    /* ── State ─────────────────────────────────────────── */
    const defaults = {
        fontSize: 0,        // -2 … +4 steps
        contrast: false,
        readableFont: false,
        noAnimations: false,
        highlightLinks: false,
        bigCursor: false,
        lineHeight: false,
    };

    let state = { ...defaults };
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) Object.assign(state, JSON.parse(saved));
    } catch { /* ignore */ }

    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
    }

    /* ── Apply ─────────────────────────────────────────── */
    function apply() {
        // Font size — applied via CSS variable on <html>
        ROOT.style.setProperty('--a11y-font-scale', 1 + state.fontSize * 0.1);

        ROOT.classList.toggle('a11y-contrast', state.contrast);
        ROOT.classList.toggle('a11y-readable-font', state.readableFont);
        ROOT.classList.toggle('a11y-no-animations', state.noAnimations);
        ROOT.classList.toggle('a11y-highlight-links', state.highlightLinks);
        ROOT.classList.toggle('a11y-big-cursor', state.bigCursor);
        ROOT.classList.toggle('a11y-line-height', state.lineHeight);

        save();
        updateButtonStates();
    }

    /* ── UI ─────────────────────────────────────────────── */
    function updateButtonStates() {
        const panel = document.getElementById('a11y-panel');
        if (!panel) return;
        panel.querySelector('[data-a11y="contrast"]')?.classList.toggle('a11y-btn-active', state.contrast);
        panel.querySelector('[data-a11y="readableFont"]')?.classList.toggle('a11y-btn-active', state.readableFont);
        panel.querySelector('[data-a11y="noAnimations"]')?.classList.toggle('a11y-btn-active', state.noAnimations);
        panel.querySelector('[data-a11y="highlightLinks"]')?.classList.toggle('a11y-btn-active', state.highlightLinks);
        panel.querySelector('[data-a11y="bigCursor"]')?.classList.toggle('a11y-btn-active', state.bigCursor);
        panel.querySelector('[data-a11y="lineHeight"]')?.classList.toggle('a11y-btn-active', state.lineHeight);
        const sizeLabel = panel.querySelector('[data-a11y-size-label]');
        if (sizeLabel) sizeLabel.textContent = state.fontSize === 0 ? '100%' : `${100 + state.fontSize * 10}%`;
    }

    function createWidget() {
        // --- Toggle button (FAB) ---
        const fab = document.createElement('button');
        fab.id = 'a11y-fab';
        fab.setAttribute('aria-label', 'תפריט נגישות');
        fab.setAttribute('title', 'נגישות');
        fab.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2"/><path d="M12 7v4"/><path d="m8 11 4 1 4-1"/><path d="m8 15 2.5 5"/><path d="m16 15-2.5 5"/></svg>`;

        // --- Panel ---
        const panel = document.createElement('div');
        panel.id = 'a11y-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'הגדרות נגישות');
        panel.setAttribute('dir', 'rtl');
        panel.classList.add('a11y-panel-hidden');

        panel.innerHTML = `
            <div class="a11y-panel-header">
                <span class="a11y-panel-title">♿ הגדרות נגישות</span>
                <button id="a11y-close" aria-label="סגירת תפריט נגישות">&times;</button>
            </div>
            <div class="a11y-panel-body">
                <div class="a11y-group">
                    <span class="a11y-group-label">גודל טקסט</span>
                    <div class="a11y-size-controls">
                        <button data-a11y="fontDown" aria-label="הקטנת גופן">א-</button>
                        <span data-a11y-size-label>100%</span>
                        <button data-a11y="fontUp" aria-label="הגדלת גופן">א+</button>
                    </div>
                </div>
                <button data-a11y="contrast" class="a11y-option-btn">
                    <span class="a11y-option-icon">◐</span>
                    <span>ניגודיות גבוהה</span>
                </button>
                <button data-a11y="readableFont" class="a11y-option-btn">
                    <span class="a11y-option-icon">Aa</span>
                    <span>גופן קריא</span>
                </button>
                <button data-a11y="noAnimations" class="a11y-option-btn">
                    <span class="a11y-option-icon">⏸</span>
                    <span>עצירת אנימציות</span>
                </button>
                <button data-a11y="highlightLinks" class="a11y-option-btn">
                    <span class="a11y-option-icon">🔗</span>
                    <span>הדגשת קישורים</span>
                </button>
                <button data-a11y="bigCursor" class="a11y-option-btn">
                    <span class="a11y-option-icon">↗</span>
                    <span>סמן גדול</span>
                </button>
                <button data-a11y="lineHeight" class="a11y-option-btn">
                    <span class="a11y-option-icon">≡</span>
                    <span>ריווח שורות</span>
                </button>
                <div class="a11y-panel-footer">
                    <button id="a11y-reset" class="a11y-reset-btn">↺ איפוס הכל</button>
                    <a href="accessibility.html" class="a11y-statement-link">הצהרת נגישות</a>
                </div>
            </div>`;

        document.body.appendChild(fab);
        document.body.appendChild(panel);

        // --- Events ---
        let isOpen = false;
        function toggle() {
            isOpen = !isOpen;
            panel.classList.toggle('a11y-panel-hidden', !isOpen);
            fab.classList.toggle('a11y-fab-open', isOpen);
            fab.setAttribute('aria-expanded', isOpen);
            if (isOpen) panel.querySelector('[data-a11y="contrast"]')?.focus();
        }

        fab.addEventListener('click', toggle);
        panel.querySelector('#a11y-close').addEventListener('click', toggle);

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) toggle();
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (isOpen && !panel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
                toggle();
            }
        });

        // Option buttons
        panel.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-a11y]');
            if (!btn) return;
            const action = btn.dataset.a11y;

            switch (action) {
                case 'fontUp':
                    if (state.fontSize < 4) { state.fontSize++; apply(); }
                    break;
                case 'fontDown':
                    if (state.fontSize > -2) { state.fontSize--; apply(); }
                    break;
                case 'contrast':
                case 'readableFont':
                case 'noAnimations':
                case 'highlightLinks':
                case 'bigCursor':
                case 'lineHeight':
                    state[action] = !state[action];
                    apply();
                    break;
            }
        });

        // Reset
        panel.querySelector('#a11y-reset').addEventListener('click', () => {
            Object.assign(state, defaults);
            apply();
        });
    }

    /* ── CSS (injected once) ───────────────────────────── */
    function injectStyles() {
        const style = document.createElement('style');
        style.id = 'a11y-widget-styles';
        style.textContent = `
/* ===== Accessibility Widget ===== */

/* --- FAB Button --- */
#a11y-fab {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 9999;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #4f46e5;
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(79,70,229,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
}
#a11y-fab:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(79,70,229,0.5); }
#a11y-fab:focus-visible { outline: 3px solid #818cf8; outline-offset: 3px; }
#a11y-fab.a11y-fab-open { background: #3730a3; }

/* --- Panel --- */
#a11y-panel {
    position: fixed;
    bottom: 82px;
    left: 20px;
    z-index: 9999;
    width: 280px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.18);
    font-family: 'Assistant', 'Segoe UI', sans-serif;
    transition: opacity 0.2s, transform 0.2s;
    transform-origin: bottom left;
}
#a11y-panel.a11y-panel-hidden { opacity: 0; transform: scale(0.92); pointer-events: none; }

.a11y-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid #e2e8f0;
}
.a11y-panel-title { font-weight: 700; font-size: 15px; color: #1e293b; }
.a11y-panel-header button {
    background: none; border: none; font-size: 22px; cursor: pointer; color: #94a3b8;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
}
.a11y-panel-header button:hover { background: #f1f5f9; color: #475569; }

.a11y-panel-body { padding: 12px; display: flex; flex-direction: column; gap: 6px; }

/* --- Font size group --- */
.a11y-group {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #f8fafc; border-radius: 10px;
}
.a11y-group-label { font-size: 13px; font-weight: 600; color: #334155; }
.a11y-size-controls { display: flex; align-items: center; gap: 8px; }
.a11y-size-controls button {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid #cbd5e1;
    background: #fff; cursor: pointer; font-weight: 700; font-size: 13px; color: #334155;
    display: flex; align-items: center; justify-content: center;
}
.a11y-size-controls button:hover { background: #e0e7ff; border-color: #818cf8; }
.a11y-size-controls span { font-size: 12px; font-weight: 600; min-width: 36px; text-align: center; color: #475569; }

/* --- Option buttons --- */
.a11y-option-btn {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0;
    border-radius: 10px; background: #fff; cursor: pointer;
    font-size: 13px; font-weight: 500; color: #334155;
    transition: background 0.15s, border-color 0.15s;
    text-align: right;
}
.a11y-option-btn:hover { background: #f1f5f9; border-color: #c7d2fe; }
.a11y-option-btn:focus-visible { outline: 2px solid #818cf8; outline-offset: 1px; }
.a11y-option-btn.a11y-btn-active {
    background: #e0e7ff; border-color: #818cf8; color: #3730a3; font-weight: 700;
}
.a11y-option-icon {
    width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; background: #f1f5f9; font-size: 14px; flex-shrink: 0;
}
.a11y-btn-active .a11y-option-icon { background: #c7d2fe; }

/* --- Footer --- */
.a11y-panel-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 10px; margin-top: 4px; border-top: 1px solid #e2e8f0;
}
.a11y-reset-btn {
    background: none; border: none; font-size: 12px; color: #64748b;
    cursor: pointer; font-weight: 600; padding: 4px 0;
}
.a11y-reset-btn:hover { color: #ef4444; }
.a11y-statement-link {
    font-size: 12px; color: #4f46e5; text-decoration: underline; font-weight: 500;
}
.a11y-statement-link:hover { color: #3730a3; }

/* ===== Accessibility Effects (editor only, not .cv-page) ===== */

/* Font scale — applies to everything EXCEPT the CV preview */
html[style*="--a11y-font-scale"] body > *:not(.cv-page):not(#a11y-panel):not(#a11y-fab) {
    font-size: calc(1em * var(--a11y-font-scale, 1));
}

/* High contrast */
html.a11y-contrast body { background: #000 !important; color: #fff !important; }
html.a11y-contrast header,
html.a11y-contrast main > *:not(section:has(.cv-page)),
html.a11y-contrast aside,
html.a11y-contrast nav { background: #000 !important; color: #fff !important; }
html.a11y-contrast input, html.a11y-contrast select, html.a11y-contrast textarea,
html.a11y-contrast button:not(#a11y-fab):not(.a11y-option-btn):not(#a11y-close):not(#a11y-reset) {
    background: #1a1a1a !important; color: #fff !important; border-color: #fff !important;
}
/* Don't affect CV preview */
html.a11y-contrast .cv-page, html.a11y-contrast .cv-page * { filter: none !important; }

/* Readable font */
html.a11y-readable-font body > *:not(.cv-page) {
    font-family: Arial, Helvetica, sans-serif !important;
}

/* No animations */
html.a11y-no-animations *:not(.cv-page):not(.cv-page *) {
    animation: none !important;
    transition: none !important;
}

/* Highlight links */
html.a11y-highlight-links a:not(.cv-page a) {
    outline: 2px solid #4f46e5 !important;
    outline-offset: 2px;
    text-decoration: underline !important;
    background: rgba(79,70,229,0.08) !important;
}

/* Big cursor */
html.a11y-big-cursor, html.a11y-big-cursor * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M5 2 L5 32 L13 24 L22 36 L28 32 L19 20 L30 20 Z' fill='black' stroke='white' stroke-width='2'/%3E%3C/svg%3E") 5 2, auto !important;
}
html.a11y-big-cursor .cv-page, html.a11y-big-cursor .cv-page * { cursor: default !important; }

/* Line height */
html.a11y-line-height body > *:not(.cv-page) * { line-height: 2 !important; }

/* ===== Print: hide widget ===== */
@media print {
    #a11y-fab, #a11y-panel { display: none !important; }
}

/* ===== Mobile adjustments ===== */
@media (max-width: 640px) {
    #a11y-panel { left: 10px; right: 10px; width: auto; bottom: 78px; }
    #a11y-fab { bottom: 14px; left: 14px; width: 46px; height: 46px; }
}
`;
        document.head.appendChild(style);
    }

    /* ── Init ───────────────────────────────────────────── */
    function init() {
        injectStyles();
        createWidget();
        apply();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
