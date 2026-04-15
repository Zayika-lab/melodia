# Melodia — Музичний щоденник для уроків

## Що це

Веб-додаток для обліку учнів та уроків музики. Mobile-first, iPhone-optimized. Одна сторінка HTML з Firebase backend.

## Технічний стек

- **Frontend:** Vanilla JS, HTML, CSS (single file `index.html`)
- **Backend:** Firebase Firestore + Firebase Auth (Google)
- **Hosting:** GitHub Pages (zayika-lab.github.io/melodia)
- **Firebase project:** `melodia-6b440`
- **Google Calendar API:** автоматичне створення/оновлення/видалення подій

## Структура даних (Firestore)

### `users/{userId}/students/{studentId}`

```js
{
  name: string,
  emoji: string,
  defaultDuration: number,        // хвилини
  defaultPrice: number,           // євро
  messengerType: "whatsapp" | "telegram" | "facebook" | "imessage" | null,
  messengerContact: string | null,
  createdAt: timestamp
}
```

### `users/{userId}/lessons/{lessonId}`

```js
{
  studentId: string,
  studentName: string,
  studentEmoji: string,
  date: "YYYY-MM-DD",
  time: "HH:mm",
  duration: number,               // хвилини
  price: number,                  // євро
  status: "planned" | "completed" | "paid",
  calendarEventId: string | null,
  createdAt: timestamp
}
```

### `users/{userId}/settings/app`

```js
{
  reminderMinutes: number         // за замовчуванням 30
}
```

## ⚠️ КРИТИЧНО ВАЖЛИВО

**НЕ змінюй структуру Firestore колекцій без явного попередження.** Будь-які зміни шляхів, назв полів або вкладеності можуть призвести до втрати доступу до існуючих даних.

Firestore rules: per-user read/write (`request.auth.uid == userId`).

## Архітектура UI

- 4 вкладки (bottom nav): **Головна**, **Розклад**, **Учні**, **Інше**
- Modal/bottom sheet для форм додавання/редагування
- Статуси уроків: **Заплановано → Відбувся → Сплачено** (циклічне перемикання натисканням)
- При додаванні уроку — пропонуються учні з того ж дня минулого тижня

## Дизайн

- Пастельно-голубі тони, warm rose акценти
- Шрифти: **Playfair Display** (заголовки), **DM Sans** (тіло)
- Mobile-first, iPhone-safe-area підтримка

## Мова інтерфейсу

Українська
