Melodia — Музичний щоденник для уроків
Правила для Claude Code

Після кожної зміни в коді — онови цей файл CLAUDE.md, щоб він відображав поточний стан проєкту: нові поля, нові фічі, зміни в структурі даних, зміни в UI.
НЕ змінюй структуру Firestore колекцій (шляхи, назви полів, вкладеність) без явного попередження користувачу — це може призвести до втрати даних.
Мова інтерфейсу — українська.
Мова спілкування з користувачем — українська.

Що це
Веб-додаток для обліку учнів та уроків музики. Mobile-first, iPhone-optimized. Одна сторінка HTML з Firebase backend.
Технічний стек

Frontend: Vanilla JS, HTML, CSS (single file index.html)
Backend: Firebase Firestore + Firebase Auth (Google)
Hosting: GitHub Pages (zayika-lab.github.io/melodia)
Firebase project: melodia-6b440
Google Calendar API: автоматичне створення/оновлення/видалення подій

Структура даних (Firestore)
users/{userId}/students/{studentId}
{
  name: string,
  emoji: string,
  defaultDuration: number (хвилини),
  defaultPrice: number (євро),
  messengerType: "whatsapp" | "telegram" | "facebook" | "imessage" | null,
  messengerContact: string | null,
  createdAt: timestamp
}
users/{userId}/lessons/{lessonId}
{
  studentId: string,
  studentName: string,
  studentEmoji: string,
  date: "YYYY-MM-DD",
  time: "HH:mm",
  duration: number (хвилини),
  price: number (євро),
  status: "planned" | "completed" | "paid",
  calendarEventId: string | null,
  createdAt: timestamp
}
users/{userId}/settings/app
{
  reminderMinutes: number (за замовчуванням 30)
}
Архітектура UI

4 вкладки (bottom nav): Головна, Розклад, Учні, Інше
Modal/bottom sheet для форм додавання/редагування
Статуси уроків: Заплановано → Відбувся → Сплачено (циклічне перемикання натисканням)
При додаванні уроку — пропонуються учні з того ж дня минулого тижня

Дизайн

Пастельно-голубі тони, warm rose акценти
Шрифти: Playfair Display (заголовки), DM Sans (тіло)
Mobile-first, iPhone-safe-area підтримка

Мова інтерфейсу
Українська
