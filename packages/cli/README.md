<p align="center">
  <a><img src="https://raw.githubusercontent.com/lextomato/nest-users/refs/heads/main/docs/logo-nest-users.png" width="300" alt="Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nes

![npm](https://img.shields.io/npm/v/@lextomato/nest-users-cli?style=flat-square) ![downloads](https://img.shields.io/npm/dt/@lextomato/nest-users-cli?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

📄 [Documentation in English](../../docs/en/README_cli.md)

# 🔧✨ @lextomato/nest‑users‑cli

CLI **interactivo** que crea un proyecto **NestJS** editable con autenticación, usuarios, roles y permisos listos‑para‑usar mediante `@lextomato/nest-users`.

---

## 🚀 Uso mínimo

```bash
npx @lextomato/nest-users-cli init my-app
```

En segundos tendrás:

- Estructura Nest completa (`src/auth`, `src/users`, …)
- Config de TypeORM + Postgres
- Swagger habilitado
- `.env.example` con todas las vars necesarias

---

## 🎛️ Flags útiles

| Flag                   | Descripción                            |
| ---------------------- | -------------------------------------- |
| `--modules auth,users` | Copia solo los módulos deseados        |
| `--pm pnpm`            | Gestor de paquetes (`npm` por defecto) |
| `--force`              | Sobrescribe archivos existentes        |
| `--minimal`            | No instala _devDependencies_           |

### Ejemplo avanzado

```bash
npx nestusers init api --modules auth,users --pm pnpm --minimal
```

---

## 📦 Qué incluye la plantilla

```
my-app/
├─ src/
│  ├─ auth/          # JWT + Google OAuth2
│  ├─ users/         # CRUD de usuarios
│  ├─ roles/         # Gestión de roles
│  ├─ permissions/   # Gestión de permisos
│  ├─ mail/          # Envío de correos electrónicos
│  └─ common/        # Filtros, guards, pipes y utilidades compartidas
├─ .env.example
└─ nest-cli.json
```

---

## 🧑‍💻 Desarrollo del CLI

```bash
pnpm install          # instalar devDeps
pnpm run build        # compilar a dist/
node bin/run.js init demo
```

---

## 🧑‍💻 **Contribuciones**

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un fork del proyecto desde [aquí](https://github.com/lextomato/nest-users).
2. Crea una nueva rama (`git checkout -b feature/new-function`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva función'`).
4. Haz push a la rama (`git push origin feature/new-function`).
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

- 🛠️ [Issues](https://github.com/lextomato/nest-users/issues) _(Link a la página de Issues para reportar problemas o sugerir mejoras)._
- 📘 [Documentación de NestJS](https://docs.nestjs.com) _(Para obtener más información sobre cómo funciona NestJS)._

---

🚀 ¡Gracias por usar **@lextomato/nest-users** Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir al proyecto.
