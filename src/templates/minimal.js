/**
 * Minimal Template — Clean, no-frills, grid-based timeline
 */
import { esc, colors, renderContactList, renderItemList, renderSkillChips, renderLanguages, sectionHeading, renderWatermark, getOrderedSections, sectionHasData, CV_SECTION_LABELS, hasBullets, descLines } from './base.js';

function renderGridItems(items, colorHex) {
    return items.map(item => {
        const title = item.role || item.degree || item.name || '';
        const subtitle = item.company || item.institution || item.unit || item.organization || item.issuer || '';
        const period = item.period || item.date || '';
        const desc = item.description || '';

        let descHtml = '';
        if (desc && hasBullets(desc)) {
            descHtml = `<ul class="space-y-1">${descLines(desc).map(l =>
                `<li class="flex gap-2 text-[12px] text-slate-600 leading-snug"><span class="text-slate-300">—</span><span>${esc(l)}</span></li>`
            ).join('')}</ul>`;
        } else if (desc) {
            descHtml = `<p class="text-[12px] text-slate-600 leading-relaxed">${esc(desc)}</p>`;
        }

        const techLine = item.technologies ? `<p class="text-[11px] text-slate-500 mb-1">${esc(item.technologies)}</p>` : '';

        return `<div class="grid grid-cols-4 gap-3">
            <div class="col-span-1 text-[11px] text-slate-400 ltr text-right">${esc(period)}</div>
            <div class="col-span-3">
                <h4 class="text-[13px] font-bold text-slate-900">${esc(title)}</h4>
                ${subtitle ? `<p class="text-[12px] font-medium text-slate-500 mb-1.5">${esc(subtitle)}</p>` : ''}
                ${techLine}${descHtml}
            </div>
        </div>`;
    }).join('');
}

export function render(data) {
    const c = colors(data.settings.color);
    const sections = getOrderedSections(data);
    const p = data.personal;

    const contactItems = renderContactList(p, 'stack');
    const contactHtml = contactItems.length
        ? `<div class="text-[11.5px] text-slate-500 space-y-0.5 text-left shrink-0">${contactItems.join('')}</div>`
        : '';

    let body = '';
    for (const sid of sections) {
        if (!sectionHasData(data, sid)) continue;
        const label = CV_SECTION_LABELS[sid] || sid;

        if (sid === 'about') {
            body += `<p class="text-[13px] text-slate-600 leading-relaxed mb-9 max-w-2xl">${esc(p.about)}</p>`;
        } else if (sid === 'skills') {
            body += `<div class="mb-9">
                ${sectionHeading(label, data.settings.color, 'uppercase')}
                <div class="flex flex-wrap gap-1.5">${renderSkillChips(data.skills, data.settings.color)}</div>
            </div>`;
        } else if (sid === 'languages') {
            body += `<div class="mb-9">
                ${sectionHeading(label, data.settings.color, 'uppercase')}
                <ul class="space-y-1.5 text-[12px]">${renderLanguages(data.languages)}</ul>
            </div>`;
        } else {
            body += `<div class="mb-9">
                ${sectionHeading(label, data.settings.color, 'uppercase')}
                <div class="space-y-5">${renderGridItems(data[sid] || [], c.hex)}</div>
            </div>`;
        }
    }

    return `<div class="px-14 pt-20 pb-14 h-full min-h-[297mm]">
        <div class="flex justify-between items-start gap-6 mb-10">
            <div class="border-r-4 pr-4 ${c.border}">
                <h1 class="text-[38px] font-display font-black leading-none tracking-tight text-slate-900">${esc(p.name) || 'השם שלך'}</h1>
                <p class="text-sm font-semibold tracking-wide mt-1 ${c.text}">${esc(p.title) || 'כותרת מקצועית'}</p>
            </div>
            ${contactHtml}
        </div>
        ${body}
    </div>
    ${renderWatermark(data.settings.watermark)}`;
}
