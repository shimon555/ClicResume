/**
 * Shared Template Utilities
 * Common rendering functions used by all CV templates.
 */

import { COLOR_MAP } from '../cv-data.js';

/** Escape HTML entities */
export function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Get color config */
export function colors(colorKey) {
    return COLOR_MAP[colorKey] || COLOR_MAP.indigo;
}

/** Generate initials from name */
export function initials(name) {
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '••';
    if (parts.length === 1) return parts[0].slice(0, 2);
    return (parts[0][0] || '') + (parts[1][0] || '');
}

/** Check if text has multiple lines (should render as bullet list) */
export function hasBullets(text) {
    if (!text) return false;
    return text.split('\n').filter(l => l.trim()).length > 1 || /^\s*[•\-\*]/.test(text);
}

/** Split description into clean lines */
export function descLines(text) {
    if (!text) return [];
    return text.split('\n').map(l => l.replace(/^\s*[•\-\*]\s*/, '').trim()).filter(Boolean);
}

/** Language level to percentage for progress bars */
export function langPercent(level) {
    const l = (level || '').toLowerCase();
    if (/(שפת אם|native|mother)/.test(l)) return 100;
    if (/(שוטף|fluent|מקצוע|גבוה|advanced)/.test(l)) return 90;
    if (/(טוב|good|בינוני|intermediate)/.test(l)) return 70;
    if (/(בסיס|basic|מתחיל|beginner)/.test(l)) return 45;
    return 80;
}

/** Render contact info list as HTML */
export function renderContactList(personal, style = 'sidebar') {
    const items = [];
    const icons = {
        phone: `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
        email: `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
        location: `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        linkedin: `<svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 17V10.2H6.06V17h2.28zM7.2 9.24a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64zM18 17v-3.73c0-1.99-.43-3.52-2.75-3.52-1.12 0-1.87.61-2.18 1.2h-.03V10.2H10.8V17h2.28v-3.36c0-.89.17-1.75 1.27-1.75 1.09 0 1.1 1.02 1.1 1.81V17H18z"/></svg>`,
        website: `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
        github: `<svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z"/></svg>`
    };

    const contactFields = [
        { key: 'phone', ltr: true },
        { key: 'email', ltr: true },
        { key: 'location', ltr: false },
        { key: 'linkedin', ltr: true },
        { key: 'website', ltr: true },
        { key: 'github', ltr: true }
    ];

    for (const f of contactFields) {
        const val = personal[f.key];
        if (!val) continue;
        if (style === 'sidebar') {
            items.push(`<li class="flex items-center gap-2.5">${icons[f.key]}<span class="${f.ltr ? 'ltr break-all' : ''}">${esc(val)}</span></li>`);
        } else if (style === 'inline') {
            items.push(`<span class="${f.ltr ? 'ltr' : ''}">${esc(val)}</span>`);
        } else if (style === 'stack') {
            items.push(`<p class="${f.ltr ? 'ltr' : ''}">${esc(val)}</p>`);
        }
    }
    return items;
}

/** Render a list of experience-like items (experience, military, volunteering) */
export function renderItemList(items, colorHex, options = {}) {
    const { showTimeline = false, compact = false } = options;
    if (!items.length) return '';

    const fontSize = compact ? '11.5px' : '12px';
    const titleSize = compact ? '12.5px' : '13.5px';
    const gap = compact ? '3.5' : '5';

    return items.map((item, i) => {
        const title = item.role || item.degree || item.name || '';
        const subtitle = item.company || item.institution || item.unit || item.organization || item.issuer || '';
        const period = item.period || item.date || '';
        const desc = item.description || '';

        let descHtml = '';
        if (desc && hasBullets(desc)) {
            const lines = descLines(desc);
            descHtml = `<ul class="space-y-${compact ? '0.5' : '1'}">${lines.map(l =>
                `<li class="flex gap-${compact ? '1.5' : '2'} text-[${fontSize}] text-slate-600 leading-snug"><span style="color:${colorHex}">•</span><span>${esc(l)}</span></li>`
            ).join('')}</ul>`;
        } else if (desc) {
            descHtml = `<p class="text-[${fontSize}] text-slate-600 leading-relaxed">${esc(desc)}</p>`;
        }

        // Technologies line for projects
        const techLine = item.technologies ? `<p class="text-[11px] text-slate-500 mb-1">${esc(item.technologies)}</p>` : '';
        const linkLine = item.link ? `<p class="text-[10.5px] text-slate-400 ltr">${esc(item.link)}</p>` : '';

        const timelineDot = showTimeline
            ? `<span class="absolute -right-[26px] top-1 w-2.5 h-2.5 rounded-full ring-2 ring-white" style="background:${colorHex}"></span>`
            : '';

        return `<div class="relative">
            ${timelineDot}
            <div class="flex justify-between items-start gap-2 mb-0.5">
                <h4 class="text-[${titleSize}] font-bold text-slate-800">${esc(title)}</h4>
                ${period ? `<span class="text-[10.5px] font-semibold text-slate-500 shrink-0 ltr">${esc(period)}</span>` : ''}
            </div>
            ${subtitle ? `<p class="text-[${fontSize}] font-semibold mb-1.5" style="color:${colorHex}">${esc(subtitle)}</p>` : ''}
            ${techLine}${descHtml}${linkLine}
        </div>`;
    }).join('');
}

/** Render skills as chips */
export function renderSkillChips(skills, colorKey, style = 'colored') {
    if (!skills.length) return '';
    const c = colors(colorKey);
    return skills.map(s => {
        if (style === 'sidebar') {
            return `<span class="bg-white/10 ring-1 ring-white/15 text-[11px] px-2 py-0.5 rounded-md">${esc(s)}</span>`;
        } else if (style === 'light') {
            return `<span class="text-[11px] font-medium px-2 py-0.5 rounded bg-white/70 text-slate-700 ring-1 ring-black/5">${esc(s)}</span>`;
        } else {
            return `<span class="text-[11px] font-medium px-2 py-0.5 rounded ${c.chipBg} ${c.chipText}">${esc(s)}</span>`;
        }
    }).join('');
}

/** Render languages with optional progress bars */
export function renderLanguages(languages, options = {}) {
    const { bars = false, fontSize = '12px' } = options;
    return languages.map(lang => {
        if (bars) {
            const pct = langPercent(lang.level);
            return `<li>
                <div class="flex justify-between mb-1"><span class="font-semibold">${esc(lang.name)}</span><span class="text-white/60 text-[11px]">${esc(lang.level)}</span></div>
                <div class="h-1 rounded-full bg-white/15 overflow-hidden"><div class="h-full bg-white/70 rounded-full" style="width:${pct}%"></div></div>
            </li>`;
        }
        return `<li class="flex justify-between"><span class="font-semibold text-slate-800">${esc(lang.name)}</span><span class="text-slate-500 text-[11px]">${esc(lang.level)}</span></li>`;
    }).join('');
}

/** Render a section heading with colored accent */
export function sectionHeading(title, colorKey, style = 'line') {
    const c = colors(colorKey);
    if (style === 'line') {
        return `<h3 class="text-xs font-display font-extrabold tracking-wide mb-2.5 flex items-center gap-2 ${c.text}"><span>${esc(title)}</span><span class="flex-1 h-px bg-slate-200"></span></h3>`;
    }
    if (style === 'border') {
        return `<h3 class="text-sm font-bold mb-2 pb-1 border-b border-slate-200 ${c.text}">${esc(title)}</h3>`;
    }
    if (style === 'uppercase') {
        return `<h3 class="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">${esc(title)}</h3>`;
    }
    if (style === 'dot') {
        return `<h3 class="text-sm font-display font-extrabold mb-2 flex items-center gap-2 ${c.text}"><span class="w-2.5 h-2.5 rounded-sm" style="background:${c.hex}"></span>${esc(title)}</h3>`;
    }
    if (style === 'sidebar-upper') {
        return `<h3 class="text-[11px] font-bold tracking-[0.15em] uppercase mb-3 pb-1.5 border-b ${c.text} ${c.border}">${esc(title)}</h3>`;
    }
    if (style === 'compact-upper') {
        return `<h3 class="text-[11px] font-bold tracking-[0.18em] uppercase mb-3 ${c.text}">${esc(title)}</h3>`;
    }
    if (style === 'executive-upper') {
        return `<h3 class="text-sm font-display font-extrabold tracking-wide mb-4 uppercase ${c.text}">${esc(title)}</h3>`;
    }
    return `<h3 class="text-sm font-bold mb-3 ${c.text}">${esc(title)}</h3>`;
}

/** Render the watermark (always shown) */
export function renderWatermark() {
    return `<div class="brand-watermark">
        <img src="assets/logo-mark.svg" alt="" class="brand-watermark__mark">
        <span>נוצר עם קורות חיים בקליק</span>
        <span style="margin:0 3px;opacity:.5">|</span>
        <span style="direction:ltr">clicresume.com</span>
    </div>`;
}

/** Get ordered visible sections for template rendering */
export function getOrderedSections(data) {
    const order = data.settings.sectionOrder || [];
    const visible = new Set(data.settings.visibleSections || []);
    // Include ordered visible sections, then any visible sections not in order
    const result = [];
    for (const id of order) {
        if (visible.has(id)) result.push(id);
    }
    for (const id of visible) {
        if (!result.includes(id)) result.push(id);
    }
    return result;
}

/** Check if a section has data */
export function sectionHasData(data, sectionId) {
    switch (sectionId) {
        case 'about': return Boolean(data.personal.about);
        case 'skills': return data.skills.length > 0;
        case 'languages': return data.languages.length > 0;
        default: return Array.isArray(data[sectionId]) && data[sectionId].length > 0;
    }
}

/** Mapping from section id to CV heading label */
export const CV_SECTION_LABELS = {
    about: 'תקציר מקצועי',
    experience: 'ניסיון תעסוקתי',
    education: 'השכלה',
    military: 'שירות צבאי / לאומי',
    volunteering: 'התנדבות',
    projects: 'פרויקטים',
    certifications: 'הסמכות ותעודות',
    skills: 'מיומנויות',
    languages: 'שפות'
};
