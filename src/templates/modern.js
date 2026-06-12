/**
 * Modern Template — Two-column layout with dark sidebar
 */
import { esc, colors, initials, renderContactList, renderItemList, renderSkillChips, renderLanguages, sectionHeading, renderWatermark, getOrderedSections, sectionHasData, CV_SECTION_LABELS } from './base.js';

export function render(data) {
    const c = colors(data.settings.color);
    const sections = getOrderedSections(data);
    const p = data.personal;

    // Split sections: sidebar gets skills + languages, main gets the rest
    const sidebarSections = ['skills', 'languages'];
    const mainSections = sections.filter(s => !sidebarSections.includes(s) && s !== 'about');

    // --- SIDEBAR ---
    const contactHtml = renderContactList(p, 'sidebar').map(li =>
        li.replace('shrink-0"', 'text-white/60 shrink-0"')
    ).join('');

    let sidebarBody = '';

    // Contact
    if (contactHtml) {
        sidebarBody += `<div class="mb-7">
            <h3 class="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3">פרטי קשר</h3>
            <ul class="space-y-2.5 text-[12px]">${contactHtml}</ul>
        </div>`;
    }

    // Skills in sidebar
    if (data.skills.length > 0 && sections.includes('skills')) {
        sidebarBody += `<div class="mb-7">
            <h3 class="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3">מיומנויות</h3>
            <div class="flex flex-wrap gap-1.5">${renderSkillChips(data.skills, data.settings.color, 'sidebar')}</div>
        </div>`;
    }

    // Languages in sidebar
    if (data.languages.length > 0 && sections.includes('languages')) {
        sidebarBody += `<div class="mb-7">
            <h3 class="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3">שפות</h3>
            <ul class="space-y-2.5 text-[12px]">${renderLanguages(data.languages, { bars: true })}</ul>
        </div>`;
    }

    // --- MAIN CONTENT ---
    let mainBody = '';

    // About
    if (sectionHasData(data, 'about') && sections.includes('about')) {
        mainBody += `<div class="mb-7">
            ${sectionHeading('תקציר מקצועי', data.settings.color, 'line')}
            <p class="text-[12.5px] text-slate-600 leading-relaxed">${esc(p.about)}</p>
        </div>`;
    }

    // Main list sections
    for (const sid of mainSections) {
        if (!sectionHasData(data, sid)) continue;
        const label = CV_SECTION_LABELS[sid] || sid;
        const items = data[sid] || [];

        if (sid === 'experience') {
            mainBody += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'line')}
                <div class="space-y-5 border-r-2 pr-5 mr-1" style="border-color:${c.hex}30">
                    ${renderItemList(items, c.hex, { showTimeline: true })}
                </div>
            </div>`;
        } else {
            mainBody += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'line')}
                <div class="space-y-3.5">${renderItemList(items, c.hex)}</div>
            </div>`;
        }
    }

    return `<div class="h-full min-h-[297mm] flex flex-row">
        <div class="w-[34%] text-slate-100 px-7 pt-16 pb-8 flex flex-col bg-gradient-to-b ${c.grad}">
            <div class="mb-8 flex flex-col items-center text-center">
                <h1 class="font-display font-extrabold text-xl leading-tight">${esc(p.name) || 'השם שלך'}</h1>
                <p class="text-xs text-white/70 mt-1">${esc(p.title) || 'כותרת מקצועית'}</p>
            </div>
            ${sidebarBody}
        </div>
        <div class="w-[66%] px-9 pt-20 pb-9">
            ${mainBody}
        </div>
    </div>
    ${renderWatermark(data.settings.watermark)}`;
}
