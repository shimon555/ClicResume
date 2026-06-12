/**
 * Compact Template — Dense single column, grid timeline
 */
import { esc, colors, renderContactList, renderItemList, renderSkillChips, renderLanguages, sectionHeading, renderWatermark, getOrderedSections, sectionHasData, CV_SECTION_LABELS, hasBullets, descLines } from './base.js';

function renderCompactGrid(items, colorHex) {
    return items.map(item => {
        const title = item.role || item.degree || item.name || '';
        const subtitle = item.company || item.institution || item.unit || item.organization || item.issuer || '';
        const period = item.period || item.date || '';
        const desc = item.description || '';

        let descHtml = '';
        if (desc && hasBullets(desc)) {
            descHtml = `<ul class="space-y-0.5">${descLines(desc).map(l =>
                `<li class="flex gap-1.5 text-[11.5px] text-slate-600 leading-snug"><span style="color:${colorHex}">•</span><span>${esc(l)}</span></li>`
            ).join('')}</ul>`;
        } else if (desc) {
            descHtml = `<p class="text-[11.5px] text-slate-600 leading-snug">${esc(desc)}</p>`;
        }

        const techLine = item.technologies ? `<p class="text-[10.5px] text-slate-500 mb-0.5">${esc(item.technologies)}</p>` : '';

        return `<div class="grid grid-cols-4 gap-3">
            <div class="col-span-1 text-[10.5px] text-slate-400 ltr text-right pt-0.5">${esc(period)}</div>
            <div class="col-span-3">
                <h4 class="text-[12.5px] font-bold text-slate-800 leading-tight">${esc(title)}</h4>
                ${subtitle ? `<p class="text-[11.5px] font-semibold mb-1" style="color:${colorHex}">${esc(subtitle)}</p>` : ''}
                ${techLine}${descHtml}
            </div>
        </div>`;
    }).join('');
}

export function render(data) {
    const c = colors(data.settings.color);
    const sections = getOrderedSections(data);
    const p = data.personal;

    const contactItems = renderContactList(p, 'inline');
    const contactHtml = contactItems.length
        ? `<div class="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-slate-500 mt-2.5 font-sans">${contactItems.join('')}</div>`
        : '';

    let body = '';
    for (const sid of sections) {
        if (!sectionHasData(data, sid)) continue;
        const label = CV_SECTION_LABELS[sid] || sid;

        if (sid === 'about') {
            body += `<p class="text-[12px] text-slate-600 leading-relaxed mb-5">${esc(p.about)}</p>`;
        } else if (sid === 'skills') {
            body += `<div class="mb-5">
                ${sectionHeading(label, data.settings.color, 'compact-upper')}
                <p class="text-[11.5px] text-slate-700 leading-relaxed">${data.skills.map(s => esc(s)).join('  •  ')}</p>
            </div>`;
        } else if (sid === 'languages') {
            body += `<div class="mb-5">
                ${sectionHeading(label, data.settings.color, 'compact-upper')}
                <ul class="space-y-1 text-[11.5px]">${renderLanguages(data.languages)}</ul>
            </div>`;
        } else {
            body += `<div class="mb-5">
                ${sectionHeading(label, data.settings.color, 'compact-upper')}
                <div class="space-y-3.5">${renderCompactGrid(data[sid] || [], c.hex)}</div>
            </div>`;
        }
    }

    return `<div class="px-12 pt-14 pb-12 h-full min-h-[297mm]">
        <div class="pb-3 mb-5 border-b-2 ${c.border}">
            <h1 class="text-[30px] font-display font-black leading-none text-slate-900">${esc(p.name) || 'השם שלך'}</h1>
            <p class="text-[13px] font-semibold mt-1 ${c.text}">${esc(p.title) || 'כותרת מקצועית'}</p>
            ${contactHtml}
        </div>
        ${body}
    </div>
    ${renderWatermark(data.settings.watermark)}`;
}
