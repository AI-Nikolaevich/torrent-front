FROM node:18.13.0-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install

COPY . .
CMD ["npm","run","dev"]



# Используем официальный образ Node.js
FROM node:18.13.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в рабочую директорию
COPY . .

# Открываем порт, на котором будет работать ваше приложение

# Запускаем приложение
CMD ["npm", "run", "dev"]
