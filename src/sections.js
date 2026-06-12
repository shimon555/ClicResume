/**
 * Section Registry
 * Defines all available CV sections: built-in and custom.
 * Each section has: id, label, icon, fields, itemDefaults.
 */

import {
    EXPERIENCE_ITEM, EDUCATION_ITEM, MILITARY_ITEM,
    VOLUNTEERING_ITEM, PROJECT_ITEM, CERTIFICATION_ITEM
} from './cv-data.js';

/** All available section definitions */
export const SECTION_DEFS = {
    about: {
        id: 'about',
        label: 'תקציר מקצועי',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
        type: 'text', // special: just a textarea, not a list
        dataKey: null  // uses personal.about
    },
    experience: {
        id: 'experience',
        label: 'ניסיון תעסוקתי',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.645-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"/>`,
        type: 'list',
        dataKey: 'experience',
        itemDefaults: EXPERIENCE_ITEM,
        fields: [
            { key: 'company', label: 'חברה / מעסיק', span: 1 },
            { key: 'role', label: 'תפקיד', span: 1 },
            { key: 'period', label: 'תקופה', span: 1, placeholder: '2020 - היום' },
            { key: 'description', label: 'תיאור והישגים (כל שורה = בולט)', span: 2, type: 'textarea', rows: 3, placeholder: 'הובלת צוות של 4 מפתחים\nשיפור ביצועים ב-35%' }
        ],
        addLabel: 'הוסף משרה',
        emptyLabel: 'אין משרות עדיין — לחצו על "הוסף משרה".'
    },
    education: {
        id: 'education',
        label: 'השכלה וקורסים',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>`,
        type: 'list',
        dataKey: 'education',
        itemDefaults: EDUCATION_ITEM,
        fields: [
            { key: 'institution', label: 'מוסד לימודים', span: 1 },
            { key: 'degree', label: 'תואר / תעודה', span: 1 },
            { key: 'period', label: 'תקופה', span: 1 },
            { key: 'description', label: 'פרטים נוספים', span: 2, type: 'text' }
        ],
        addLabel: 'הוסף לימודים',
        emptyLabel: 'אין לימודים עדיין — לחצו על "הוסף לימודים".'
    },
    military: {
        id: 'military',
        label: 'שירות צבאי / לאומי',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>`,
        type: 'list',
        dataKey: 'military',
        itemDefaults: MILITARY_ITEM,
        fields: [
            { key: 'unit', label: 'יחידה / מסגרת', span: 1 },
            { key: 'role', label: 'תפקיד', span: 1 },
            { key: 'period', label: 'תקופה', span: 1 },
            { key: 'description', label: 'תיאור', span: 2, type: 'textarea', rows: 2 }
        ],
        addLabel: 'הוסף שירות',
        emptyLabel: 'אין שירות עדיין — לחצו על "הוסף שירות".'
    },
    volunteering: {
        id: 'volunteering',
        label: 'התנדבות',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`,
        type: 'list',
        dataKey: 'volunteering',
        itemDefaults: VOLUNTEERING_ITEM,
        fields: [
            { key: 'organization', label: 'ארגון', span: 1 },
            { key: 'role', label: 'תפקיד', span: 1 },
            { key: 'period', label: 'תקופה', span: 1 },
            { key: 'description', label: 'תיאור', span: 2, type: 'textarea', rows: 2 }
        ],
        addLabel: 'הוסף התנדבות',
        emptyLabel: 'אין התנדבות עדיין — לחצו על "הוסף התנדבות".'
    },
    projects: {
        id: 'projects',
        label: 'פרויקטים',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
        type: 'list',
        dataKey: 'projects',
        itemDefaults: PROJECT_ITEM,
        fields: [
            { key: 'name', label: 'שם הפרויקט', span: 1 },
            { key: 'technologies', label: 'טכנולוגיות', span: 1 },
            { key: 'link', label: 'קישור (אופציונלי)', span: 1 },
            { key: 'description', label: 'תיאור', span: 2, type: 'textarea', rows: 2 }
        ],
        addLabel: 'הוסף פרויקט',
        emptyLabel: 'אין פרויקטים עדיין — לחצו על "הוסף פרויקט".'
    },
    certifications: {
        id: 'certifications',
        label: 'הסמכות ותעודות',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>`,
        type: 'list',
        dataKey: 'certifications',
        itemDefaults: CERTIFICATION_ITEM,
        fields: [
            { key: 'name', label: 'שם ההסמכה', span: 1 },
            { key: 'issuer', label: 'גוף מנפיק', span: 1 },
            { key: 'date', label: 'תאריך', span: 1 },
            { key: 'description', label: 'פרטים נוספים', span: 2, type: 'text' }
        ],
        addLabel: 'הוסף הסמכה',
        emptyLabel: 'אין הסמכות עדיין — לחצו על "הוסף הסמכה".'
    },
    skills: {
        id: 'skills',
        label: 'מיומנויות וכלים',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>`,
        type: 'skills', // special: comma-separated input
        dataKey: 'skills'
    },
    languages: {
        id: 'languages',
        label: 'שפות',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>`,
        type: 'languages', // special: name + level pairs
        dataKey: 'languages'
    }
};

/** All available section IDs */
export const ALL_SECTION_IDS = Object.keys(SECTION_DEFS);

/** Default sections shown for a new CV */
export const DEFAULT_VISIBLE = ['about', 'experience', 'education', 'skills', 'languages'];

/** Default ordering */
export const DEFAULT_ORDER = ['about', 'experience', 'education', 'military', 'volunteering', 'projects', 'certifications', 'skills', 'languages'];

/** Get label for a section */
export function getSectionLabel(id) {
    return SECTION_DEFS[id]?.label || id;
}

/** Get SVG icon path for a section */
export function getSectionIcon(id) {
    return SECTION_DEFS[id]?.icon || '';
}
