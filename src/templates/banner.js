/**
 * Banner Template — Wide gradient header with initials badge
 */
import { esc, colors, initials, renderContactList, renderItemList, renderSkillChips, renderLanguages, sectionHeading, renderWatermark, getOrderedSections, sectionHasData, CV_SECTION_LABELS } from './base.js';

export function render(data) {
    const c = colors(data.settings.color);
    const sections = getOrderedSections(data);
    const p = data.personal;

    const contactItems = renderContactList(p, 'inline');
    const contactHtml = contactItems.length
        ? `<div class="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-white/85 mt-5 font-sans">${contactItems.join('')}</div>`
        : '';

    let body = '';
    for (const sid of sections) {
        if (!sectionHasData(data, sid)) continue;
        const label = CV_SECTION_LABELS[sid] || sid;

        if (sid === 'about') {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'dot')}
                <p class="text-[13px] text-slate-600 leading-relaxed">${esc(p.about)}</p>
            </div>`;
        } else if (sid === 'skills') {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'dot')}
                <div class="flex flex-wrap gap-1.5">${renderSkillChips(data.skills, data.settings.color)}</div>
            </div>`;
        } else if (sid === 'languages') {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'dot')}
                <ul class="space-y-1.5 text-[12.5px]">${renderLanguages(data.languages)}</ul>
            </div>`;
        } else {
            body += `<div class="mb-7">
                ${sectionHeading(label, data.settings.color, 'dot')}
                <div class="space-y-5">${renderItemList(data[sid] || [], c.hex)}</div>
            </div>`;
        }
    }

    return `<div class="h-full min-h-[297mm] flex flex-col">
        <div class="px-12 pt-12 pb-9 text-white bg-gradient-to-l ${c.grad}">
            <div class="flex items-center gap-5">
                <div class="w-20 h-20 rounded-2xl bg-white/10 ring-1 ring-white/25 grid place-items-center font-display font-black text-3xl shrink-0">${esc(initials(p.name))}</div>
                <div>
                    <h1 class="font-display font-black text-[34px] leading-none">${esc(p.name) || 'השם שלך'}</h1>
                    <p class="text-base text-white/80 mt-1.5">${esc(p.title) || 'כותרת מקצועית'}</p>
                </div>
            </div>
            ${contactHtml}
        </div>
        <div class="px-12 pt-9 pb-12 flex-1">
            ${body}
        </div>
    </div>
    ${renderWatermark(data.settings.watermark)}`;
}
