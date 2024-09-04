<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nes

# 📦 **@lextomato/nest-users**

![npm](https://img.shields.io/npm/v/@lextomato/nest-users?color=brightgreen&style=flat-square) ![npm](https://img.shields.io/npm/dt/@lextomato/nest-users?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

> ✨ _**@lextomato/nest-users** es una solución integral y lista para usar que simplifica la implementación de autenticación, gestión de usuarios, control de roles y permisos en tus proyectos **NestJS**. Con este paquete, podrás manejar de forma segura y eficiente todo el ciclo de autenticación (incluyendo **login**, **logout**, **cambio de contraseña**, y **recuperación de contraseñas olvidadas**), mientras que también te permite gestionar **usuarios**, **roles**, y **permisos** a través de un completo sistema de **CRUD**._

> ✨ _Además, proporciona un robusto sistema de **Control de Acceso** que garantiza que cada endpoint de **tu aplicación solo sea accesible por usuarios con los permisos adecuados**, basados en los roles asignados. Perfecto para aplicaciones que requieren un control de acceso detallado y una administración centralizada de usuarios._

## 📚 **Tabla de Contenidos**

- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalación](#️-instalación)
- [Configuración](#️-configuración)
  - [Variables de Entorno](#-variables-de-entorno)
  - [Integracion de Swagger](#-integración-de-swagger)
- [Uso Básico](#-uso-básico)
- [Especificaciones](#-especificaciones)
- [Otras Características](#-otras-características)
- [Ejemplos](#-ejemplos)
  - [Integracion completa](#️-ejemplo-de-integración-completa)
  - [Protegiendo rutas con roles de un controller en general](#-protegiendo-rutas-con-roles-de-un-controller-en-general)
  - [Protegiendo una ruta en especifico con roles](#-protegiendo-una-ruta-en-especifico-con-roles)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)
- [Donaciones](#-donaciones)
- [Recursos Adicionales](#-recursos-adicionales)

## 🚀 **Características**

- 🔒 **Autenticación Completa**: Implementación de autenticación basada en JWT, incluyendo login, logout, validación de sesión, cambio y recuperación de contraseñas.
- 🧒🏻​ **Gestión de Usuarios**: CRUD completo para usuarios con integración de roles.
- ⚡️ **Sistema de Roles y Permisos**: Control de acceso basado en roles y permisos con un guardia de roles integrado.
- 📧​ **Sistema de Correo**: Envío de correos electrónicos para activación de cuentas y recuperación de contraseñas, con configuración dinámica de plantillas y transporte.
- 🪜​ **Modularidad y Escalabilidad**: Módulos independientes y bien integrados que facilitan la escalabilidad y el mantenimiento del código.
- 🛠️ **Fácil Configuración y Extensión**: Configuración sencilla y diseño extensible para adaptarse a diferentes necesidades de proyectos.

---

## 🧩 **Requisitos**

Antes de utilizar **@lextomato/nest-users**, asegúrate de tener instaladas las siguientes dependencias básicas en tu proyecto:

### 📦 **Dependencias Básicas**

1. **NestJS** - El framework principal:

   ```bash
   npm install @nestjs/cli @nestjs/core @nestjs/common @nestjs/config
   ```

2. **TypeORM** - ORM (Object-Relational Mapping) para interactuar con bases de datos:

   ```bash
   npm install typeorm @nestjs/typeorm
   ```

3. **Swagger** (Opcional) - Para la generación de documentación de API automática:
   ```bash
   npm install @nestjs/swagger swagger-ui-express
   ```

### 💡 **Requisitos adicionales**

- **Node.js**: Es necesario tener instalado Node.js (versión 20 o superior).
- **Nest CLI**: Aunque no es obligatorio, te recomendamos utilizar el CLI de NestJS para facilitar la gestión de tu proyecto.
  ```bash
  npm install -g @nestjs/cli
  ```

### 🗄️ **Base de Datos**

Este paquete está diseñado para trabajar principalmente con **PostgreSQL**. Asegúrate de tener un servidor PostgreSQL corriendo y configurado.

Para configurar correctamente la base de datos requerida por **@lextomato/nest-users**, sigue las instrucciones detalladas en el siguiente enlace:

➡️ [Guía de Configuración de la Base de Datos](./database/README.md)

![Diagrama de Base de Datos](./database/diagram.png)

---

## 🛠️ **Instalación**

Puedes instalar el paquete usando npm o yarn:

```bash
npm install @lextomato/nest-users
```

O usando yarn:

```bash
yarn add @lextomato/nest-users
```

---

## ⚙️ **Configuración**

#### 📄 Variables de Entorno

El paquete se configura a través de variables de entorno según el archivo `.env` en la raiz, el cual debe tener las siguientes variables de entorno:

> ⚠️ _**IMPORTANTE:** este paquete fue diseñado para una base de datos basada en **Postgres SQL**. Se detalla la estructura de la misma para la correcta integracion con el paquete en este enlace [➡️Guía de Configuración de la Base de Datos](./database/README.md)._

| Variable                      | Descripción                                                                   | Ejemplo                                                 |
| ----------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- |
| `JWT_SECRET`                  | 🔑 _Clave secreta para firmar los tokens JWT._                                | `session-Trrs79`                                        |
| `DB_HOST`                     | 🗄️ _Dirección del host de la base de datos._                                  | `localhost`                                             |
| `DB_PORT`                     | 🛠️ _Puerto de conexión a la base de datos._                                   | `5432`                                                  |
| `DB_USER`                     | 👤 _Nombre de usuario para acceder a la base de datos._                       | `db_user`                                               |
| `DB_PASS`                     | 🔐 _Contraseña del usuario de la base de datos._                              | `db_password`                                           |
| `DB_NAME`                     | 📂 _Nombre de la base de datos._                                              | `db_name`                                               |
| `EMAIL_HOST`                  | 📧 _Servidor SMTP utilizado para el envío de correos._                        | `smtp.gmail.com`                                        |
| `EMAIL_PORT`                  | 🔌 _Puerto de conexión para el servidor SMTP._                                | `465`                                                   |
| `EMAIL_USER`                  | 👤 _Dirección de correo electrónico utilizada para enviar correos._           | `example@gmail.com`                                     |
| `EMAIL_PASS`                  | 🔐 _Contraseña del correo electrónico utilizado._                             | `email_password`                                        |
| `EMAIL_SECURE`                | ✅ _Indicador de si se debe usar una conexión segura (SSL/TLS)._              | `true (Obligatorio en true)`                            |
| `EMAIL_FROM`                  | ✉️ _Dirección de correo "De" que aparecerá en los correos enviados._          | `"Your App" <example@gmail.com>`                        |
| `APP_DOMAIN`                  | 🌐 _Dominio de la aplicación, utilizado para generar enlaces en los correos._ | `http://localhost:9000` o `https://frontend-domain.com` |
| `ENDPOINT_FROM_RECOVERY_PASS` | 🔄 _Ruta del frontend para el formulario de recuperación de contraseñas._     | `/#/reset-password`                                     |

#### 📋 **Integración de Swagger**

##### Tags por Defecto

El paquete **@lextomato/nest-users** incluye una serie de **tags predefinidos en Swagger** que permiten organizar y visualizar de manera clara todas las funcionalidades del servicio, tales como autenticación, gestión de usuarios, roles y permisos. Esto facilita la navegación y el acceso a cada endpoint documentado.

> **Nota**: Estos tags estarán disponibles automáticamente en tu documentación Swagger, previa configuración de Swagger en tu proyecto.

#### Configuración de Swagger

Para habilitar Swagger en tu proyecto, añade el siguiente código en el archivo `main.ts` de tu aplicación:

```typescript
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Usuarios')
    .setDescription(
      'Documentación de la API para la gestión de usuarios, roles y permisos',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

Con esta configuración, podrás visualizar la documentación de tu API generada automáticamente en `http://localhost:3000/api`, donde se mostrarán los **tags de Swagger** correspondientes a las funciones principales de tu servicio.

---

## 🚀 **Uso Básico**

Aquí tienes un ejemplo básico de cómo utilizar este paquete:

#### app.module

```typescript
import {
  AuthModule,
  PermissionsModule,
  RolesModule,
  UsersModule,
} from '@lextomato/nest-users';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    PermissionsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 📖 **Especificaciones**

### 🔑 **`AuthModule`**

- **Autenticación con JWT**: Implementación robusta de autenticación basada en JWT, que incluye validación de sesiones activas y manejo de tokens revocados para máxima seguridad.
- **Endpoints de Autenticación**: Soporte para login, logout, validación de sesión, cambio de contraseña y recuperación de contraseñas olvidadas.
- **Estrategia JWT**: Implementación de la estrategia JWT con validación de tokens en cada solicitud y soporte para revocación de tokens.

### 👥 **`UsersModule`**

- **CRUD de Usuarios**: Funcionalidad completa para la gestión de usuarios, que incluye creación, lectura, actualización y eliminación de usuarios.
- **Integración con Roles**: Los usuarios pueden ser asignados a roles específicos que definen sus permisos y acceso dentro de la aplicación.

### 🛡️ **`RolesModule`** **`PermissionsModule`**

- **Roles Guard**: Un guardia de roles que asegura que solo los usuarios con los roles y permisos adecuados pueden acceder a determinados recursos o endpoints.
- **CRUD de Roles y Permisos**: Gestión completa de roles y permisos, permitiendo definir y controlar el acceso a los diferentes módulos y acciones dentro de la aplicación.
- **Integración con Módulos**: Roles y permisos están integrados directamente con los módulos de autenticación y usuarios, asegurando un control de acceso centralizado.

### ✉️ **`MailModule`**

- **Módulo de Correo**: Soporte para el envío de correos electrónicos, incluyendo correos de activación de cuenta y recuperación de contraseñas.
- **Configuración Dinámica**: Permite configurar el transporte de correo (SMTP) y las plantillas de correo de forma dinámica, adaptándose a las necesidades del entorno.

---

## ✨ **Otras Características**

### 📊 **Modularidad y Escalabilidad**

- **Módulos Independientes**: Cada funcionalidad (auth, usuarios, roles, permisos, mail) está encapsulada en su propio módulo, lo que facilita la escalabilidad y el mantenimiento del código.
- **Integración Fluida**: Los módulos están diseñados para integrarse perfectamente entre sí, proporcionando una base sólida para la construcción de aplicaciones seguras y bien organizadas.

### 🚀 **Fácil Configuración y Extensión**

- **Configuración Sencilla**: Todos los módulos pueden ser configurados fácilmente a través de variables de entorno y opciones de configuración en NestJS.
- **Extensible**: Diseñado para ser extendido, permitiendo agregar nuevas funcionalidades o modificar las existentes sin romper la estructura principal.

---

## 🌟 **Ejemplos**

### 🛠️ Ejemplo de Integración Completa

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  PermissionsModule,
  RolesModule,
  UsersModule,
} from '@lextomato/nest-users';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    PermissionsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 🔐 Protegiendo Rutas con Roles de un Controller en general

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@lextomato/nest-users';
import { JwtAuthGuard, RolesGuard } from '@lextomato/nest-users';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // <-- Usar decorador en el controller principal
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return 'This is the admin dashboard';
  }

  @Get('profile')
  getDashboard() {
    return 'This is the user profile';
  }
}
```

> _**NOTA:** en este caso se protege todas las rutas del controller 'admin' que incluyen las rutas **@Get('dashboard')** y **@Get('profile')**._

### 🔐 Protegiendo una Ruta en especifico con Roles

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@lextomato/nest-users';
import { JwtAuthGuard, RolesGuard } from '@lextomato/nest-users';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return 'This is the admin dashboard';
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard) // <-- Usar decorador en Ruta especifica
  getDashboard() {
    return 'This is the user profile';
  }
}
```

> _**NOTA:** en este caso se protege solo las rutas del controller que tienen el decorador respectivo. Para este caso solo **@Get('profile')**._

---

## 🧑‍💻 **Contribuciones**

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcion`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva función'`).
4. Haz push a la rama (`git push origin feature/nueva-funcion`).
5. Crea un nuevo Pull Request.

---

## 🔑 **Licencia**

Este proyecto está licenciado bajo la Licencia **MIT** - consulta el archivo [📄LICENSE](./LICENSE) para más detalles.

---

## 💰 **Donaciones**

Si te gusta este proyecto y te gustaría apoyarlo, considera hacer una donación vía PayPal. Tu apoyo ayuda a mantener este proyecto y mejorar sus funcionalidades.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

---

### 🔗 **Recursos Adicionales**

- 🛠️ [Issues](https://github.com/tu-repositorio/issues) _(Link a la página de Issues para reportar problemas o sugerir mejoras)._
- 📘 [Documentación de NestJS](https://docs.nestjs.com) _(Para obtener más información sobre cómo funciona NestJS)._

---

🚀 ¡Gracias por usar **@lextomato/nest-users** Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir al proyecto.
