# JWT Auth API

REST API de autenticación con Node.js, Express, MySQL y JWT.

## Endpoints

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/auth/register | Crear cuenta nueva | No |
| POST | /api/auth/login | Iniciar sesión, devuelve token | No |
| GET | /api/auth/profile | Ver perfil del usuario | Sí |

## Tecnologías

- Node.js + Express
- MySQL con mysql2
- JWT (jsonwebtoken)
- bcrypt

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` basado en `.env.example`
4. Crear la base de datos en MySQL
5. Correr el servidor: `npm run dev`

## Variables de entorno

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_db
JWT_SECRET=
```