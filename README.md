# SimpliTEC - Frontend

Este es el frontend de la plataforma **SimpliTEC**, una aplicación web para gestión de concesionarios y exhibición pública de vehículos, accesorios y publicaciones. Está desarrollado en **React** con **Material UI**, usando una estructura clara, responsiva y moderna.

---

## 📦 Requisitos previos

- Node.js >= 18
- npm >= 9
- Backend corriendo localmente o en producción (ver configuración de `.env`)

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**:

```bash
git clone https://github.com/usuario/simplitec-frontend.git
cd simplitec-frontend
```

2. **Instalar dependencias**:

```bash
npm install
```

3. **Configurar variables de entorno**:

Crear un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001/api
```

> 🔐 Asegurate que coincida con la URL del backend.

4. **Ejecutar el proyecto**:

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## 🧩 Estructura principal

```
src/
├── components/          # Componentes reutilizables (cards, grids, forms)
├── context/             # Contextos globales (auth, dealer)
├── pages/               # Vistas por ruta (públicas y privadas)
├── routes/              # Definición de rutas y protección JWT
├── services/            # Servicios para llamadas HTTP (Axios)
├── theme/               # Tema MUI y configuración light/dark
├── utils/               # Funciones auxiliares
├── App.jsx              # Layout general de la aplicación
└── main.jsx             # Entry point
```

---

## 🔐 Autenticación y roles

La autenticación se maneja con JWT:

- Se guarda el token en `localStorage`.
- El contexto `AuthContext` mantiene la sesión y datos del usuario.
- Se distingue entre 2 roles:
  - `admin`: gestiona concesionarios, usuarios y panel de control
  - `dealer`: gestiona sus vehículos, accesorios, publicaciones y leads

Todas las rutas privadas se protegen según rol mediante `PrivateRoute`.

---

## 🌐 Rutas

### Públicas (eCommerce)

- `/` → Página de inicio con destacados y filtros
- `/vehiculos/:id` → Detalle del vehículo
- `/favoritos` → Lista de favoritos locales
- `/nosotros` → Sobre el concesionario

### Privadas (Dashboard)

- `/admin/dealers` → ABM de concesionarios (solo admin)
- `/admin/vehicles` → ABM de vehículos
- `/admin/accessories` → ABM de accesorios
- `/admin/posts` → ABM de publicaciones
- `/admin/leads` → Visualización y respuesta a leads
- `/admin/users` → Gestión de usuarios del dealer

---

## 🧠 Funcionalidades destacadas

- **Filtros dinámicos** por tipo, precio, año, etc.
- **Paginación** y **buscador** en listados admin
- **Formulario reutilizable** para alta y edición
- **Subida de imágenes** a Cloudinary (form-data)
- **Favoritos** almacenados localmente
- **Cotización** y generación de leads con envío de email

---

## 🧪 Testing

> En desarrollo (opcional): se pueden usar `Vitest` o `React Testing Library`.

---

## ✨ Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Cloudinary](https://cloudinary.com/)
- [JWT](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/) (opcional, en progreso)

---

## 🧑‍💻 Desarrollo

- Indentación: 4 espacios
- Hooks separados por lógica (`useAuth`, `useDealer`...)
- Axios con interceptor que agrega token automáticamente

---

## 📬 Contacto

Cualquier duda o sugerencia, podés abrir un issue o contactar al autor.

---

¡Gracias por probar **SimpliTEC**! 🚗💻
