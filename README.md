# Test Data Louna

Этот проект демонстрирует небольшое backend-приложение, написанное на **TypeScript** с использованием **PostgreSQL**, реализующее три задачи. В проекте используется **Express** в качестве веб-фреймворка, а кэширование выполнено с помощью **Redis**.

---

## Возможности

### 1. Регистрация, аутентификация и смена пароля
- **Эндпоинты:**
    - `POST /register` — Регистрация нового пользователя.
    - `POST /login` — Аутентификация пользователя.
    - `POST /change-password` — Смена пароля пользователя.
- **Таблица базы данных:** `users`
    - Хранит данные о пользователях с безопасным хранением паролей.

### 2. Отображение продуктов с двумя минимальными ценами
- Получение данных из [Skinport API](https://docs.skinport.com/).
- **Два типа цен:**
    - `tradable`: Минимальная доступная цена.
    - `non-tradable`: Рекомендуемая цена для недоступных товаров.
- **Кэширование:** Результаты сохраняются в **Redis** на 1 час для минимизации запросов к API.

### 3. Покупка товаров
- **Эндпоинты:**
    - `POST /purchase` — Покупка товара.
    - Обновляет баланс пользователя и создаёт запись в таблице `purchases`.
- **Таблицы базы данных:**
    - `products` — Хранит данные о товарах.
    - `purchases` — Логирует покупки с временными метками.

---

## Установка

### Локальная установка

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/your_username/test-data-louna.git
   cd test-data-louna
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Настройте переменные окружения:
   Создайте файл `.env` в корневой директории со следующим содержимым:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=testdb
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

4. Настройте базу данных:
    - Создайте таблицы, выполнив команды из `schema.sql`.
    - Заполните таблицы тестовыми данными или своими.

5. Запустите приложение:
   ```bash
   npm run dev
   ```

6. Доступ к серверу:
    - Приложение доступно по адресу `http://localhost:3000`.

### Установка с использованием Docker

1. Убедитесь, что Docker и Docker Compose установлены на вашем компьютере.

2. Создайте файл `.env` в корневой директории проекта:
   ```env
   DB_HOST=postgres
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=testdb
   REDIS_HOST=redis
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

3. Соберите и запустите контейнеры:
   ```bash
   docker-compose up --build
   ```

4. Доступ к серверу:
    - Приложение будет доступно по адресу `http://localhost:3000`.

5. Остановите контейнеры:
   ```bash
   docker-compose down
   ```

---

## Эндпоинты API

### **Аутентификация**
- **POST /register**
    - Тело запроса: `{ "username": "string", "password": "string" }`
    - Регистрирует нового пользователя.

- **POST /login**
    - Тело запроса: `{ "username": "string", "password": "string" }`
    - Аутентифицирует пользователя.

- **POST /change-password**
    - Тело запроса: `{ "username": "string", "oldPassword": "string", "newPassword": "string" }`
    - Изменяет пароль пользователя.

### **Продукты**
- **GET /products**
    - Возвращает список продуктов с ценами `tradable` и `non-tradable`.

### **Покупки**
- **POST /purchase**
    - Тело запроса: `{ "userId": "number", "productId": "number" }`
    - Обрабатывает покупку и обновляет баланс пользователя.

---

## Используемые технологии
- **TypeScript**
- **Express**
- **PostgreSQL**
- **Redis**
- **Axios**

---

## Структура проекта
```
src/
├── app.ts             # Точка входа приложения
├── users.ts           # Логика, связанная с пользователями
├── products.ts        # Логика, связанная с продуктами
├── purchases.ts       # Логика, связанная с покупками
├── redis.ts           # Конфигурация клиента Redis
└── controllers/       # Контроллеры для маршрутов
```
