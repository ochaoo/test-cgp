# 🚀 Users & Images App

Simple CRUD project on Node.js + Express + Sequelize + PostgreSQL with image upload support and HTML/JS frontend.

## 📋 Prerequisites

- Docker & Docker Compose
- Git
- Ports **3000** (app) and **5432** (PostgreSQL) are free

## 🔧 Quick start

1. **Clone the repository**

   ```bash
   git clone https://github.com/ochaoo/test-cgp.git
   cd test-cgp

   ```

2. **Create a directory for downloads**

   ```bash
   mkdir uploads
   ```

3. **Launch containers**
   ```bash
   docker-compose up --build -d
   ```

## Useful commands

- Run seeders manually

  ```bash
  docker-compose exec app npm run seed
  ```

- Roll back all seeders

```bash
  docker-compose exec app npm run seed:undo
```

## Accessing the Application

- **Frontend:**  
  Open in your browser → `http://localhost:3000`

- **API:**  
  Example request:
  ```bash
  GET http://localhost:3000/api/users?page=1&limit=10
  ```
