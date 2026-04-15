# Melodia — Музичний Щоденник

Прогресивна веб-аплікація (PWA) для управління музичними уроками з інтеграцією Google Calendar.

## 📱 Архітектура

**Технології:**
- HTML5 + CSS3 + Vanilla JavaScript
- Firebase (Auth, Firestore) 
- Google Calendar API
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

### Управління уроками
- Створення уроків із студентами
- Статуси: заплановано → відбувся → сплачено
- Тривалість: 15-120 хв (кроки 5 хв)
- Способи оплати (успадковуються від учня)

### Google Calendar інтеграція  
- Автоматичне створення подій
- Інформація: студент, час, ціна, спосіб оплати
- Нагадування (налаштовувані)
- Оновлення та видалення подій

### Робочі години
- Налаштування для кожного дня тижня
- Початок/кінець робочого дня
- Вмикання/вимикання днів
- Візуальна шкала часу у розкладі (🔵 зайнято, ⚪ вільно)
- Автоматичне розширення шкали для уроків поза робочим часом

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
  ├── students/
  ├── lessons/  
  └── settings/
```

**Локальні змінні:**
- `students[]` — масив учнів
- `lessons[]` — масив уроків  
- `settings{}` — налаштування користувача
- `gAccessToken` — Google Calendar токен

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
- `googleLogin()` — Google OAuth логін
- `userRef()` — посилання на документ користувача
- `loadData()` — завантаження учнів, уроків, налаштувань
- `saveSettings(data)` — збереження налаштувань користувача

### 👥 **Student Management**
- `saveStudent(data, id)` — створення/оновлення учня
- `deleteStudent(id)` — видалення учня
- `confirmDeleteStudent(id)` — підтвердження видалення

### 🎵 **Lesson Management**
- `saveLesson(data, id)` — створення/оновлення уроку  
- `deleteLesson(id)` — видалення уроку
- `updateLessonStatus(id, newStatus)` — зміна статусу уроку
- `cycleStatus(id, newStatus)` — переключення статусу

### 📅 **Google Calendar Integration**
- `createCalendarEvent(lesson, retryCount)` — створення події в Calendar з retry логікою
- `updateCalendarEvent(lesson)` — оновлення події
- `deleteCalendarEvent(eventId)` — видалення події з Calendar
- `syncMissingLessons()` — масова синхронізація несинхронізованих уроків
- `testCalendarAccess()` — перевірка доступу до Calendar API
- `checkAndConnectCalendar()` — автоматична перевірка та підключення Calendar
- `forceReauth()` — примусова переавторизація з новими дозволами
- `showCalendarConnectionStatus(status)` — відображення статусу підключення Calendar

### 🎨 **UI Rendering**
- `renderAll()` — рендеринг всіх видів
- `renderDashboard()` — головна сторінка  
- `renderLessons()` — розклад (тиждень/місяць/список)
- `renderStudents()` — список учнів
- `renderSettings()` — налаштування
- `renderLessonCard(l, showDate)` — картка уроку
- `generateVerticalTimeScale(dateStr, dayLessons)` — вертикальна шкала часу для денного виду
- `updateUnpaidBadge()` — badge несплачених уроків

### 🧭 **Navigation & Views**
- `switchView(view)` — переключення видів
- `toggleCalendarView(view)` — тиждень/місяць перемикач
- `prevWeek()` / `nextWeek()` — навігація тижнів
- `prevMonth()` / `nextMonth()` — навігація місяців  
- `selectDay(d)` — вибір дня в календарі
- `selectDayFromList(dateStr)` — перехід до тижневого виду з списку
- `getMonthDays(monthStr)` — генерація днів місяця
- `getWorkingHoursForDate(dateStr)` — робочі години для дати
- `generateTimeSlots(dateStr)` — генерація часових слотів з статусами

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
- `openLessonForm(date, studentId, lessonId)` — форма уроку
- `openEditLesson(id)` — редагування уроку
- `confirmDeleteLesson(id)` — підтвердження видалення уроку
- `showUnpaid()` — модальне вікно несплачених уроків
- `openEarningsView()` — вікно заробітку

### 🎛️ **Event Handlers & Form Controls**
- `selectEmoji(btn, emoji)` — вибір емодзі
- `selectMessenger(btn, type)` — вибір месенджера
- `selectStudentPaymentMethod(btn, method)` — спосіб оплати учня
- `selectPaymentMethod(btn, method)` — спосіб оплати уроку
- `submitStudent(id)` — збереження учня
- `submitLesson(studentId, lessonId)` — збереження уроку
- `updateReminder(val)` — оновлення нагадувань
- `updateWorkingHours(day, field, value)` — робочі години

## 🔧 Налаштування

**Firebase Config:**
- Project: melodia-6b440
- Auth: Google Sign-In
- Firestore: real-time updates

**Google Calendar:**
- Scope: calendar.events
- Timezone: Europe/Berlin
- OAuth2 with refresh handling

## 🌟 Останні зміни

**v2.1** (Квітень 2026):
- ✅ Вертикальна шкала часу в денному виді
- ✅ Візуальні індикатори робочих годин
- ✅ Покращена авторизація Google OAuth
- ✅ Очищення та оптимізація коду
- ✅ Retry логіка для Calendar API
- ✅ Масова синхронізація несинхронізованих уроків
- ✅ Розширені дозволи Google Calendar scope
- ✅ Автоматична перевірка підключення Calendar
- ✅ Візуальний індикатор статусу Calendar
- ✅ Періодична перевірка підключення (кожні 5 хв)
- ✅ Перевірка при поверненні на вкладку

**v2.0** (Квітень 2026):
- ✅ Селектор тривалості (5-хв кроки)
- ✅ Timeline вид з автофокусом
- ✅ Робочі години налаштування  
- ✅ Модуль заробітку
- ✅ Контактні кнопки (smart visibility)
- ✅ Покращена Calendar інтеграція

## 🚀 Deployment

**Хостинг:** Firebase Hosting
**Домен:** [налаштувати]
**PWA:** Service Worker готовий

## 🔄 Майбутні покращення

- [ ] Шкала часу з вільними слотами  
- [ ] Push нотифікації
- [ ] Експорт даних
- [ ] Темна тема
- [ ] Мультимовність

---

**Розробник:** Claude Code AI + Ukrainian User
**Остання модифікація:** Квітень 2026