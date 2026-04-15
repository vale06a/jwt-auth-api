# JWT Auth API

REST API de autenticación con Node.js, Express, MySQL y JWT.

## URL de producción

`https://jwt-auth-api-qe2a.onrender.com`

## Endpoints

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/auth/register | Crear cuenta nueva | No |
| POST | /api/auth/login | Iniciar sesión, devuelve token | No |
| GET | /api/auth/profile | Ver perfil del usuario | Sí |

## Ejemplos

**Register**
```json
POST /api/auth/register
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Profile**

## Tecnologías

- Node.js + Express
- MySQL (TiDB Cloud)
- JWT (jsonwebtoken)
- bcrypt

## Instalación local

1. Clonar el repositorio
2. `npm install`
3. Crear `.env` basado en `.env.example`
4. Crear la tabla `users` en MySQL
5. `npm run dev`

## Variables de entorno

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=3000
```