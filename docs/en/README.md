<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# 📦 **@lextomato/nest-users**

![npm](https://img.shields.io/npm/v/@lextomato/nest-users?color=brightgreen&style=flat-square) ![npm](https://img.shields.io/npm/dt/@lextomato/nest-users?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

📄 [Documentación en Español](/README.md)

> ✨ _**@lextomato/nest-users** is a comprehensive, ready-to-use solution that simplifies the implementation of authentication, user management, role control, and permissions in your **NestJS** projects. With this package, you can securely and efficiently handle the entire authentication cycle (including **login**, **logout**, **password change**, and **password recovery**), while also managing **users**, **roles**, and **permissions** through a complete **CRUD** system._

> ✨ _Additionally, it provides a robust **Access Control** system that ensures that each endpoint of **your application is only accessible by users with the correct permissions**, based on assigned roles. Perfect for applications requiring detailed access control and centralized user management._

## 📚 **Table of Contents**

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#️-installation)
- [Configuration](#️-configuration)
  - [Environment Variables](#--environment-variables)
  - [Swagger Integration](#--swagger-integration)
  - [Custom Template Configuration for MailModule](#-️-custom-template-configuration-for-mailmodule)
- [Basic Usage](#-basic-usage)
- [API](#-api)
- [Specifications](#-specifications)
- [Other Features](#-other-features)
- [Examples](#-examples)
  - [Complete Integration](#️-complete-integration-example)
  - [Protecting Routes with Roles for an Entire Controller](#-protecting-routes-with-roles-for-an-entire-controller)
  - [Protecting a Specific Route with Roles](#-protecting-a-specific-route-with-roles)
- [Contributions](#-contributions)
- [License](#-license)
- [Donations](#-donations)
- [Additional Resources](#-additional-resources)

## 🚀 **Features**

- 🔒 **Complete Authentication**: JWT-based authentication implementation, including login, logout, session validation, password change, and recovery.
- 🧒🏻 **User Management**: Full CRUD for users with role integration.
- ⚡️ **Role and Permission System**: Role and permission-based access control with an integrated role guard.
- 📧 **Email System**: Sends emails for account activation and password recovery with dynamic template and transport configuration.
- 🪜 **Modularity and Scalability**: Independent and well-integrated modules that ease scalability and code maintenance.
- 🛠️ **Easy Setup and Extension**: Simple configuration and extensible design to fit various project needs.

---

## 🧩 **Requirements**

Before using **@lextomato/nest-users**, ensure you have the following basic dependencies installed in your project:

### 📦 **Basic Dependencies**

1. **NestJS** - The main framework:

   ```bash
   npm install @nestjs/cli @nestjs/core @nestjs/common @nestjs/config
   ```

2. **TypeORM** - ORM (Object-Relational Mapping) for interacting with databases:

   ```bash
   npm install typeorm @nestjs/typeorm
   ```

3. **Swagger** (Optional) - For automatic API documentation generation:
   ```bash
   npm install @nestjs/swagger swagger-ui-express
   ```

### 💡 **Additional Requirements**

- **Node.js**: You need to have Node.js (version 20 or higher) installed.
- **Nest CLI**: While not mandatory, it is recommended to use the NestJS CLI to facilitate project management.
  ```bash
  npm install -g @nestjs/cli
  ```

### 🗄️ **Database**

This package is designed primarily to work with **PostgreSQL**. Make sure you have a running PostgreSQL server configured.

To properly configure the database required by **@lextomato/nest-users**, follow the detailed instructions at the following link:

➡️ [Database Setup Guide](./README_DB.md)

![Database Diagram](/database/diagram.png)

---

## 🛠️ **Installation**

You can install the package using npm or yarn:

```bash
npm install @lextomato/nest-users
```

Or using yarn:

```bash
yarn add @lextomato/nest-users
```

---

## ⚙️ **Configuration**

#### 🔘 📄 Environment Variables

The package is configured through environment variables as per the `.env` file in the root, which should contain the following environment variables:

> ⚠️ _**IMPORTANT:** this package was designed for a **Postgres SQL**-based database. The structure of this database is detailed for proper integration with the package at this link [➡️Database Setup Guide](./README_DB.md)._

| Variable                      | Description                                                     | Example                                                  |
| ----------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| `JWT_SECRET`                  | 🔑 _Secret key to sign JWT tokens._                             | `session-Trrs79`                                         |
| `DB_HOST`                     | 🗄️ _Database host address._                                     | `localhost`                                              |
| `DB_PORT`                     | 🛠️ _Database connection port._                                  | `5432`                                                   |
| `DB_USER`                     | 👤 _Username to access the database._                           | `db_user`                                                |
| `DB_PASS`                     | 🔐 _Password for the database user._                            | `db_password`                                            |
| `DB_NAME`                     | 📂 _Database name._                                             | `db_name`                                                |
| `EMAIL_HOST`                  | 📧 _SMTP server used for sending emails._                       | `smtp.gmail.com`                                         |
| `EMAIL_PORT`                  | 🔌 _Connection port for the SMTP server._                       | `465`                                                    |
| `EMAIL_USER`                  | 👤 _Email address used to send emails._                         | `example@gmail.com`                                      |
| `EMAIL_PASS`                  | 🔐 _Password for the email account used._                       | `email_password`                                         |
| `EMAIL_SECURE`                | ✅ _Indicator of whether to use a secure connection (SSL/TLS)._ | `true (Must be true)`                                    |
| `EMAIL_FROM`                  | ✉️ _"From" email address that will appear in sent emails._      | `"Your App" <example@gmail.com>`                         |
| `APP_DOMAIN`                  | 🌐 _Application domain, used to generate links in emails._      | `http://localhost:9000` or `https://frontend-domain.com` |
| `ENDPOINT_FROM_RECOVERY_PASS` | 🔄 _Frontend path for the password recovery form._              | `/#/reset-password`                                      |

#### 🔘 📋 **Swagger Integration**

##### Default Tags

The **@lextomato/nest-users** package includes a series of **predefined Swagger tags** that allow you to organize and clearly visualize all the functionalities of the service, such as authentication, user management, roles, and permissions. This makes it easier to navigate and access each documented endpoint.

> **Note**: These tags will automatically be available in your Swagger documentation, provided that Swagger is set up in your project.

##### Swagger Setup

To enable Swagger in your project, add the following code to your application's `main.ts` file:

```typescript
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription(
      'API documentation for user management, roles, and permissions',
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

With this setup, you will be able to view your API documentation automatically generated at `http://localhost:3000/api`, where the **Swagger tags** corresponding to the main functions of your service will be displayed.

#### 🔘 ✉️ **Custom Template Configuration for `MailModule`**

The `MailModule` of this package allows you to configure custom templates for the emails sent. These templates are fully customizable and must include certain **key variables** that will be dynamically replaced when sending the email.

##### 📝 **Key Variables**

Each template must include the following variables in its syntax, which will be automatically replaced when the email is sent:

- **`{{name}}`**: The recipient's first name.
- **`{{lastname}}`**: The recipient's last name.
- **`{{link}}`**: A dynamic link that varies depending on the type of email (account activation, password recovery, etc.), which is generated by the system.

##### 🔧 **How to Configure Custom Templates**

To configure custom templates, you need to pass an object with the desired templates to the `forRoot` method of the `MailModule`. Here's how to define and use templates in your project:

##### **1. Define Templates**

Define your own templates, specifying the subject and body of the email. Be sure to include the `{{name}}`, `{{lastname}}`, and `{{link}}` variables.

```typescript
const customTemplates = {
  accountActivation: {
    subject: 'Activate your account on MyApp',
    body: `
      <h1>Hello, {{name}} {{lastname}}</h1>
      <p>Thank you for registering on our app. To activate your account, click the following link:</p>
      <a href="{{link}}">Activate Account</a>
    `,
  },
  passwordRecovery: {
    subject: 'Recover your password on MyApp',
    body: `
      <h1>Hello, {{name}} {{lastname}}</h1>
      <p>We received a request to reset your password. You can change it by clicking the following link:</p>
      <a href="{{link}}">Reset Password</a>
    `,
  },
};
```

##### **2. Configure the `MailModule`**

When initializing the `MailModule` in your application, pass the custom templates you just defined through the `forRoot` method.

```typescript
import { Module } from '@nestjs/common';
import { MailModule } from '@lextomato/nest-users';

@Module({
  imports: [
    MailModule.forRoot({
      accountActivation: {
        subject: 'Activate your account on MyApp',
        body: `
          <h1>Hello, {{name}} {{lastname}}</h1>
          <p>To activate your account, click the link:</p>
          <a href="{{link}}">Activate Account</a>
        `,
      },
      passwordRecovery: {
        subject: 'Recover your password on MyApp',
        body: `
          <h1>Hello, {{name}} {{lastname}}</h1>
          <p>Click the following link to recover your password:</p>
          <a href="{{link}}">Recover Password</a>
        `,
      },
    }),
  ],
})
export class AppModule {}
```

---

## 🚀 **Basic Usage**

Here is a basic example of how to use this package:

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

## 📡 **API**

The **@lextomato/nest-users** API provides all the necessary functionalities for managing **users**, **roles**, **permissions**, and **authentication** in your NestJS application.

### 🌟 **Available Endpoints**

You can explore all the **API endpoints** interactively through our **online Swagger documentation**. There you will find:

- 📄 **Authentication**: Login, logout, password recovery, and more.
- 👥 **Users**: Full CRUD for user management.
- 🛡️ **Roles and Permissions**: Management of roles and permissions for access control.

### 🌐 **Online Swagger Demo**

👉 Access the **Swagger documentation** to see the complete list of endpoints and test each one directly from the interactive interface.

**[Swagger Documentation - Online Demo](https://lextomato.github.io/nest-users-swagger-ui/)** 🌍

> **⚠️ Note**: This is a static demo intended for **viewing only**. Interactive functionality is disabled, so it's not possible to test requests or interact with the endpoints.

The demo will allow you to:

- See examples of responses and request formats.
- Understand how to interact with the API using different methods and parameters.

---

## 📖 **Specifications**

### 🔑 **`AuthModule`**

- **JWT Authentication**: Robust JWT-based authentication implementation, including active session validation and revoked token handling for maximum security.
- **Authentication Endpoints**: Support for login, logout, session validation, password change, and forgotten password recovery.
- **JWT Strategy**: Implementation of JWT strategy with token validation on each request and support for token revocation.

### 👥 **`UsersModule`**

- **User CRUD**: Full functionality for user management, including create, read, update, and delete.
- **Role Integration**: Users can be assigned specific roles that define their permissions and access within the application.

### 🛡️ **`RolesModule`** **`PermissionsModule`**

- **Roles Guard**: A roles guard ensures that only users with the appropriate roles and permissions can access certain resources or endpoints.
- **Roles and Permissions CRUD**: Full management of roles and permissions, allowing you to define and control access to various modules and actions within the application.
- **Module Integration**: Roles and permissions are directly integrated with the authentication and user modules, ensuring centralized access control.

### ✉️ **`MailModule`**

- **Mail Module**: Support for sending emails, including account activation and password recovery emails.
- **Dynamic Configuration**: Allows dynamic configuration of mail transport (SMTP) and email templates, adapting to the needs of the environment.

---

## ✨ **Other Features**

### 📊 **Modularity and Scalability**

- **Independent Modules**: Each functionality (auth, users, roles, permissions, mail) is encapsulated in its own module, which facilitates scalability and code maintenance.
- **Seamless Integration**: The modules are designed to integrate seamlessly with each other, providing a solid foundation for building secure and well-organized applications.

### 🚀 **Easy Setup and Extension**

- **Simple Configuration**: All modules can be easily configured through environment variables and configuration options in NestJS.
- **Extensible**: Designed to be extended, allowing you to add new functionalities or modify existing ones without breaking the main structure.

---

## 🌟 **Examples**

### 🛠️ Complete Integration Example

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

### 🔐 Protecting Routes with Roles for an Entire Controller

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@lextomato/nest-users';
import { JwtAuthGuard, RolesGuard } from '@lextomato/nest-users';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // <-- Use decorator on the main controller
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return 'This is the admin dashboard';
  }

  @Get('profile')
  getProfile() {
    return 'This is the user profile';
  }
}
```

> _**NOTE:** in this case, all routes of the 'admin' controller are protected, including the **@Get('dashboard')** and **@Get('profile')** routes._

### 🔐 Protecting a Specific Route with Roles

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
  @UseGuards(JwtAuthGuard, RolesGuard) // <-- Use decorator on specific route
  getProfile() {
    return 'This is the user profile';
  }
}
```

> _**NOTE:** in this case, only the routes with the respective decorator are protected. In this example, only **@Get('profile')** is protected._

---

## 🧑‍💻 **Contributions**

Contributions are welcome. Please follow these steps to contribute:

1. Fork the project from [here](https://github.com/lextomato/nest-users).
2. Create a new branch (`git checkout -b feature/new-function`).
3. Commit your changes (`git commit -am 'Add new function'`).
4. Push to the branch (`git push origin feature/new-function`).
5. Create a new Pull Request.

---

## 🔑 **License**

This project is licensed under the **MIT License** - see the [📄LICENSE](./LICENSE) file for more details.

---

## 💰 **Donations**

If you like this project and would like to support it, consider making a donation via PayPal. Your support helps maintain and improve this project.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

---

### 🔗 **Additional Resources**

- 🛠️ [Issues](https://github.com/lextomato/nest-users/issues) _(Link to the Issues page to report problems or suggest improvements)._
- 📘 [NestJS Documentation](https://docs.nestjs.com) _(For more information on how NestJS works)._

---

🚀 Thank you for using **@lextomato/nest-users**! If you have any questions or suggestions, feel free to open an issue or contribute to the project.
