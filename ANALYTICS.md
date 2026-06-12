# Analytics

קורות חיים בקליק כולל שכבת analytics אנונימית בצד הלקוח. היא כבויה כברירת מחדל עד שמגדירים endpoint.

## מה אפשר למדוד

- `page_view` - כניסה לאתר
- `cv_started` - משתמש התחיל למלא קורות חיים
- `cv_created` - נוצרו קורות חיים לפחות פעם אחת בסשן
- `cv_exported` - ייצוא PDF/PNG/JPEG
- `demo_loaded` - נטענה דוגמה
- `draft_saved` - נשמרה טיוטה ידנית
- `draft_cleared` - המשתמש איפס את הטופס

## מה לא נשלח

- שם
- אימייל
- טלפון
- מקום מגורים
- ניסיון תעסוקתי
- השכלה
- תוכן קורות החיים

## הפעלה

ב-`index.html` יש קונפיגורציה:

```js
window.CV_ANALYTICS_CONFIG = {
  enabled: false,
  provider: 'endpoint',
  endpoint: '',
  gaMeasurementId: '',
  siteId: 'korot-haim-beklik'
};
```

כדי להפעיל:

1. בוחרים ספק analytics או endpoint משלנו.
2. משנים את `enabled` ל-`true`.
3. אם משתמשים ב-endpoint, משאירים `provider: 'endpoint'` ומכניסים URL ב-`endpoint`.
4. אם משתמשים ב-GA4, משנים ל-`provider: 'ga4'` ומכניסים Measurement ID ב-`gaMeasurementId`.

## מבנה האירוע

```json
{
  "event": "cv_exported",
  "siteId": "korot-haim-beklik",
  "path": "/",
  "language": "he",
  "timestamp": "2026-06-11T00:00:00.000Z",
  "details": {
    "format": "pdf",
    "theme": "modern",
    "color": "indigo"
  }
}
```

## המלצה לפרסום ראשון

לשלב ראשון כדאי לבחור כלי privacy-friendly כמו Umami, Plausible או GoatCounter, או לבנות endpoint קטן משלנו בהמשך. GA4 נתמך בקונפיגורציה, אבל כדאי להפעיל אותו רק אחרי שמעדכנים מדיניות פרטיות בהתאם.
