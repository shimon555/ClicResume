/**
 * Executive Template — Two-column with light sidebar, initials circle
 */
import { esc, colors, initials, renderContactList, renderItemList, renderSkillChips, renderLanguages, sectionHeading, renderWatermark, getOrderedSections, sectionHasData, CV_SECTION_LABELS } from './base.js';

export function render(data) {
    const c = colors(data.settings.color);
    const sections = getOrderedSections(data);
    const p = data.personal;

    const sidebarSections = ['skills', 'languages'];
    const mainSections = sections.filter(s => !sidebarSections.includes(s) && s !== 'about');

    // --- SIDEBAR ---
    let sidebarBody = '';

    // Contact
    const contactItems = [];
    const fields = [
        { key: 'phone', ltr: true }, { key: 'email', ltr: true },
        { key: 'location', ltr: false }, { key: 'linkedin', ltr: true },
        { key: 'website', ltr: true }, { key: 'github', ltr: true }
    ];
    for (const f of fields) {
        if (p[f.key]) contactItems.push(`<li class="${f.ltr ? 'ltr break-all' : ''}">${esc(p[f.key])}</li>`);
    }
    if (contactItems.length) {
        sidebarBody += `<div class="mb-7">
            ${sectionHeading('פרטי קשר', data.settings.color, 'sidebar-upper')}
            <ul class="space-y-2 text-[11.5px] text-slate-600">${contactItems.join('')}</ul>
        </div>`;
    }

    if (data.skills.length > 0 && sections.includes('skills')) {
        sidebarBody += `<div class="mb-7">
            ${sectionHeading('מיומנויות', data.settings.color, 'sidebar-upper')}
            <div class="flex flex-wrap gap-1.5">${renderSkillChips(data.skills, data.settings.color, 'light')}</div>
        </div>`;
    }

    if (data.languages.length > 0 && sections.includes('languages')) {
        sidebarBody += `<div>
            ${sectionHeading('שפות', data.settings.color, 'sidebar-upper')}
            <ul class="space-y-1.5 text-[12px]">${renderLanguages(data.languages)}</ul>
        </div>`;
    }

    // --- MAIN ---
    let mainBody = '';

    if (sectionHasData(data, 'about') && sections.includes('about')) {
        mainBody += `<div class="mb-7">
            ${sectionHeading('תקציר מקצועי', data.settings.color, 'executive-upper')}
            <p class="text-[12.5px] text-slate-600 leading-relaxed">${esc(p.about)}</p>
        </div>`;
    }

    for (const sid of mainSections) {
        if (!sectionHasData(data, sid)) continue;
        const label = CV_SECTION_LABELS[sid] || sid;
        const items = data[sid] || [];

        if (sid === 'experience') {
            mainBody += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'executive-upper')}
                <div class="space-y-5">${items.map(item => {
                    const inner = renderItemList([item], c.hex);
                    return `<div class="pr-4 border-r-2 ${c.border}">${inner}</div>`;
                }).join('')}</div>
            </div>`;
        } else {
            mainBody += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'executive-upper')}
                <div class="space-y-3">${renderItemList(items, c.hex)}</div>
            </div>`;
        }
    }

    return `<div class="h-full min-h-[297mm] flex flex-row">
        <div class="w-[35%] px-7 pt-12 pb-9 flex flex-col ${c.chipBg}">
            <div class="mb-8 text-center">
                <div class="w-24 h-24 mx-auto rounded-full grid place-items-center font-display font-black text-3xl text-white mb-3" style="background:${c.hex}">${esc(initials(p.name))}</div>
                <h1 class="font-display font-extrabold text-[20px] leading-tight text-slate-900">${esc(p.name) || 'השם שלך'}</h1>
                <p class="text-[12px] mt-1 ${c.text}">${esc(p.title) || 'כותרת מקצועית'}</p>
            </div>
            ${sidebarBody}
        </div>
        <div class="w-[65%] px-9 pt-12 pb-9">
            ${mainBody}
        </div>
    </div>
    ${renderWatermark(data.settings.watermark)}`;
}
