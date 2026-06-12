# Architecture

## סקירה כללית

הפרויקט הוא אפליקציה סטטית שרצה בדפדפן בלבד. אין שרת, אין build step חובה. הקוד מאורגן כ-ES modules שנטענים דרך `<script type="module">`.

**חשוב**: לפיתוח מקומי יש להפעיל שרת HTTP (כמו `npx serve` או VS Code Live Server), כי ES modules לא עובדים מ-`file://`.

## שכבות המערכת

### 1. מודל נתונים (`src/cv-data.js`)
- סכימת CV מרכזית: `personal`, `experience`, `education`, `military`, `volunteering`, `projects`, `certifications`, `skills`, `languages`.
- הגדרות ברירת מחדל לכל סוג פריט.
- מפת צבעים (`COLOR_MAP`) עם 6 ערכות צבעים.
- פונקציות `snapshot` / `restoreSnapshot` להמרה אל ומ-JSON.

### 2. רישום סקציות (`src/sections.js`)
- כל סקציה מוגדרת ב-`SECTION_DEFS` עם: מזהה, תווית, אייקון, שדות, ברירות מחדל.
- סקציות מובנות: ניסיון, השכלה, שירות צבאי, התנדבות, פרויקטים, הסמכות.
- סקציות מיוחדות: תקציר (טקסט חופשי), מיומנויות (פסיקים), שפות (זוגות שם+רמה).

### 3. תבניות CV (`src/templates/`)
- כל תבנית היא פונקציית render טהורה: `(data) => htmlString`.
- קומפוננטות משותפות ב-`base.js`: יצירת קשר, רשימת פריטים, מיומנויות, שפות, כותרות סקציה.
- 6 תבניות: modern, classic, minimal, banner, executive, compact.
- `index.js` מרכז את כולן ומייצא `renderCV(theme, data)`.

### 4. ייצוא (`src/export/`)
- `pdf.js` — ייצוא PDF איכותי עם html2canvas + jsPDF. כולל חיתוך חכם בין עמודים.
- `image.js` — ייצוא PNG / JPEG.
- `json-io.js` — ייבוא/ייצוא JSON לגיבוי ושיתוף.
- `window.print()` — אפשרות הדפסה ל-PDF עם טקסט ניתן לבחירה.

### 5. אחסון (`src/storage.js`)
- שמירה וטעינה מ-`localStorage`.
- מיגרציה אוטומטית מגרסה v2 ל-v3.
- autosave כל 650ms.

### 6. Analytics (`src/analytics.js`)
- שכבת events אנונימית, כבויה כברירת מחדל.
- תומכת ב-GA4 או endpoint מותאם.
- אף פעם לא שולחת תוכן CV.

### 7. i18n (`src/i18n.js`)
- תשתית בסיסית לתמיכה רב-שפתית.
- כל המחרוזות מרוכזות במקום אחד.
- עברית מלאה, אנגלית — תשתית מוכנה.

### 8. עזרי כתיבה (`src/writing-tips.js`)
- טיפים לכתיבה לפי סקציה.
- ולידציות: אימייל, טלפון, אורך תקציר, ניסיון ללא תיאור.

### 9. סידור סקציות (`src/drag-sort.js`)
- Drag & Drop עם HTML5 API.
- כפתורי חצים כחלופה.
- המשתמש בוחר אילו סקציות להציג ובאיזה סדר.

### 10. אפליקציה ראשית (`src/app.js`)
- רושם Alpine.js component `cvApp`.
- מייבא את כל המודולים ומחבר ביניהם.
- ה-HTML בתצוגה המקדימה מרונדר דרך `x-html="renderedCV"`.

## מבנה קבצים

```
.
├── index.html              # Shell — HTML structure + Alpine bindings
├── src/
│   ├── app.js              # Alpine component registration
│   ├── cv-data.js          # Data model & defaults
│   ├── sections.js         # Section registry
│   ├── storage.js          # localStorage persistence
│   ├── analytics.js        # Anonymous analytics
│   ├── i18n.js             # Internationalization
│   ├── writing-tips.js     # Tips & validation
│   ├── drag-sort.js        # Drag & drop ordering
│   ├── templates/
│   │   ├── index.js        # Template registry
│   │   ├── base.js         # Shared rendering utilities
│   │   ├── modern.js       # Modern two-column
│   │   ├── classic.js      # Classic serif
│   │   ├── minimal.js      # Minimalist grid
│   │   ├── banner.js       # Wide banner header
│   │   ├── executive.js    # Executive sidebar
│   │   └── compact.js      # Compact dense
│   ├── export/
│   │   ├── pdf.js          # PDF export
│   │   ├── image.js        # PNG/JPEG export
│   │   └── json-io.js      # JSON import/export
│   └── styles/
│       ├── app.css         # Editor styles
│       └── cv.css          # CV preview & print styles
├── demos/
│   ├── data-scientist.json
│   ├── marketing.json
│   ├── nurse.json
│   └── accountant.json
├── assets/
│   ├── logo.svg
│   └── logo-mark.svg
├── docs/
└── .github/
```

## טכנולוגיות

- **Alpine.js 3** — ריאקטיביות וניהול מצב
- **Tailwind CSS (CDN)** — עיצוב
- **html2canvas + jsPDF** — ייצוא PDF ותמונה
- **ES Modules** — מודולריות ללא build
- **Google Fonts** — Assistant, Heebo, Frank Ruhl Libre

## פרטיות

ברירת המחדל: אין שרת, אין איסוף נתונים. Analytics כבוי עד שמוגדר endpoint. תוכן CV נשאר בדפדפן.

## תמיכה באנגלית בעתיד

התשתית מוכנה ב-`i18n.js`. הוספת אנגלית דורשת: תרגום מחרוזות, שינוי כיוון ל-LTR, התאמת תבניות, ובדיקת ייצוא.
