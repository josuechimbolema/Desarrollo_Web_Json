# Práctica 6 — Frontend (React + Vite)

Interfaz para probar el backend: login/registro local, login con Google, y un panel CRUD de usuarios protegido con JWT.

## Instalación y ejecución

```powershell
npm install
copy .env.example .env
npm run dev
```

Abre `http://localhost:5173`. Asegúrate de que el backend esté corriendo en `http://localhost:4000` (o ajusta `VITE_API_URL` en `.env`).

## Páginas

- `/login` — inicio de sesión con email/password o botón "Continuar con Google".
- `/register` — registro de nuevo usuario.
- `/oauth-success` — recibe el token tras el login con Google y redirige al dashboard.
- `/dashboard` — ruta protegida: lista, edita y elimina usuarios (consume el CRUD del backend).

## Deploy en Vercel (Sesión 3)

1. Sube este proyecto a GitHub (puede ir en el mismo repo que el backend, en una carpeta `frontend/`, o en un repo aparte).
2. En [Vercel](https://vercel.com) → New Project → importa el repo.
3. Framework: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Agrega la variable de entorno `VITE_API_URL` apuntando a la URL de tu backend en Render (ej. `https://tu-backend.onrender.com/api`).
5. Vuelve al backend y actualiza `FRONTEND_URL` con la URL final de Vercel (para que el redirect de Google OAuth funcione).
