# Sistema de Gestión Documental - Mesa de Partes San Miguel

Sistema web integral para la gestión y seguimiento de trámites documentarios en la institución educativa San Miguel. Desarrollado con React, Firebase y diseño responsivo.

---

## 🎯 Descripción del Proyecto

El Sistema de Gestión Documental de Mesa de Partes es una plataforma web que digitaliza y optimiza el proceso de recepción, clasificación, derivación y seguimiento de documentos administrativos. Permite a diferentes áreas de la institución gestionar trámites de manera eficiente, transparente y en tiempo real.

### Características Principales

- ✅ **Gestión de Trámites**: Registro, seguimiento y actualización de documentos
- 🔐 **Control de Acceso**: Sistema de autenticación basado en roles
- 📊 **Reportes en Tiempo Real**: Dashboards interactivos con métricas clave
- 📎 **Gestión de Adjuntos**: Carga y visualización de documentos PDF
- 🔔 **Sistema de Notificaciones**: Alertas automáticas para documentos pendientes
- 📈 **Historial Completo**: Registro las acciones
- 🎨 **Diseño Responsivo**: Adaptable a diferentes dispositivos

## Fotos de las interfaces

### Login - Inicio de Sesión
*Interfaz de inicio de sesióm con validación de credenciales*
<img width="1365" height="628" alt="image" src="https://github.com/user-attachments/assets/5145ed82-6fa9-4cfa-9158-e8241d385773" />

---

### Dashboard Principal (Mesa de Partes)
*Vista general con tarjetas de resumen y tabla de documentos*
<img width="1365" height="624" alt="image" src="https://github.com/user-attachments/assets/c06cbf77-8298-4963-a201-2e1d8f58feaa" />

---

### Detalle de Documento
*Modal para revisión y asignación de documentos*
<img width="453" height="592" alt="image" src="https://github.com/user-attachments/assets/b71cc93f-f330-4eff-ae93-250f3cf9dbe7" />
<img width="428" height="595" alt="image" src="https://github.com/user-attachments/assets/7c9c1246-e843-44a3-8b36-0d942100c215" />

---

### Reportes
*Reportes graficos de los documentos que son ingresados al sistema*
<img width="1333" height="626" alt="image" src="https://github.com/user-attachments/assets/22df0b89-f333-4d12-adda-a1914a9ce3a8" />

---

### Historial de Movimientos
*REgistro de las acciones por fecha*
<img width="1344" height="624" alt="image" src="https://github.com/user-attachments/assets/c9e9b50b-174a-4026-9e56-24009d6b0e94" />

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 18.x - Biblioteca principal de UI
- **React Router DOM** - Navegación y rutas protegidas
- **Recharts** - Visualización de datos
- **React Icons** - Iconografía
- **CSS3** - Estilos personalizados

### Backend & Base de Datos
- **Firebase Authentication** - Autenticación de usuarios
- **Cloud Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Storage** - Almacenamiento de archivos PDF

### Herramientas de Desarrollo
- **Create React App** - Configuración inicial
- **Git** - Control de versiones

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v14 o superior)
- npm o yarn
- Cuenta de Firebase con proyecto configurado
- Git

---

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/mesa-partes-san-miguel.git
cd mesa-partes-san-miguel
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
```

### 4. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Authentication** (Email/Password)
3. Crea una base de datos **Cloud Firestore**
4. Configura **Storage** para archivos
5. Copia las credenciales al archivo `.env`

### 5. Ejecutar el Proyecto

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🗂️ Estructura del Proyecto

```
src/
├── assets/                          # Imágenes y recursos estáticos
│   ├── logo-san-miguel.jpg
│   └── Colegio-San-Miguel-.jpg
│
├── core/
│   └── services/
│       └── tramitesService.js       # Servicios de Firestore
│
├── data/
│   └── Firebase/
│       └── firebaseConfig.js        # Configuración de Firebase
│
├── presentación/
│   ├── components/                  # Componentes reutilizables
│   │   ├── BarraBusqueda.jsx
│   │   ├── DetalleDocumento.jsx
│   │   ├── DetalleFinal.jsx
│   │   ├── DetalleRespuesta.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ModalAsignarArea.jsx
│   │   ├── ModalRechazo.jsx
│   │   ├── ModalEnviarAviso.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── TarjetasResumen.jsx
│   │
│   ├── pages/                       # Páginas principales
│   │   ├── Login.jsx
│   │   ├── DashboardPrinc.jsx
│   │   ├── DashboardArea.jsx
│   │   ├── HistorialMov.jsx
│   │   ├── Reportes.jsx
│   │   └── AccesoDenegado.jsx
│   │
│   ├── Styles/                      # Archivos CSS
│   │   ├── login.css
│   │   ├── DashboardPrinc.css
│   │   ├── DashboardArea.css
│   │   ├── Header.css
│   │   ├── Sidebar.css
│   │   ├── DetalleDocumento.css
│   │   └── ...
│   │
│   └── App.jsx                      # Configuración de rutas
│
├── index.jsx                        # Punto de entrada
└── export.js                        # Script de exportación de Firestore
```

## 👥 Roles y Permisos
El sistema maneja tres roles principales:

### 1. **Admin (Mesa de Partes)**
- Acceso completo al sistema
- Gestión de todos los documentos
- Asignación de áreas y prioridades
- Generación de reportes
- Visualización del historial completo

**Rutas accesibles:**
- `/DashboardPrinc`
- `/Reportes`
- `/HistorialMov`

### 2. **Secretaría**
- Gestión de documentos asignados a Secretaría
- Emisión de respuestas
- Filtros y búsquedas por fecha




