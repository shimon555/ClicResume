/**
 * Classic Template — Elegant serif, single column, centered header
 */
import { esc, colors, renderContactList, renderItemList, renderSkillChips, renderLanguages, sectionHeading, renderWatermark, getOrderedSections, sectionHasData, CV_SECTION_LABELS } from './base.js';

export function render(data) {
    const c = colors(data.settings.color);
    const sections = getOrderedSections(data);
    const p = data.personal;

    // Header with contact inline
    const contactItems = renderContactList(p, 'inline');
    const contactHtml = contactItems.length
        ? `<div class="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11.5px] text-slate-500 font-sans">${contactItems.join('')}</div>`
        : '';

    let body = '';
    for (const sid of sections) {
        if (!sectionHasData(data, sid)) continue;
        const label = CV_SECTION_LABELS[sid] || sid;

        if (sid === 'about') {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'border')}
                <p class="text-[13px] text-slate-700 leading-relaxed">${esc(p.about)}</p>
            </div>`;
        } else if (sid === 'skills') {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'border')}
                <p class="text-[12.5px] text-slate-700 leading-relaxed font-sans">${data.skills.map(s => esc(s)).join('  •  ')}</p>
            </div>`;
        } else if (sid === 'languages') {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'border')}
                <ul class="space-y-1 text-[12.5px] font-sans">${renderLanguages(data.languages)}</ul>
            </div>`;
        } else {
            const items = data[sid] || [];
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'border')}
                <div class="space-y-5">${renderItemList(items, c.hex)}</div>
            </div>`;
        }
    }

    return `<div class="px-14 pt-20 pb-12 h-full min-h-[297mm] font-serif">
        <div class="text-center pb-6 mb-8 border-b-2 ${c.border}">
            <h1 class="text-[40px] font-black leading-none mb-2 ${c.text}">${esc(p.name) || 'השם שלך'}</h1>
            <p class="text-lg text-slate-600 mb-4">${esc(p.title) || 'כותרת מקצועית'}</p>
            ${contactHtml}
        </div>
        ${body}
    </div>
    ${renderWatermark(data.settings.watermark)}`;
}
