# Plataforma de Eventos

## Temática

API REST para una plataforma de eventos e inscripciones.

El proyecto forma parte de la Pre-entrega 2 de Backend II y establece una base arquitectónica organizada para futuras funcionalidades de eventos, inscripciones y autenticación.

## Tecnologías

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* bcrypt
* Nodemon
* JavaScript con módulos ESM

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las variables necesarias:

```env
PORT=8080
NODE_ENV=development
MONGO_URL=mongodb+srv://USUARIO:CONTRASEÑA@cluster0.mongodb.net/proyecto_eventos
JWT_SECRET=tu_clave_secreta_aqui
```

El archivo `.env` contiene información privada y no debe subirse al repositorio.

Se incluye un archivo `.env.example` como referencia.

## Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecuta en:

```text
http://localhost:8080
```

## Health Check

Endpoint:

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

## Registro de usuarios

Endpoint:

```http
POST /api/sessions/register
```

Este endpoint permite registrar nuevos usuarios.

### Campos requeridos

El cuerpo de la solicitud debe contener:

```json
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "email": "ana@mail.com",
  "password": "Secreta123"
}
```

### Validaciones

El registro valida:

* `first_name` obligatorio.
* `last_name` obligatorio.
* `email` obligatorio.
* `password` obligatoria.
* Formato válido del email.
* Contraseña de al menos 8 caracteres.
* El email no puede estar registrado previamente.

El email se normaliza eliminando espacios y convirtiéndolo a minúsculas.

La contraseña se almacena utilizando un hash generado con `bcrypt`.

El campo `role` no puede ser enviado para modificar el rol durante el registro público. Los usuarios registrados reciben por defecto:

```text
user
```

Los roles permitidos en el modelo son:

```text
user
organizer
admin
```

### Ejemplo con cURL

```bash
curl -i -X POST http://localhost:8080/api/sessions/register -H "Content-Type: application/json" -d "{\"first_name\":\"Juan\",\"last_name\":\"Pérez\",\"email\":\"juan@mail.com\",\"password\":\"Secreta123\"}"
```

### Respuesta exitosa

El endpoint responde con código:

```text
201 Created
```

Ejemplo:

```json
{
  "status": "success",
  "payload": {
    "id": "ID_DEL_USUARIO",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@mail.com",
    "role": "user"
  }
}
```

La contraseña nunca se devuelve en la respuesta.

### Errores posibles

Campos obligatorios faltantes:

```text
400 Bad Request
```

Email con formato inválido:

```text
400 Bad Request
```

Contraseña con menos de 8 caracteres:

```text
400 Bad Request
```

Email ya registrado:

```text
409 Conflict
```

## Login

Endpoint:

```http
POST /api/sessions/login
```

Ejemplo de solicitud:

```json
{
  "email": "ana@mail.com",
  "password": "Secreta123"
}
```

La contraseña enviada se compara con el hash almacenado mediante `bcrypt`.

Respuesta exitosa:

```text
200 OK
```

La respuesta no incluye la contraseña.

## Arquitectura del proyecto

El proyecto utiliza una arquitectura por capas:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
DAO
  ↓
Model
  ↓
MongoDB
```

### Estructura principal

```text
src/
├── app.js
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── events.controller.js
│   └── sessions.controller.js
├── dao/
│   └── users.dao.js
├── models/
│   ├── Event.js
│   └── User.js
├── repositories/
│   └── users.repository.js
├── routes/
│   ├── events.router.js
│   └── sessions.router.js
├── services/
│   └── sessions.service.js
└── utils/
    └── hash.js
```

## Seguridad

* Las contraseñas no se almacenan en texto plano.
* Se utiliza `bcrypt` para generar hashes de contraseñas.
* Las contraseñas no se devuelven en las respuestas de la API.
* Los emails se normalizan antes de consultar o guardar.
* El archivo `.env` está excluido mediante `.gitignore`.
* `node_modules` está excluido del repositorio.

## Pre-entrega 2

La implementación incluye:

* Registro de usuarios.
* Validación de datos.
* Normalización de email.
* Detección de emails duplicados.
* Hash de contraseñas con bcrypt.
* Persistencia de usuarios mediante Mongoose.
* Arquitectura por capas.
* Respuestas sin exponer contraseñas.
* Login utilizando comparación segura mediante bcrypt.
* Configuración mediante variables de entorno.

## Estado del proyecto

Proyecto desarrollado como parte de Backend II y preparado para continuar con futuras funcionalidades de autenticación, eventos e inscripciones.
