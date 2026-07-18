# Práctica 6 — Backend (CRUD MongoDB + JWT + Google OAuth)

Backend Node.js/Express que implementa:
- **Sesión 1:** CRUD de usuarios en MongoDB con Mongoose.
- **Sesión 2:** Autenticación con JWT (registro, login, rutas protegidas).
- **Sesión 3:** Login con Google OAuth 2.0 (Passport) y despliegue.

## Instalación y ejecución

```powershell
npm install
copy .env.example .env
```

Edita `.env` con tus datos (MongoDB Compass ya corre en `mongodb://localhost:27017` por defecto, así que `MONGO_URI` funciona tal cual si no cambiaste el puerto).

```powershell
npm run dev
```

El servidor queda en `http://localhost:4000`. Debes ver en consola:
```
MongoDB conectado correctamente
Servidor corriendo en puerto 4000
```

Abre MongoDB Compass y confirma que se crea la base `practica6_db`.

## Endpoints

### Auth
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registra usuario (nombre, email, password) y devuelve token |
| POST | `/api/auth/login` | Login con email/password, devuelve token |
| GET | `/api/auth/perfil` | Ruta protegida de prueba (requiere token) |
| GET | `/api/auth/google` | Inicia el flujo de login con Google |
| GET | `/api/auth/google/callback` | Callback de Google, redirige al frontend con el token |

### Usuarios (CRUD, protegido con JWT excepto crear)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/usuarios` | Crear usuario directo (sin password hasheado — usa `/auth/register` en producción) |
| GET | `/api/usuarios` | Listar todos |
| GET | `/api/usuarios/:id` | Obtener uno |
| PUT | `/api/usuarios/:id` | Actualizar |
| DELETE | `/api/usuarios/:id` | Eliminar |

Para rutas protegidas, envía el header:
```
Authorization: Bearer <token>
```

## Configurar Google OAuth (Sesión 3)

1. Ve a [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Crea un **OAuth Client ID** de tipo *Web application*.
3. En **Authorized redirect URIs** agrega:
   - `http://localhost:4000/api/auth/google/callback` (desarrollo)
   - `https://TU-BACKEND.onrender.com/api/auth/google/callback` (producción)
4. Copia el Client ID y Client Secret a tu `.env`.
5. Prueba entrando a `http://localhost:4000/api/auth/google` desde el navegador (o usa el botón "Continuar con Google" del frontend).

## Deploy (Sesión 3)

**Backend en Render:**
1. Sube este proyecto a GitHub.
2. En [Render](https://render.com) → New → Web Service → conecta el repo.
3. Build command: `npm install` — Start command: `npm start`.
4. Agrega todas las variables del `.env` en la sección Environment.
5. Si usas MongoDB local, cámbialo por un cluster de **MongoDB Atlas** (Render no puede acceder a tu MongoDB local) y actualiza `MONGO_URI`.
6. Actualiza `GOOGLE_CALLBACK_URL` y la URI autorizada en Google Cloud con la URL real de Render.

## Probar con Postman

1. `POST /api/auth/register` → `{"nombre":"Juan","email":"juan@test.com","password":"1234"}`
2. Copia el `token` de la respuesta.
3. En Postman, pestaña **Authorization → Bearer Token**, pega el token.
4. Prueba `GET /api/usuarios`, `PUT /api/usuarios/:id`, `DELETE /api/usuarios/:id`.
