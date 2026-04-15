# 🔧 Firebase Console налаштування для Melodia

## НЕГАЙНІ КРОКИ для виправлення авторизації:

### 1. Відкрийте Firebase Console
```
https://console.firebase.google.com/project/melodia-6b440
```

### 2. Йдіть до Authentication → Settings → Authorized domains
```
Authentication → Settings → Authorized domains → Add domain
```

### 3. Додайте ці домени:
```
localhost
127.0.0.1
```

### 4. Перевірте Google Cloud Console
```
https://console.cloud.google.com/apis/credentials
```

### 5. Знайдіть OAuth 2.0 Client IDs і додайте:
```
Authorized JavaScript origins:
- http://localhost:8000
- http://127.0.0.1:8000

Authorized redirect URIs:
- http://localhost:8000
- http://127.0.0.1:8000
```

## Тестування:

1. Спочатку протестуйте простий варіант:
   **http://localhost:8000/test-auth.html**

2. Якщо працює → переходьте до основного додатку

3. Якщо не працює → проблема в Firebase налаштуваннях