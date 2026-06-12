/**
 * Internationalization Module
 * Hebrew-first, with infrastructure for future English support.
 */

const strings = {
    he: {
        app: {
            title: 'קורות חיים בקליק',
            subtitle: 'מחולל קורות חיים חינמי בעברית — בזמן אמת',
            badge: 'שמירה מקומית · מדידה אנונימית מוכנה'
        },
        actions: {
            saveDraft: 'שמירת טיוטה',
            loadDraft: 'טעינת טיוטה',
            fullPreview: 'תצוגה מלאה',
            backToEdit: 'חזרה לעריכה',
            downloadPdf: 'הורדה כ-PDF',
            printPdf: 'הדפסה (PDF עם טקסט)',
            exportJson: 'ייצוא JSON',
            importJson: 'ייבוא JSON',
            demos: 'דוגמאות',
            reset: 'איפוס',
            add: 'הוסף',
            remove: 'מחק'
        },
        editor: {
            editTab: 'עריכת פרטים',
            previewTab: 'תצוגה מקדימה',
            intro: 'מלאו את הפרטים והם יתעדכנו מיד בתצוגה המקדימה. הטיוטה נשמרת בדפדפן המקומי בלבד.',
            designTitle: 'עיצוב וצבעים',
            templateLabel: 'תבנית',
            colorLabel: 'צבע ראשי',
            watermarkLabel: 'חותמת "קורות חיים בקליק"',
            watermarkDesc: 'לוגו קטן ועדין בתחתית, לא חלק מרכזי מהמסמך',
            personalTitle: 'פרטים אישיים',
            sectionsTitle: 'סקציות מותאמות',
            sectionsDesc: 'בחרו אילו סקציות להציג וגררו לשינוי סדר',
            skillsHint: 'מופרדות בפסיקים (,)',
            skillsPlaceholder: 'React, Node.js, ניהול זמן, עבודת צוות'
        },
        personal: {
            name: 'שם מלא',
            title: 'כותרת מקצועית',
            phone: 'טלפון',
            email: 'אימייל',
            location: 'עיר / מיקום',
            linkedin: 'לינקדאין',
            website: 'אתר / תיק עבודות',
            github: 'GitHub (אופציונלי)',
            about: 'תקציר מקצועי'
        },
        placeholders: {
            name: 'ישראל ישראלי',
            title: 'מפתח/ת Full Stack',
            phone: '050-1234567',
            email: 'name@email.com',
            location: 'תל אביב',
            linkedin: 'linkedin.com/in/...',
            website: 'my-portfolio.dev',
            github: 'github.com/...',
            about: 'פסקה קצרה וממוקדת על הניסיון, החוזקות והשאיפות שלך...'
        },
        templates: {
            modern: 'מודרני (שני טורים)',
            classic: 'קלאסי (סריף אלגנטי)',
            minimal: 'מינימליסטי נקי',
            banner: 'כותרת רחבה (באנר)',
            executive: 'ניהולי (סרגל בהיר)',
            compact: 'קומפקטי (טור צפוף)'
        },
        colors: {
            indigo: 'כחול אינדיגו',
            teal: 'טורקיז',
            rose: 'בורדו',
            emerald: 'ירוק יער',
            amber: 'חום–זהב',
            slate: 'פחם'
        },
        status: {
            draftSaved: 'הטיוטה נשמרה בדפדפן הזה בלבד',
            draftLoaded: 'הטיוטה נטענה מהדפדפן המקומי',
            draftNotFound: 'לא נמצאה טיוטה שמורה',
            saveFailed: 'לא ניתן היה לשמור את הטיוטה',
            loadFailed: 'לא ניתן היה לטעון את הטיוטה',
            preparingPdf: 'מכין PDF איכותי...',
            exportFailed: 'הייצוא נכשל. נסו להפחית מעט תוכן או לבחור תבנית קומפקטית יותר.',
            preparingImage: 'מכין תמונה...',
            imageFailed: 'ייצוא התמונה נכשל. נסו שוב או בחרו PDF.',
            autoLoaded: 'נטענה טיוטה מקומית אחרונה',
            pageCount: (n) => n > 1 ? `${n} עמודי A4` : 'עמוד A4 אחד',
            multiPage: (n) => `התוכן צפוי להתפרס על ${n} עמודי A4. הייצוא יתאים את הגובה אוטומטית.`
        },
        cv: {
            aboutTitle: 'תקציר מקצועי',
            experienceTitle: 'ניסיון תעסוקתי',
            educationTitle: 'השכלה',
            militaryTitle: 'שירות צבאי / לאומי',
            volunteeringTitle: 'התנדבות',
            projectsTitle: 'פרויקטים',
            certificationsTitle: 'הסמכות ותעודות',
            skillsTitle: 'מיומנויות',
            languagesTitle: 'שפות',
            contactTitle: 'פרטי קשר',
            yourName: 'השם שלך',
            yourTitle: 'כותרת מקצועית',
            watermark: 'נוצר עם קורות חיים בקליק'
        },
        languageLevels: {
            native: 'שפת אם',
            fluent: 'שוטף',
            good: 'טוב',
            basic: 'בסיסי'
        }
    }
};

let currentLang = 'he';

export function setLanguage(lang) {
    currentLang = lang;
}

export function t(path) {
    const keys = path.split('.');
    let val = strings[currentLang];
    for (const k of keys) {
        if (!val) return path;
        val = val[k];
    }
    return val ?? path;
}

export function getLang() {
    return currentLang;
}

export function getDir() {
    return currentLang === 'he' ? 'rtl' : 'ltr';
}
