# Melodia — Музичний Щоденник

Прогресивна веб-аплікація (PWA) для управління музичними уроками.

## 📱 Архітектура

**Технології:**
- HTML5 + CSS3 + Vanilla JavaScript
- Firebase (Auth, Firestore)
- PWA з офлайн підтримкою

**Структура файлів:**
- `index.html` — монолітний файл з усією логікою
- `/memory/` — система пам'яті Claude Code

## 🎵 Основні функції

### Навігація (Bottom Navigation)
- 🏠 **Головна** — дашборд з сьогоднішніми уроками
- 📅 **Розклад** — тиждень/місяць/список (3 види в одному)
- 👥 **Учні** — управління студентами
- ⚙️ **Інше** — налаштування та заробіток

### Управління учнями
- Додавання учнів з емодзі, контактами
- Способи оплати: 💵 готівка, 💳 картка, 🅿️ PayPal
- Месенджери: WhatsApp, Telegram, Facebook, iMessage
- Стандартна тривалість та ціна
- Автозапам'ятовування останнього місця уроку (`lastLocation`)

### Управління уроками
- Створення уроків із студентами
- Статуси: заплановано → відбувся → сплачено
- Тривалість: 15-120 хв (кроки 5 хв)
- Способи оплати (успадковуються від учня)
- Місце: 🏠 Вдома або 🎹 В залі (успадковується з попереднього уроку учня)

### Робочі години
- Налаштування для кожного дня тижня
- Початок/кінець робочого дня
- Вмикання/вимикання днів

### Вертикальна шкала часу (денний вид)
- Межі шкали = початок/кінець робочих годин з налаштувань
- Уроки поза межами робочих годин автоматично розширюють шкалу
- **Синя полоса** = зайнятий час (урок)
- **Біла полоса** = вільний час (у межах робочих годин)
- **Розрив** (⋮) між уроком поза робочим часом та робочим діапазоном
- Часові мітки: межі сегментів, години, межі уроків

### Фінанси
- Кнопка "💰" в заголовку для швидкого доступу
- Модальне вікно "💰 Заробіток"
- Показники: день, тиждень, місяць
- Статистика сплачених/очікуваних

## 🎨 UI/UX

**Дизайн система:**
- M3 Material Design натхнення
- Кольорова палітра: блакитна основа
- Градієнти та backdrop-blur ефекти
- Responsive дизайн

**Компоненти:**
- Bottom sheets для форм
- Floating Action Button (FAB)
- Toast нотифікації
- Card компоненти
- Timeline віджети

## 📊 Стан даних

**Firestore колекції:**
```
users/{userId}/
  ├── students/       (+ lastLocation)
  ├── lessons/        (+ location)
  └── settings/
```

**Локальні змінні:**
- `students[]` — масив учнів
- `lessons[]` — масив уроків
- `settings{}` — налаштування користувача

## 🔧 Функції програми

### 📅 **Date/Time Utilities**
- `todayStr()` — поточна дата в YYYY-MM-DD
- `fmtDate(d)` — форматування Date об'єкту
- `parseDate(s)` — парсинг рядка дати
- `getWeekStart(d)` — початок тижня для дати
- `addDays(dateStr, n)` — додавання днів до дати
- `fmtDateUkr(dateStr)` — українське форматування дати
- `fmtDateFull(dateStr)` — повне форматування з днем тижня
- `fmtWeekRange(startStr)` — діапазон тижня для навігації

### 🔐 **Authentication & Firebase**
- `googleLogin()` — Google Sign-In через Firebase Auth
- `userRef()` — посилання на документ користувача
- `loadData()` — завантаження учнів, уроків, налаштувань
- `saveSettings(data)` — збереження налаштувань користувача

### 👥 **Student Management**
- `saveStudent(data, id)` — створення/оновлення учня
- `deleteStudent(id)` — видалення учня
- `confirmDeleteStudent(id)` — підтвердження видалення

### 🎵 **Lesson Management**
- `saveLesson(data, id)` — створення/оновлення уроку; синхронізує `student.lastLocation`
- `deleteLesson(id)` — видалення уроку
- `updateLessonStatus(id, newStatus)` — зміна статусу уроку
- `cycleStatus(id, newStatus)` — переключення статусу

### 🎨 **UI Rendering**
- `renderAll()` — рендеринг всіх видів
- `renderDashboard()` — головна сторінка
- `renderLessons()` — розклад (тиждень/місяць/список)
- `renderStudents()` — список учнів
- `renderSettings()` — налаштування
- `renderLessonCard(l, showDate)` — картка уроку
- `generateVerticalTimeScale(dateStr, dayLessons)` — вертикальна шкала з сегментами (робочі години + розширення для уроків поза межами, розриви між сегментами)
- `updateUnpaidBadge()` — badge несплачених уроків

### 🧭 **Navigation & Views**
- `switchView(view)` — переключення видів
- `toggleCalendarView(view)` — тиждень/місяць/список перемикач
- `prevWeek()` / `nextWeek()` — навігація тижнів
- `prevMonth()` / `nextMonth()` — навігація місяців
- `selectDay(d)` — вибір дня в календарі
- `selectDayFromList(dateStr)` — перехід до тижневого виду з списку
- `getMonthDays(monthStr)` — генерація днів місяця

### 💬 **Contact & Messaging**
- `getMessengerLink(type, contact)` — посилання на месенджер
- `getMessengerIcon(type)` — іконка месенджера
- `getMessengerClass(type)` — CSS клас месенджера
- `getContactButton(student, small)` — кнопка контакту

### 📝 **Modal & Form Handling**
- `closeModal()` — закриття модальних вікон
- `openStudentForm(id)` — форма учня (створення/редагування)
- `openAddLesson()` — додавання уроку
- `showLessonStudentPicker(date)` — вибір учня для уроку
- `openLessonForm(date, studentId, lessonId)` — форма уроку (включно з вибором місця)
- `openEditLesson(id)` — редагування уроку
- `confirmDeleteLesson(id)` — підтвердження видалення уроку
- `showUnpaid()` — модальне вікно несплачених уроків
- `openEarningsView()` — вікно заробітку

### 🎛️ **Event Handlers & Form Controls**
- `selectEmoji(btn, emoji)` — вибір емодзі
- `selectMessenger(btn, type)` — вибір месенджера
- `selectStudentPaymentMethod(btn, method)` — спосіб оплати учня
- `selectPaymentMethod(btn, method)` — спосіб оплати уроку
- `selectLessonLocation(btn, location)` — вибір місця уроку (`home` / `studio`)
- `submitStudent(id)` — збереження учня
- `submitLesson(studentId, lessonId)` — збереження уроку
- `updateReminder(val)` — оновлення нагадувань
- `updateWorkingHours(day, field, value)` — робочі години

## 🔧 Налаштування

**Firebase Config:**
- Project: melodia-6b440
- Auth: Google Sign-In (тільки авторизація, без Calendar API)
- Firestore: real-time updates

## 🌟 Останні зміни

**v2.2** (Квітень 2026):
- ✅ Повне видалення Google Calendar інтеграції
- ✅ Переробка вертикальної шкали часу:
  - Межі = робочі години з налаштувань
  - Сегменти з синіми полосами для уроків, білими для вільного часу
  - Розриви (⋮) між уроками поза робочим часом і робочими годинами
- ✅ Нове поле "Місце" для уроку (🏠 Вдома / 🎹 В залі)
- ✅ Автозапам'ятовування останнього вибраного місця для кожного учня

**v2.1** (Квітень 2026):
- ✅ Вертикальна шкала часу в денному виді
- ✅ Візуальні індикатори робочих годин

**v2.0** (Квітень 2026):
- ✅ Селектор тривалості (5-хв кроки)
- ✅ Timeline вид з автофокусом
- ✅ Робочі години налаштування
- ✅ Модуль заробітку
- ✅ Контактні кнопки (smart visibility)

## 🚀 Deployment

**Хостинг:** Firebase Hosting
**PWA:** Service Worker готовий

## 🔄 Майбутні покращення

- [ ] Push нотифікації
- [ ] Експорт даних
- [ ] Темна тема
- [ ] Мультимовність

---

**Розробник:** Claude Code AI + Ukrainian User
**Остання модифікація:** Квітень 2026
