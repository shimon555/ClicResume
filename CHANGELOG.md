# יומן שינויים — ClicResume

## יוני 2026 — נגישות

### נגישות (תקן 5568 / WCAG 2.1 AA)
- **ווידג'ט נגישות** (`src/accessibility.js`) — כפתור ♿ קבוע בפינה השמאלית התחתונה עם: הגדלת/הקטנת גופן, ניגודיות גבוהה, גופן קריא, עצירת אנימציות, הדגשת קישורים, סמן גדול, ריווח שורות. העדפות נשמרות ב-localStorage. משפיע על ממשק העריכה בלבד, לא על התצוגה המקדימה או PDF
- **הצהרת נגישות** (`accessibility.html`) — דף סטטי בעברית עם: רמת תאימות, התאמות הנגישות, דפדפנים וטכנולוגיות מסייעות נתמכות, מגבלות ידועות, פרטי יצירת קשר
- **לינק בפוטר** — קישור "♿ נגישות" בפוטר דף הבית
- הווידג'ט פעיל בכל הדפים: דף נחיתה, בונה, הצהרת נגישות

---

## יוני 2026 — עדכון מרכזי

### מבנה האתר
- **דף נחיתה חדש** (`index.html`) — עמוד מודרני עם אנימציות, חלקיקים, צורות גיאומטריות, ואפקטי זוהר. כולל: hero, יתרונות (6 כרטיסים), תצוגת תבניות (6 mockups), "איך זה עובד" (3 שלבים), חזון ומפת דרכים, שאלות נפוצות (אקורדיון), CTA סופי
- **הבונה עבר ל-`builder.html`** — הופרד מדף הבית. הלוגו בבונה מקשר חזרה לדף הנחיתה
- **דף פרטיות חדש** (`privacy.html`) — מדיניות פרטיות מלאה בעברית, כולל סעיף זכויות לפי GDPR

### תיקוני באגים
- **חתימה כפולה**: תבנית modern הציגה שתי חתימות — הוסרה הכפילות מ-`modern.js`, החתימה תמיד מוצגת דרך `renderWatermark()` ב-`base.js`
- **אפשרות הסרת חתימה**: הוסרה — החתימה תמיד מוצגת
- **באג גלילה בפאנל העריכה**: תוקן — שרשרת גובה CSS מלאה (`h-screen` → `min-h-0` → `overflow-hidden`) מונעת דליפת תוכן מחוץ ל-viewport
- **לינק GitHub שבור**: תוקן ל-`github.com/shimon555/ClicResume`

### טיפים
- **טיפ כבועת דיבור**: לחיצה על "טיפ" מציגה tooltip קופץ מתחת לכפתור (במקום טקסט בראש הדף). סגנון חדש `.tip-popover` ב-`app.css`

### מיתוג ופוטר
- **קרדיט LHU Tech**: פוטר בשני הדפים — "נבנה ע״י" עם לוגו וקישור ל-`it.lhucorp.com`
- **רקע אנימטיבי**: חלקיקים צפים, צורות SVG גיאומטריות, כדורי זוהר, רשת overlay, אפקטי shimmer — הכל CSS בלבד, בלי תלויות חיצוניות

### אנליטיקס ופרטיות
- **Google Analytics 4**: סניפט gtag.js מוטמע סטטית עם **consent mode v2** — ברירת מחדל `denied`, נתונים נאספים רק אחרי הסכמה מפורשת
- **Vercel Web Analytics**: תשתית מוכנה ב-`analytics.js`, נטען אחרי הסכמה
- **Vercel Speed Insights**: תשתית מוכנה, נתוני ביצועים לא-אישיים — לא דורש הסכמה
- **Custom endpoint**: תשתית מוכנה ב-`analytics.js` עם sendBeacon/fetch
- **מודול analytics.js**: נכתב מחדש — consent management, GA4 init, Vercel init, Speed Insights, track events, autoInit

### באנר הסכמה (GDPR-compliant)
- מופיע בשני הדפים בביקור ראשון
- שני כפתורים שווים: "אישור" / "דחייה" — משקל ויזואלי זהה
- הטקסט מסביר בדיוק מה נאסף (סטטיסטיקות בלבד) ומה לא (מידע אישי, תוכן קורות חיים)
- מצוין שהאתר עובד מלא גם ללא cookies
- קישור לדף פרטיות מלא
- הבחירה נשמרת ב-localStorage (`clicresume_analytics_consent`)

### באנר מובייל
- מופיע בשני הדפים למסכים קטנים (md:hidden)
- "האתר מותאם כרגע למחשב. תצוגת מובייל בפיתוח"
- ניתן לסגירה עם X

### תיעוד
- `ANALYTICS.md` — עודכן: טבלת ספקים, זרימת consent, אירועים, קבצים רלוונטיים, הוראות הפעלה
- `CHANGELOG.md` — קובץ זה

---

## סטטוס נוכחי

### מה עובד
- דף נחיתה מלא עם אנימציות
- בונה קורות חיים עם 6 תבניות ו-6 ערכות צבעים
- ייצוא PDF, PNG, JPEG, JSON
- שמירה/טעינה מקומית עם autosave
- טיפים לכתיבה כבועות דיבור
- דוגמאות מקצועיות (4 מקצועות)
- GA4 עם consent mode v2
- באנר הסכמה תקני (GDPR)
- באנר מובייל
- דף פרטיות

### מה צריך להפעיל
- [ ] Vercel Web Analytics — להפעיל ב-Vercel Dashboard, להסיר comment ב-`analytics.js` (`configure({ vercelAnalytics: true })`)
- [ ] Vercel Speed Insights — להפעיל ב-Vercel Dashboard, להסיר comment ב-`index.html` ו-`analytics.js`

### מה מתוכנן (מתוך ROADMAP.md)
- שיפור תצוגת מובייל
- טיפים מתקדמים לפי שדה
- תמיכה באנגלית ו-LTR
- תבניות נוספות מותאמות לענפים
- PDF עם טקסט ניתן לבחירה (pdfmake)
- ייצוא DOCX
- דשבורד סטטיסטיקות (פרטי/ציבורי — טרם הוחלט)
- שיפור נגישות (ARIA, focus management)
- דף "איך לכתוב קורות חיים טובים"

### מבנה קבצים עדכני

```
index.html          # דף נחיתה (עמוד ראשי)
builder.html        # בונה קורות החיים
privacy.html        # מדיניות פרטיות
src/
  app.js            # Alpine component ראשי
  analytics.js      # מודול אנליטיקס (consent, GA4, Vercel, tracking)
  cv-data.js        # מודל נתונים
  sections.js       # הגדרות סקציות
  writing-tips.js   # טיפים לכתיבה
  drag-sort.js      # drag & drop סקציות
  storage.js        # localStorage שמירה/טעינה
  templates/        # 6 תבניות CV (modern, classic, minimal, banner, executive, compact)
    base.js         # קומפוננטות משותפות + watermark
    index.js        # טעינת תבניות
  export/           # ייצוא PDF / תמונה / JSON
  styles/
    app.css         # סגנונות עורך (tip-popover, drag, validation)
    cv.css          # סגנונות קורות חיים
demos/              # דוגמאות JSON (data-scientist, marketing, nurse, accountant)
assets/             # לוגו, favicon, מיתוג
ANALYTICS.md        # תיעוד אנליטיקס
ARCHITECTURE.md     # תיעוד ארכיטקטורה
PRIVACY.md          # תיעוד פרטיות (קוד מקור)
ROADMAP.md          # מפת דרכים
CONTRIBUTING.md     # הנחיות תרומה
CHANGELOG.md        # יומן שינויים (קובץ זה)
LICENSE             # MIT
```
