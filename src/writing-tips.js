/**
 * Writing Tips & Validation
 * Provides contextual writing guidance and content validation.
 */

/** Tips per section/field */
const TIPS = {
    about: {
        label: 'תקציר מקצועי',
        tips: [
            '2-4 משפטים ממוקדים. ציינו שנות ניסיון, תחום התמחות ומה מייחד אתכם.',
            'התחילו עם התפקיד או התחום, לא עם "אני...".',
            'הימנעו ממילות סרק כמו "דינמי", "מוטיבציה" — השתמשו בעובדות.'
        ]
    },
    experience: {
        label: 'ניסיון תעסוקתי',
        tips: [
            'התחילו כל נקודה בפועל פעיל: הובלתי, פיתחתי, שיפרתי, ניהלתי.',
            'הוסיפו מספרים: "שיפור ביצועים ב-35%", "ניהול צוות של 8 אנשים".',
            'התמקדו בהישגים, לא רק בתחומי אחריות.',
            'סדרו מהתפקיד האחרון לראשון (כרונולוגי הפוך).'
        ]
    },
    education: {
        label: 'השכלה',
        tips: [
            'ציינו תואר מלא, מוסד ותקופה.',
            'אם סיימתם בהצטיינות — ציינו.',
            'קורסים רלוונטיים שווים ציון רק אם הם ממוקדים לתפקיד.'
        ]
    },
    military: {
        label: 'שירות צבאי / לאומי',
        tips: [
            'התמקדו בתפקידי ניהול, אחריות או מומחיות רלוונטית.',
            'אם השירות לא רלוונטי לתפקיד — שורה אחת מספיקה.',
            'סמנו "מסווג" רק אם באמת צריך — אחרת תארו במונחים כלליים.'
        ]
    },
    volunteering: {
        label: 'התנדבות',
        tips: [
            'התנדבות רלוונטית מוכיחה מיומנויות רכות: מנהיגות, תקשורת, יוזמה.',
            'ציינו ארגון, תפקיד ותרומה מדידה אם אפשר.'
        ]
    },
    projects: {
        label: 'פרויקטים',
        tips: [
            'פרויקטים אישיים רלוונטיים מחזקים את הפרופיל — במיוחד למתחילים.',
            'ציינו טכנולוגיות, תוצאות, וקישור אם זמין.'
        ]
    },
    certifications: {
        label: 'הסמכות',
        tips: [
            'הסמכות מקצועיות מראות למעסיק השקעה מתמשכת בפיתוח.',
            'ציינו גוף מנפיק ותאריך — הסמכות ישנות פחות משכנעות.'
        ]
    },
    skills: {
        label: 'מיומנויות',
        tips: [
            'שלבו מיומנויות טכניות וכלליות.',
            'התאימו לדרישות המשרה — לא רשימה כללית.',
            '6-12 מיומנויות הן טווח טוב. מעל 15 מדלל את ההשפעה.'
        ]
    },
    languages: {
        label: 'שפות',
        tips: [
            'ציינו רמה כנה: שפת אם, שוטף, טוב, בסיסי.',
            'שפה נוספת ברמה טובה היא יתרון — אבל אל תנפחו רמות.'
        ]
    }
};

/** Content validation checks */
const VALIDATIONS = {
    emailFormat: (email) => {
        if (!email) return null;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'כתובת האימייל לא תקינה.';
        return null;
    },
    phoneFormat: (phone) => {
        if (!phone) return null;
        const digits = phone.replace(/[\s\-\(\)\.+]/g, '');
        if (digits.length < 9 || digits.length > 15) return 'מספר הטלפון נראה לא תקין.';
        return null;
    },
    aboutLength: (about) => {
        if (!about) return 'תקציר מקצועי ריק — כדאי לכתוב 2-4 משפטים ממוקדים.';
        if (about.length < 40) return 'התקציר קצר מאוד. נסו להוסיף עוד משפט או שניים.';
        if (about.length > 600) return 'התקציר ארוך מדי. נסו לקצר ל-3-4 משפטים.';
        return null;
    },
    experienceDescription: (items) => {
        const issues = [];
        items.forEach((item, i) => {
            if (item.role && !item.description) {
                issues.push(`משרה "${item.role}" — חסר תיאור והישגים.`);
            }
        });
        return issues.length ? issues : null;
    },
    missingName: (name) => {
        if (!name) return 'שם מלא הוא שדה חובה.';
        return null;
    }
};

/**
 * Get writing tips for a section.
 * @param {string} sectionId
 * @returns {{ label: string, tips: string[] } | null}
 */
export function getTips(sectionId) {
    return TIPS[sectionId] || null;
}

/**
 * Run all validations and return issues.
 * @param {object} data - CV data
 * @returns {{ field: string, message: string }[]}
 */
export function validate(data) {
    const issues = [];

    const nameIssue = VALIDATIONS.missingName(data.personal.name);
    if (nameIssue) issues.push({ field: 'name', message: nameIssue });

    const emailIssue = VALIDATIONS.emailFormat(data.personal.email);
    if (emailIssue) issues.push({ field: 'email', message: emailIssue });

    const phoneIssue = VALIDATIONS.phoneFormat(data.personal.phone);
    if (phoneIssue) issues.push({ field: 'phone', message: phoneIssue });

    const aboutIssue = VALIDATIONS.aboutLength(data.personal.about);
    if (aboutIssue) issues.push({ field: 'about', message: aboutIssue });

    const expIssues = VALIDATIONS.experienceDescription(data.experience);
    if (expIssues) expIssues.forEach(msg => issues.push({ field: 'experience', message: msg }));

    if (!data.experience.length && !data.education.length && !data.military.length) {
        issues.push({ field: 'general', message: 'כדאי להוסיף לפחות סקציה אחת של ניסיון, השכלה או שירות.' });
    }

    return issues;
}

/**
 * Get a random tip for a section.
 * @param {string} sectionId
 * @returns {string}
 */
export function getRandomTip(sectionId) {
    const section = TIPS[sectionId];
    if (!section || !section.tips.length) return '';
    return section.tips[Math.floor(Math.random() * section.tips.length)];
}
